
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const solutionSteps = [
  {
    title: "AI-Generated Phishing Simulations",
    description: "Our system creates realistic, customized phishing attempts based on current threats.",
  },
  {
    title: "Regular Fire Drills",
    description: "Scheduled and surprise training exercises keep your team alert and prepared.",
  },
  {
    title: "Immediate Feedback",
    description: "Real-time education when mistakes happen for maximum learning impact.",
  },
  {
    title: "Progress Tracking",
    description: "Analytics dashboard shows improvement and identifies vulnerable areas.",
  },
];

const SolutionSection = () => {
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
          <h2 className="text-3xl font-bold mb-4">The Solution</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our Phishing Fire Drill approach transforms security training from a boring compliance exercise into an engaging, effective learning experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solutionSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
