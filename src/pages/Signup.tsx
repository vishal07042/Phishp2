
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCursor from "@/components/AnimatedCursor";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedCursor />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <Card className="bg-black/40 border border-white/10 backdrop-blur-xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                  Enter your information to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm">
                    Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="bg-white/5 border-white/10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    className="bg-white/5 border-white/10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <Input 
                    id="password" 
                    type="password" 
                    className="bg-white/5 border-white/10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Sign Up
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
