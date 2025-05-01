
import React from "react";
import { motion } from "framer-motion";
import PhishingSimulator from "./PhishingSimulator";

const DemoSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Try It Yourself</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Can you spot the phishing attempt? Test your skills with our interactive demo.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <PhishingSimulator />
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
