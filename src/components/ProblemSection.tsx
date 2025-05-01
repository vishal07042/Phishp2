
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const timelineItems = [
  {
    title: "The Attack Begins",
    description: "A seemingly innocent email arrives in your inbox from a 'trusted source'",
    icon: "📧",
  },
  {
    title: "The Deception",
    description: "The email contains urgent language and a request to click a link or download a file",
    icon: "🕵️",
  },
  {
    title: "The Mistake",
    description: "An untrained employee clicks without verifying the source or checking for warning signs",
    icon: "👆",
  },
  {
    title: "The Breach",
    description: "Sensitive data is compromised, systems are infected, or credentials are stolen",
    icon: "💥",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900      
    ">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">The Problem</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Phishing remains the top security threat to organizations, with over 90% of breaches starting with a deceptive email.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 hidden md:block"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row gap-4"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 text-2xl z-10">
                    {item.icon}
                  </div>
                  
                  <Card className="flex-grow md:ml-4">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
