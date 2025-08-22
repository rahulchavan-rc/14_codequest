import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, ArrowRight, Shield, Zap, Search, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";

// helper for random after score
const getRandomInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// ...existing imports...

// ...existing imports...

const FinalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const choice = location.state?.choice || "rebuild";
  const [copiedUrl, setCopiedUrl] = useState(false);

  // ✅ Safely get Overall Health Score from page 3, fallback to 52 if not passed
  const beforeScore: number = typeof location.state?.healthScore === "number" ? location.state.healthScore : 52;

  // ✅ After score always between 93–99
  const afterScore = getRandomInRange(93, 99);

  // ✅ Graph data (before = overall healthScore)
  const beforeAfterData = [
    { category: "Security", before: beforeScore, after: getRandomInRange(93, 99), icon: Shield },
    { category: "Performance", before: beforeScore, after: getRandomInRange(93, 99), icon: Zap },
    { category: "SEO", before: beforeScore, after: getRandomInRange(93, 99), icon: Search },
    { category: "Accessibility", before: beforeScore, after: getRandomInRange(93, 99), icon: Eye }
  ];

  // ...rest of your component...

  // ...rest of your component...

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={{
        initial: { opacity: 0, x: 50 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: -50 },
      }}
      transition={{ type: "tween", duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex flex-col"
    >
      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/solution")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Options
          </Button>
          <h1 className="text-2xl font-bold">Before vs After</h1>
          <div className="w-[120px]"></div>
        </div>

        {/* Comparison Section */}
        <Card className="p-8 shadow-elegant">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6 text-success" /> Website Comparison
            </h3>
          </div>

          {/* Overall Score */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive mb-2">{beforeScore}%</div>
              <p className="text-muted-foreground">Before</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">{afterScore}%</div>
              <p className="text-muted-foreground">After</p>
              <div className="text-sm text-success font-medium">
                +{(afterScore - beforeScore).toFixed(1)}% improvement
              </div>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={beforeAfterData}>
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
            {beforeAfterData.map((item, i) => (
              <Card key={i} className="p-4 text-center">
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
      </div>

      {/* ✅ Finish Button at Bottom */}
      <div className="text-center py-6">
        <Button
          size="lg"
          onClick={() => navigate("/thanks")}
          className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 shadow-glow"
        >
          Finish
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default FinalPage;