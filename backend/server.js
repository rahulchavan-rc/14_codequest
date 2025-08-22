import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { analyzeUrl } from "./src/analyze.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, version: "1.0.0", time: new Date().toISOString() });
});

// Main analyze endpoint
app.get("/api/analyze", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Missing 'url' string in query" });
    }
    const result = await analyzeUrl(url);
    res.json(result);
  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({ error: "Internal error", details: String(err?.message || err) });
  }
});

// Security endpoint
app.get("/api/security", async (req, res) => {
  try {
    const { url } = req.query;
    const result = await analyzeUrl(url || "https://example.com");
    res.json({ url, issues: result.security.issues, recommendation: result.security.recommendations[0] || "Review security headers" });
  } catch (e) {
    res.status(500).json({ error: "Security check failed", details: String(e?.message || e) });
  }
});

// Performance endpoint
app.get("/api/performance", async (req, res) => {
  try {
    const { url } = req.query;
    const result = await analyzeUrl(url || "https://example.com");
    res.json({ url, loadingTime: result.performance.ttfbMs + "ms", issues: result.performance.issues.slice(0,3), recommendation: result.performance.recommendations[0] || "Optimize assets" });
  } catch (e) {
    res.status(500).json({ error: "Performance check failed", details: String(e?.message || e) });
  }
});

// SEO endpoint
app.get("/api/seo", async (req, res) => {
  try {
    const { url } = req.query;
    const result = await analyzeUrl(url || "https://example.com");
    res.json({ url, title: result.seo.title, description: result.seo.metaDescription, issues: result.seo.issues, recommendation: result.seo.recommendations[0] || "Improve meta tags" });
  } catch (e) {
    res.status(500).json({ error: "SEO check failed", details: String(e?.message || e) });
  }
});

// Accessibility endpoint
app.get("/api/accessibility", async (req, res) => {
  try {
    const { url } = req.query;
    const result = await analyzeUrl(url || "https://example.com");
    res.json({ url, violations: result.accessibility.axe.violations.length, issues: result.accessibility.issues, recommendation: result.accessibility.recommendations[0] || "Fix color contrast and ARIA labels" });
  } catch (e) {
    res.status(500).json({ error: "Accessibility check failed", details: String(e?.message || e) });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});