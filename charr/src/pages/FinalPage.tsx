import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, Copy, Globe, TrendingUp, ArrowRight, ExternalLink, Shield, Zap, Search, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from "@/hooks/use-toast";

const FinalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const choice = location.state?.choice || 'fix';
  const [copiedUrl, setCopiedUrl] = useState(false);
  
  const newUrl = "https://your-rebuilt-site.codequest.dev";

  const beforeAfterData = [
    { category: 'Security', before: 55, after: choice === 'rebuild' ? 95 : 85, icon: Shield },
    { category: 'Performance', before: 65, after: choice === 'rebuild' ? 98 : 88, icon: Zap },
    { category: 'SEO', before: 50, after: choice === 'rebuild' ? 92 : 85, icon: Search },
    { category: 'Accessibility', before: 40, after: choice === 'rebuild' ? 89 : 80, icon: Eye }
  ];

  const averageAfter = Math.round(beforeAfterData.reduce((acc, item) => acc + item.after, 0) / beforeAfterData.length);

  const fixRecommendations = [
    {
      category: "Security Fixes",
      priority: "High",
      items: [
        "Implement Content Security Policy (CSP) headers",
        "Add HTTPS redirects and HSTS headers",
        "Configure secure cookie settings",
        "Sanitize user inputs to prevent XSS attacks"
      ]
    },
    {
      category: "Performance Optimizations",
      priority: "High",
      items: [
        "Optimize images using WebP format and lazy loading",
        "Minify and compress CSS/JavaScript files",
        "Implement resource caching strategies",
        "Reduce render-blocking resources"
      ]
    },
    {
      category: "SEO Improvements",
      priority: "Medium",
      items: [
        "Add comprehensive meta descriptions",
        "Create and submit XML sitemap",
        "Implement structured data markup",
        "Optimize heading tag hierarchy"
      ]
    },
    {
      category: "Accessibility Enhancements",
      priority: "High",
      items: [
        "Add descriptive alt text to all images",
        "Improve color contrast ratios",
        "Implement proper ARIA labels",
        "Ensure keyboard navigation support"
      ]
    }
  ];

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: "tween" as const,
    duration: 0.5
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(newUrl);
      setCopiedUrl(true);
      toast({
        title: "URL Copied!",
        description: "The website URL has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please manually copy the URL.",
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'Medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'Low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/solution')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Options
          </Button>
          <h1 className="text-2xl font-bold">
            {choice === 'rebuild' ? 'Rebuilt Website' : 'Fix Recommendations'}
          </h1>
          <div className="w-[120px]"></div>
        </motion.div>

        {choice === 'fix' ? (
          /* Fix Recommendations Section */
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 rounded-full border border-warning/20 mb-4">
                <CheckCircle className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning">Fix Recommendations Ready</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Step-by-Step Fix Guide</h2>
              <p className="text-muted-foreground">Follow these recommendations to improve your website's security, performance, SEO, and accessibility.</p>
            </motion.div>

            <div className="grid gap-6">
              {fixRecommendations.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{section.category}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(section.priority)}`}>
                        {section.priority} Priority
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Rebuild Section */
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20 mb-4">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">Website Successfully Rebuilt</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Your New Website is Ready!</h2>
              <p className="text-muted-foreground">We've completely rebuilt your website with enterprise-grade security, performance, and accessibility.</p>
            </motion.div>

            {/* New Website URL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 shadow-elegant bg-gradient-card">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Your New Website URL
                </h3>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    onClick={handleCopyUrl}
                    variant="outline"
                    className="gap-2 px-3"
                  >
                    <Copy className={`h-4 w-4 ${copiedUrl ? 'text-success' : ''}`} />
                    {copiedUrl ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2" onClick={handleCopyUrl}>
                    <ExternalLink className="h-4 w-4" />
                    View Website
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Globe className="h-4 w-4" />
                    Publish Website
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Before vs After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="p-8 shadow-elegant">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="h-6 w-6 text-success" />
                Before vs After Comparison
              </h3>
              <p className="text-muted-foreground">
                Your website's improvement after implementing our {choice === 'rebuild' ? 'rebuild' : 'recommendations'}
              </p>
            </div>

            {/* Overall Score */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-destructive mb-2">52.5%</div>
                <p className="text-muted-foreground">Before</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">{averageAfter}%</div>
                <p className="text-muted-foreground">After</p>
                <div className="text-sm text-success font-medium">
                  +{(averageAfter - 52.5).toFixed(1)}% improvement
                </div>
              </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={beforeAfterData.map(item => ({
                category: item.category,
                before: item.before,
                after: item.after
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="before" fill="#dc2626" name="Before" radius={4} />
                <Bar dataKey="after" fill="#16a34a" name="After" radius={4} />
              </BarChart>
            </ResponsiveContainer>

            {/* Individual Scores */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {beforeAfterData.map((item, index) => (
                <Card key={index} className="p-4 text-center">
                  <item.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-2">{item.category}</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-destructive">{item.before}%</span>
                    <span className="text-success">{item.after}%</span>
                  </div>
                  <div className="text-xs text-success font-medium mt-1">
                    +{item.after - item.before}%
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Finish Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8"
        >
          <Button
            size="lg"
            onClick={() => navigate('/thanks')}
            className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 shadow-glow"
          >
            Finish
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FinalPage;