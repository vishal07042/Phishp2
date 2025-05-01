
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 neon-glow">
              Phishing Fire Drill
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors hover-underline">Features</Link>
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors hover-underline">How It Works</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors hover-underline">Pricing</Link>
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors hover-underline">Dashboard</Link>
            <Link to="/login">
              <Button variant="outline" className="ml-4 border-white/20 bg-transparent hover:bg-white/10">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all duration-200">Get Started</Button>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-4 bg-black/90 p-4 rounded-lg border border-white/10">
              <Link 
                to="/features" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/how-it-works" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/pricing" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/dashboard" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link to="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-white/20 bg-transparent hover:bg-white/10">Log In</Button>
              </Link>
              <Link to="/signup" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
