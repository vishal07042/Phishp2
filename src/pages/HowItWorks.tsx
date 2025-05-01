
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from 'canvas-confetti';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCursor from "@/components/AnimatedCursor";

const HowItWorks = () => {
  useEffect(() => {
    // Launch confetti when page loads
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const steps = [
    {
      number: "01",
      title: "Setup Campaign",
      description: "Create a customized phishing campaign tailored to your organization's needs and vulnerabilities."
    },
    {
      number: "02",
      title: "Deploy Simulations",
      description: "Our AI generates realistic phishing attempts that are sent to your team at random intervals."
    },
    {
      number: "03",
      title: "Real-time Training",
      description: "When team members interact with simulations, they receive immediate educational feedback."
    },
    {
      number: "04",
      title: "Track Results",
      description: "Monitor progress through our analytics dashboard and see improvement over time."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedCursor />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 neon-glow">
                How It Works
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Our approach to security training is simple yet effective, combining realistic simulations with engaging learning.
              </p>
            </motion.div>
            
            <div className="space-y-12 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row items-start gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-lg">{step.description}</p>
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

export default HowItWorks;
