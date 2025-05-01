
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Security Culture?</h2>
          <p className="text-lg mb-8 text-white/90">
            Start your first Fire Drill today and see how engaging cybersecurity training can be.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-2 border-white">
              Start Your First Fire Drill 🔥
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
