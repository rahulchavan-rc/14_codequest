import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Search, Eye, ArrowRight, CheckCircle } from "lucide-react";

const WelcomePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Security Analysis",
      description: "Detect vulnerabilities like SQL injection, XSS, and missing security headers"
    },
    {
      icon: Zap,
      title: "Performance Audit",
      description: "Analyze loading times, Core Web Vitals, and optimization opportunities"
    },
    {
      icon: Search,
      title: "SEO Evaluation",
      description: "Check meta tags, sitemaps, robots.txt, and search engine optimization"
    },
    {
      icon: Eye,
      title: "Accessibility Check",
      description: "Ensure ARIA compliance, contrast ratios, and inclusive design practices"
    }
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-card/20 backdrop-blur-sm rounded-full border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="h-4 w-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">Professional Website Audit Tool</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-foreground">
            Welcome to Code Quest
            <br />
            <span className="text-4xl md:text-6xl">Audit Tool</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Your Website's Security, Performance, SEO, and Accessibility in One Place.
            <br />
            <span className="text-foreground font-semibold">Comprehensive analysis in seconds.</span>
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg shadow-glow"
              onClick={() => navigate('/scan')}
            >
              Start Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={itemVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/10 shadow-card hover:shadow-elegant transition-all duration-300">
                <feature.icon className="h-12 w-12 text-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                <p className="text-foreground text-sm leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <Card className="inline-block p-8 bg-card/80 backdrop-blur-sm border-primary/10 shadow-card">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">10K+</div>
                <div className="text-foreground text-sm">Websites Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">95%</div>
                <div className="text-foreground text-sm">Issues Detected</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
                <div className="text-foreground text-sm">Real-time Monitoring</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {['Enterprise Grade', 'GDPR Compliant', 'SOC 2 Certified', '99.9% Uptime'].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-foreground">
                <CheckCircle className="h-4 w-4 text-foreground" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;