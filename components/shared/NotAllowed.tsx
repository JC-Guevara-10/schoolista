"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function NotAllowed() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Background Shapes for LMS Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="otas-shape otas-shape-top opacity-20 blur-[50px]" />
        <div className="otas-shape otas-shape-bottom opacity-20 blur-[50px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-card/60 backdrop-blur-xl border border-border/50 shadow-2xl rounded-3xl p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center border border-destructive/20"
          >
            <ShieldAlert className="w-12 h-12 text-destructive" />
          </motion.div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold tracking-tight text-foreground mb-3 font-heading"
        >
          Access Denied
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-8 leading-relaxed"
        >
          You don't have the necessary permissions to view this page. Please contact your administrator if you believe this is a mistake.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="group relative overflow-hidden transition-all duration-300 hover:border-primary/50"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
          <Button 
            size="lg"
            className="group bg-[#17489c] hover:bg-[#0b2e6d] text-white shadow-lg transition-all duration-300 border-0"
            onClick={() => router.push("/")}
          >
            <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotAllowed;
