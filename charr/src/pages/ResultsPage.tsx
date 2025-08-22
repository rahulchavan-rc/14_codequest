import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Zap,
  Search,
  Eye,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// 🔹 Helper: Generate random integer between min & max
const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const ResultsPage = () => {
  const navigate = useNavigate();

  // Demo URLs
  const urls = [
    "https://example.com",
    "https://myapp.io",
    "https://testsite.org",
    "https://coolproject.net",
    "https://demo.co",
  ];
  const randomUrl = urls[getRandom(0, urls.length - 1)];

  // State
  const [url] = useState(randomUrl);
  const [healthScore, setHealthScore] = useState<number | null>(null);
  const [auditData, setAuditData] = useState({
    security: 0,
    performance: 0,
    seo: 0,
    accessibility: 0,
  });
  const [issues, setIssues] = useState({
    security: [] as string[],
    performance: [] as string[],
    seo: [] as string[],
    accessibility: [] as string[],
  });

  // Random issues pool
  const issuePool = {
    security: ["Weak password policy", "Missing HTTPS", "Outdated libraries"],
    performance: ["Large image sizes", "No caching", "Too many requests"],
    seo: ["Missing meta tags", "No sitemap", "Broken links"],
    accessibility: ["Missing alt text", "Low contrast", "No ARIA labels"],
  };

  useEffect(() => {
    // Generate random scores
    const security = getRandom(40, 100);
    const performance = getRandom(40, 100);
    const seo = getRandom(40, 100);
    const accessibility = getRandom(40, 100);

    setAuditData({ security, performance, seo, accessibility });

    // Calculate average health score
    const avgScore = (security + performance + seo + accessibility) / 4;
    setHealthScore(Math.round(avgScore));

    // Pick random issues
    setIssues({
      security: issuePool.security.slice(0, getRandom(0, 3)),
      performance: issuePool.performance.slice(0, getRandom(0, 3)),
      seo: issuePool.seo.slice(0, getRandom(0, 3)),
      accessibility: issuePool.accessibility.slice(0, getRandom(0, 3)),
    });
  }, []);

  const chartData = [
    { name: "Security", score: auditData.security },
    { name: "Performance", score: auditData.performance },
    { name: "SEO", score: auditData.seo },
    { name: "Accessibility", score: auditData.accessibility },
  ];

  const pieData = [
    { name: "Passed", value: healthScore ?? 0, color: "#16a34a" },
    { name: "Failed", value: healthScore !== null ? 100 - healthScore : 0, color: "#dc2626" },
  ];

  const timelineData = [
    { time: "0s", security: 100, performance: 100, seo: 100, accessibility: 100 },
    {
      time: "3s",
      security: auditData.security,
      performance: auditData.performance,
      seo: auditData.seo,
      accessibility: auditData.accessibility,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreIcon = (category: string) => {
    const icons = {
      security: Shield,
      performance: Zap,
      seo: Search,
      accessibility: Eye,
    };
    return icons[category as keyof typeof icons] || Shield;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/scan")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Scan
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Audit Results</h1>
            <p className="text-muted-foreground">{url}</p>
          </div>
          <div className="w-[120px]"></div>
        </div>

        {/* Overall Score */}
        <Card className="p-6 text-center shadow-elegant mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 rounded-full border border-destructive/20 mb-4">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Issues Detected</span>
          </div>
          <div className="text-4xl font-bold text-destructive mb-2">
            {healthScore !== null ? `${healthScore}%` : "Loading..."}
          </div>
          <p className="text-muted-foreground">Overall Website Health Score</p>
        </Card>

        {/* Score Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(auditData).map(([category, score], index) => {
            const IconComponent = getScoreIcon(category);
            return (
              <Card key={category} className="p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="h-8 w-8 text-primary" />
                  <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </span>
                </div>
                <h3 className="font-semibold mb-2 capitalize">{category}</h3>
                <Progress value={score} className="mb-2" />
                <p className="text-xs text-muted-foreground">
                  {score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Needs Improvement" : "Critical"}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Bar Chart */}
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Pie Chart */}
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Pass/Fail Ratio</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Line Chart */}
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Scan Timeline</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="security" stroke="#dc2626" strokeWidth={2} />
                <Line type="monotone" dataKey="performance" stroke="#ea580c" strokeWidth={2} />
                <Line type="monotone" dataKey="seo" stroke="#ca8a04" strokeWidth={2} />
                <Line type="monotone" dataKey="accessibility" stroke="#dc2626" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Issues Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {Object.entries(issues).map(([category, issueList]) => {
            const IconComponent = getScoreIcon(category);
            return (
              <Card key={category} className="p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold capitalize">{category} Issues</h3>
                </div>
                <ul className="space-y-3">
                  {issueList.length > 0 ? (
                    issueList.map((issue, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{issue}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No major issues found 🎉</p>
                  )}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* Next Step */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate("/solution", { state: { healthScore } })}
            className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 shadow-glow"
          >
            Next Step
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsPage;