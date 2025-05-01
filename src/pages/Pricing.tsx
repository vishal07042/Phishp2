
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from 'canvas-confetti';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCursor from "@/components/AnimatedCursor";

const Pricing = () => {
  useEffect(() => {
    // Launch confetti when page loads
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const plans = [
    {
      name: "Starter",
      price: "$299",
      period: "/month",
      description: "For small teams just getting started with security training.",
      features: [
        "Up to 50 users",
        "Monthly phishing campaigns",
        "Basic reporting",
        "Email support"
      ],
      highlighted: false,
      ctaText: "Get Started"
    },
    {
      name: "Professional",
      price: "$799",
      period: "/month",
      description: "For growing organizations ready to level up their security.",
      features: [
        "Up to 250 users",
        "Weekly phishing campaigns",
        "Advanced analytics",
        "Custom templates",
        "Priority support"
      ],
      highlighted: true,
      ctaText: "Start 14-Day Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with complex security needs.",
      features: [
        "Unlimited users",
        "Custom campaign scheduling",
        "Advanced API integrations",
        "Dedicated account manager",
        "Security risk assessment"
      ],
      highlighted: false,
      ctaText: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedCursor />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <section className="py-20 px-4" id="pricing">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 neon-glow">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the plan that's right for your organization's security needs.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl overflow-hidden ${
                    plan.highlighted 
                      ? 'border-2 border-primary shadow-lg shadow-primary/20' 
                      : 'border border-white/10 bg-white/5'
                  }`}
                >
                  <div className={`px-6 py-8 ${plan.highlighted ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50' : ''}`}>
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-end mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-5 w-5 mr-2 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${
                        plan.highlighted 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                          : ''
                      }`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      {plan.ctaText}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
