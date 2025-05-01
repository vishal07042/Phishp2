
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const testimonials = [
  {
    quote: "Our phishing susceptibility rate dropped by 82% after just three months of using Phishing Fire Drill.",
    author: "Sarah Johnson",
    position: "CISO, TechCorp Inc."
  },
  {
    quote: "The gamified approach makes security training something our team actually looks forward to instead of dreading.",
    author: "Michael Chen",
    position: "IT Director, Global Finance"
  },
  {
    quote: "The ROI has been incredible. We've prevented at least two major security incidents that would have cost us millions.",
    author: "Alex Rodriguez",
    position: "CEO, Retail Chain"
  },
];

const stats = [
  { value: "94%", label: "Reduction in successful phishing attempts" },
  { value: "82%", label: "Increase in threat reporting" },
  { value: "3.5x", label: "Return on investment" },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Companies of all sizes trust Phishing Fire Drill to protect their organizations.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 text-2xl">"</div>
                    <p className="mb-6 italic">{testimonial.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-200 dark:bg-slate-700 w-10 h-10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
