import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Globe, Loader2, Search } from "lucide-react";

const ScanPage = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!url) return;
    
    setIsScanning(true);
    
    // Mock scanning delay
    setTimeout(() => {
      setIsScanning(false);
      navigate('/results', { state: { url } });
    }, 3000);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: "tween" as const,
    duration: 0.5
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
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Website Analysis</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Enter Your Website URL
            </h1>
            
            <p className="text-lg text-muted-foreground">
              We'll analyze your website for security vulnerabilities, performance issues, 
              SEO optimization, and accessibility compliance.
            </p>
          </motion.div>

          {/* Scan Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-8 shadow-elegant border-primary/10">
              <div className="space-y-6">
                <div>
                  <label htmlFor="website-url" className="block text-sm font-medium mb-2">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="website-url"
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="pl-10 h-12 text-lg"
                      disabled={isScanning}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleScan}
                  disabled={!url || isScanning}
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-glow"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Scanning Website...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Scan Website
                    </>
                  )}
                </Button>

                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-muted/50 rounded-lg p-4 mt-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Analyzing security vulnerabilities...</span>
                        <div className="w-20 bg-primary/20 rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Checking performance metrics...</span>
                        <div className="w-20 bg-primary/20 rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 1.2 }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Evaluating SEO optimization...</span>
                        <div className="w-20 bg-primary/20 rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 1.9 }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Testing accessibility compliance...</span>
                        <div className="w-20 bg-primary/20 rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 2.6 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Sample URLs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Don't have a URL handy? Try one of these examples:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['https://example.com', 'https://google.com', 'https://github.com'].map((sampleUrl) => (
                <Button
                  key={sampleUrl}
                  variant="outline"
                  size="sm"
                  onClick={() => setUrl(sampleUrl)}
                  disabled={isScanning}
                  className="text-xs"
                >
                  {sampleUrl}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScanPage;