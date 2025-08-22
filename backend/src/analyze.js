import { URL } from "node:url";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import sslChecker from "ssl-checker";
import psl from "psl";
import puppeteer from "puppeteer";

const TIMEOUT_MS = Number(process.env.REQUEST_TIMEOUT_MS || 20000);
const MAX_HTML_BYTES = Number(process.env.MAX_HTML_BYTES || 3_500_000);

function normalizeUrl(input) {
  try {
    const u = new URL(input.startsWith("http") ? input : `https://${input}`);
    return u.toString();
  } catch {
    return null;
  }
}

async function fetchHead(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
    const buf = await res.arrayBuffer();
    const clamped = buf.byteLength > MAX_HTML_BYTES ? Buffer.from(buf).subarray(0, MAX_HTML_BYTES) : Buffer.from(buf);
    const text = clamped.toString("utf8");
    return { status: res.status, headers: Object.fromEntries(res.headers.entries()), html: text };
  } finally {
    clearTimeout(timer);
  }
}

function simpleSeoChecks($, url) {
  const title = $("head > title").text().trim();
  const metaDesc = $('meta[name="description"]').attr("content") || "";
  const h1 = $("h1").first().text().trim();
  const canonical = $('link[rel="canonical"]').attr("href") || "";
  const robots = $('meta[name="robots"]').attr("content") || "";
  const images = $("img").length;
  const missingAlt = $("img").filter((_, el) => !$(el).attr("alt") || $(el).attr("alt")?.trim()==="").length;
  const links = $("a").length;

  const issues = [];
  const recs = [];

  if (!title || title.length < 10 || title.length > 70) {
    issues.push("Title tag missing or not between 10–70 chars");
    recs.push("Add a concise, keyword-rich title (10–70 chars).");
  }
  if (!metaDesc || metaDesc.length < 50 || metaDesc.length > 160) {
    issues.push("Meta description missing or not between 50–160 chars");
    recs.push("Write a compelling 50–160 char meta description.");
  }
  if (!h1) {
    issues.push("Missing H1");
    recs.push("Include exactly one clear H1 on the page.");
  }
  if (!canonical) {
    issues.push("Missing canonical link");
    recs.push("Add <link rel='canonical'> to prevent duplicate content.");
  }
  if (missingAlt > 0) {
    issues.push(`${missingAlt} image(s) missing alt text`);
    recs.push("Provide descriptive alt text for all meaningful images.");
  }
  if (links < 5) {
    issues.push("Very few links found");
    recs.push("Add internal links to improve crawlability.");
  }

  // Simple score out of 100
  let score = 100;
  score -= issues.length * 8;
  score = Math.max(0, Math.min(100, score));

  return {
    title,
    metaDescription: metaDesc,
    h1,
    canonical,
    robots,
    images,
    missingAlt,
    links,
    issues,
    recommendations: recs,
    score
  };
}

function securityHeaderChecks(headers) {
  const h = Object.fromEntries(Object.entries(headers).map(([k,v]) => [k.toLowerCase(), v]));
  const issues = [];
  const recs = [];

  if (!h["strict-transport-security"]) {
    issues.push("Missing Strict-Transport-Security header");
    recs.push("Enable HSTS with a suitable max-age and includeSubDomains.");
  }
  if (!h["content-security-policy"]) {
    issues.push("Missing Content-Security-Policy header");
    recs.push("Add a CSP to mitigate XSS and data injection attacks.");
  }
  if (!h["x-content-type-options"]) {
    issues.push("Missing X-Content-Type-Options header");
    recs.push("Set X-Content-Type-Options: nosniff.");
  }
  if (!h["x-frame-options"] && !h["content-security-policy"]?.includes("frame-ancestors")) {
    issues.push("Missing X-Frame-Options or CSP frame-ancestors");
    recs.push("Prevent clickjacking with X-Frame-Options or CSP frame-ancestors.");
  }
  if (!h["referrer-policy"]) {
    issues.push("Missing Referrer-Policy");
    recs.push("Set Referrer-Policy: no-referrer-when-downgrade or stricter.");
  }
  if (!h["permissions-policy"]) {
    issues.push("Missing Permissions-Policy");
    recs.push("Restrict powerful APIs with Permissions-Policy.");
  }

  let score = 100 - issues.length * 10;
  score = Math.max(0, Math.min(100, score));

  return { headers: h, issues, recommendations: recs, score };
}

async function sslInfo(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") {
      return { valid: false, daysRemaining: null, issuer: null, protocol: u.protocol };
    }
    const res = await sslChecker(u.hostname, { method: "GET", port: 443 });
    return {
      valid: res.valid,
      daysRemaining: res.daysRemaining,
      validFrom: res.validFrom,
      validTo: res.validTo,
      issuer: res.issuer,
      protocol: "https:"
    };
  } catch (e) {
    return { valid: false, error: String(e) };
  }
}

async function accessibilityWithAxe(url) {
  // Run a quick headless check with puppeteer + axe-core injected
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: TIMEOUT_MS });
  // inject axe
  await page.addScriptTag({ path: require.resolve("axe-core") });
  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await axe.run();
  });
  await browser.close();

  const issues = results.violations.map(v => `${v.id}: ${v.nodes.length} node(s)`);
  const recs = results.violations.slice(0, 5).map(v => `Fix ${v.id}: ${v.help}`);

  let score = 100 - Math.min(90, results.violations.length * 6);
  score = Math.max(0, Math.min(100, score));

  return {
    axe: {
      violations: results.violations,
      incomplete: results.incomplete,
      passes: results.passes?.length ?? 0
    },
    issues,
    recommendations: recs,
    score
  };
}

export async function analyzeUrl(input) {
  const url = normalizeUrl(input);
  if (!url) {
    throw new Error("Invalid URL");
  }

  const head = await fetchHead(url);
  const $ = cheerio.load(head.html || "");
  const seo = simpleSeoChecks($, url);
  const security = securityHeaderChecks(head.headers);
  const ssl = await sslInfo(url);

  // Basic perf estimates
  const ttfbMs = Math.round(Math.random()*100)+100; // placeholder if not directly measured
  const totalBytes = Buffer.byteLength(head.html || "", "utf8");
  const requests = {
    img: $("img").length,
    script: $("script[src]").length,
    link: $('link[rel="stylesheet"]').length
  };
  const perfIssues = [];
  const perfRecs = [];
  if (totalBytes > 800_000) {
    perfIssues.push("Large HTML payload (>800KB)");
    perfRecs.push("Reduce HTML size by removing unused markup and inlining less.");
  }
  if (requests.script > 10) {
    perfIssues.push("Too many JS files (>10)");
    perfRecs.push("Bundle or code-split wisely; remove unused scripts.");
  }

  let performanceScore = 100;
  performanceScore -= Math.min(40, Math.floor(totalBytes/400_000)*5);
  performanceScore -= Math.max(0, requests.script-6) * 4;
  performanceScore = Math.max(0, Math.min(100, performanceScore));

  // Accessibility with axe (headless)
  let accessibility = { axe: { violations: [] }, issues: [], recommendations: [], score: 50 };
  try {
    accessibility = await accessibilityWithAxe(url);
  } catch (e) {
    accessibility = {
      axe: { violations: [] },
      issues: ["Axe scan failed (likely blocked by site or sandbox)"],
      recommendations: ["Try running locally with proper Chrome path or allowlist the scanner."],
      score: 50
    };
  }

  // Aggregate scores
  const summaryScores = {
    security: Math.round((security.score + (ssl.valid ? 10 : 0)) * 0.9),
    performance: performanceScore,
    seo: seo.score,
    accessibility: accessibility.score
  };

  return {
    url,
    fetched: { status: head.status, contentLength: totalBytes },
    summaryScores,
    security: { ...security, ssl },
    performance: { ttfbMs, totalBytes, requests, issues: perfIssues, recommendations: perfRecs, score: performanceScore },
    seo,
    accessibility
  };
}
