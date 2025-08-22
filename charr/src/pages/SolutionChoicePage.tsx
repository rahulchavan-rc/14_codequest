import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Wrench, Rocket, CheckCircle, Clock, Zap } from "lucide-react";

const SolutionChoicePage = () => {
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: "tween" as const,
    duration: 0.5
  };

  const handleChoice = (choice: 'fix' | 'rebuild') => {
    navigate('/final', { state: { choice } });
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
            onClick={() => navigate('/results')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Results
          </Button>
          <h1 className="text-2xl font-bold">Choose Your Solution</h1>
          <div className="w-[120px]"></div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              How Would You Like to Proceed?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the approach that best fits your needs. We can provide step-by-step 
              recommendations to fix issues manually, or completely rebuild your website 
              with enterprise-grade security and performance.
            </p>
          </motion.div>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Fix Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-8 shadow-elegant border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer h-full"
                onClick={() => handleChoice('fix')}
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-warning/10 rounded-full border border-warning/20 mb-4">
                    <Wrench className="h-8 w-8 text-warning" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Fix Recommendations</h3>
                  <p className="text-muted-foreground">
                    Get detailed step-by-step guidance to manually fix all detected issues
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">Detailed fix instructions for each issue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">Code examples and best practices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">Priority-based implementation guide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">Testing and validation steps</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Estimated time: 2-4 weeks</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-warning hover:bg-warning/90 text-warning-foreground"
                  onClick={() => handleChoice('fix')}
                >
                  Show Fix Recommendations
                </Button>
              </Card>
            </motion.div>

            {/* Rebuild Website */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-8 shadow-elegant border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer h-full bg-gradient-card"
                onClick={() => handleChoice('rebuild')}
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full border border-primary/20 mb-4">
                    <Rocket className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Rebuild My Website</h3>
                  <div className="inline-block px-3 py-1 bg-success/10 border border-success/20 rounded-full mb-2">
                    <span className="text-xs font-medium text-success">RECOMMENDED</span>
                  </div>
                  <p className="text-muted-foreground">
                    Let us rebuild your website with complete security and zero errors
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">Complete website rebuild from scratch</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">Enterprise-grade security implementation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">90%+ performance score guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">Full SEO optimization included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">WCAG 2.1 accessibility compliance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-accent font-medium">Ready in 48 hours</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 shadow-glow"
                  onClick={() => handleChoice('rebuild')}
                >
                  Rebuild My Website
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Card className="inline-block p-6 bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Not sure which option to choose?</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Our rebuild service includes a 30-day money-back guarantee and free maintenance for the first month.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SolutionChoicePage;