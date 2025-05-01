
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Award } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import confetti from 'canvas-confetti';

interface PhishingEmail {
  id: number;
  subject: string;
  sender: string;
  content: string;
  isPhishing: boolean;
  clue?: string;
}

const phishingEmails: PhishingEmail[] = [
  {
    id: 1,
    subject: "Urgent: Your Account Will Be Suspended",
    sender: "security@bankofameica.com", // Misspelled domain
    content: "Dear valued customer, we've noticed suspicious activity on your account. Click here to verify your identity immediately or your account will be suspended.",
    isPhishing: true,
    clue: "Check the sender's email domain carefully"
  },
  {
    id: 2,
    subject: "Your Monthly Statement",
    sender: "statements@chase.com",
    content: "Your monthly statement is ready to view. Please log in to your account through our official website to access it.",
    isPhishing: false
  },
  {
    id: 3,
    subject: "Netflix: Update Your Payment Information",
    sender: "support@netfflix.com", // Extra 'f'
    content: "Your payment method has expired. Update your payment information within 24 hours to avoid service interruption.",
    isPhishing: true,
    clue: "Look for spelling errors in the domain name"
  },
  {
    id: 4,
    subject: "Your Amazon Order Has Shipped",
    sender: "shipment-tracking@amazon.com",
    content: "Your order #A28563947 has shipped and will arrive on Thursday. Track your package with the link in your account.",
    isPhishing: false
  }
];

const PhishingSimulator = () => {
  const [currentEmail, setCurrentEmail] = useState<PhishingEmail>(phishingEmails[0]);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  
  const getRandomEmail = () => {
    const randomIndex = Math.floor(Math.random() * phishingEmails.length);
    return phishingEmails[randomIndex];
  };
  
  const handlePhishingCheck = (userThinkIsPhishing: boolean) => {
    setRevealed(true);
    
    if (userThinkIsPhishing === currentEmail.isPhishing) {
      // Correct answer
      const newScore = score + 10;
      setScore(newScore);
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      toast.success("Great job! You correctly identified this email.", {
        description: `+10 points! Streak: ${newStreak}`
      });
      
      // More elaborate confetti for correct answers
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#3b82f6', '#ffffff']
      });
      
      // Award special animation for streaks
      if (newStreak % 3 === 0) {
        setTimeout(() => {
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.7 },
            gravity: 1.2
          });
          toast("STREAK BONUS!", {
            icon: <Award className="h-5 w-5 text-yellow-500" />,
            description: `You're on fire! ${newStreak} correct in a row!`,
            className: "bg-gradient-to-r from-yellow-600 to-orange-600 text-white"
          });
        }, 500);
      }
    } else {
      // Wrong answer
      setStreak(0);
      toast.error("Oops! That's not correct. Keep practicing!");
      document.body.classList.add('shake');
      setTimeout(() => {
        document.body.classList.remove('shake');
      }, 500);
    }
    
    // Switch to next email after 2 seconds
    setTimeout(() => {
      setRevealed(false);
      setShowHint(false);
      setCurrentEmail(getRandomEmail());
    }, 2000);
  };

  const toggleHint = () => {
    if (!revealed && currentEmail.clue) {
      setShowHint(!showHint);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full px-4 py-1 text-white font-bold"
        >
          Score: {score}
        </motion.div>
        
        <AnimatePresence>
          {streak > 0 && (
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="bg-orange-600 rounded-full px-4 py-1 text-white font-bold flex items-center"
            >
              <span className="mr-1">🔥</span> {streak}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Card className={`w-full shadow-lg overflow-hidden ${
        revealed && currentEmail.isPhishing 
          ? 'border-red-500 neon-border' 
          : revealed 
            ? 'border-green-500 neon-border' 
            : 'border-white/10 hover:border-white/20'
      }`}>
        <CardHeader className="bg-white/5">
          <CardTitle className="flex justify-between">
            <span>{currentEmail.subject}</span>
            {revealed && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {currentEmail.isPhishing ? 
                  <AlertTriangle className="text-red-500" /> : 
                  <Shield className="text-green-500" />
                }
              </motion.div>
            )}
          </CardTitle>
          <CardDescription>From: {currentEmail.sender}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <p>{currentEmail.content}</p>
          
          <AnimatePresence>
            {showHint && currentEmail.clue && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-2 bg-yellow-500/20 border border-yellow-500/50 rounded text-sm"
              >
                <strong>Hint:</strong> {currentEmail.clue}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between bg-white/5">
          <div>
            {currentEmail.clue && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleHint}
                disabled={revealed}
                className="text-muted-foreground hover:text-white"
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handlePhishingCheck(false)}
              disabled={revealed}
              className="border-white/10 hover:bg-white/10"
            >
              Legitimate
            </Button>
            <Button 
              variant="default" 
              onClick={() => handlePhishingCheck(true)}
              disabled={revealed}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Phishing
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PhishingSimulator;
