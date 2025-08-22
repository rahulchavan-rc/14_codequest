import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Star, Heart, Award, ArrowLeft, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    feedback: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || formData.rating === 0) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and rating are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your input and will use it to improve our service.",
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const StarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => handleInputChange('rating', star)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-1 rounded transition-colors ${
              star <= formData.rating 
                ? 'text-warning' 
                : 'text-muted-foreground hover:text-warning'
            }`}
          >
            <Star 
              className="h-6 w-6" 
              fill={star <= formData.rating ? 'currentColor' : 'none'} 
            />
          </motion.button>
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen bg-gradient-to-br from-success/10 via-background to-primary/5 flex items-center justify-center"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-success/20 rounded-full border border-success/40 mb-8"
            >
              <CheckCircle className="h-10 w-10 text-success" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
              Feedback Submitted!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for taking the time to share your experience with Code Quest Audit Tool. 
              Your feedback helps us continuously improve our service.
            </p>

            <Card className="p-6 bg-gradient-card shadow-elegant mb-8">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Professional Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-destructive" />
                  <span className="text-sm font-medium">Customer Focused</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">Reliable Results</span>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <Button
                onClick={() => navigate('/')}
                className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/90 shadow-glow"
              >
                Return to Home
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Need another audit? Feel free to scan as many websites as you'd like!
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

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
            onClick={() => navigate('/final')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Feedback & Thank You</h1>
          <div className="w-[120px]"></div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Thank You for Using Code Quest Audit Tool!
            </h2>
            
            <p className="text-lg text-muted-foreground">
              We hope our analysis helped improve your website's security, performance, SEO, and accessibility. 
              Your feedback is valuable to us and helps us serve you better.
            </p>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 shadow-elegant">
              <h3 className="text-xl font-semibold mb-6">Share Your Experience</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4" />
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Rating */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4" />
                    Rating *
                  </Label>
                  <div className="flex items-center gap-4">
                    <StarRating />
                    <span className="text-sm text-muted-foreground">
                      {formData.rating > 0 && `${formData.rating} star${formData.rating !== 1 ? 's' : ''}`}
                    </span>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <Label htmlFor="feedback" className="mb-2 block">
                    Additional Feedback
                  </Label>
                  <Textarea
                    id="feedback"
                    value={formData.feedback}
                    onChange={(e) => handleInputChange('feedback', e.target.value)}
                    placeholder="Tell us about your experience with Code Quest Audit Tool..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 shadow-glow"
                  disabled={!formData.name || !formData.email || formData.rating === 0}
                >
                  Submit Feedback
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12 pb-8"
          >
            <div className="border-t border-border pt-8">
              <p className="text-muted-foreground text-sm mb-2">
                © 2025 Code Quest Audit Tool
              </p>
              <p className="text-muted-foreground text-xs">
                Professional website analysis for security, performance, SEO, and accessibility.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThankYouPage;