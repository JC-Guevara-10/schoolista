"use client";

import NextLink from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Download, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export function EvaluationSuccess() {
  const [submission] = useState(() => {
    const submittedAt = new Date();
    const confirmationId = Math.random().toString(36).slice(2, 11).toUpperCase();

    return {
      date: submittedAt.toLocaleDateString(),
      time: submittedAt.toLocaleTimeString(),
      confirmationId,
    };
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-primary">Faculty Evaluation System</h1>
              <p className="text-sm text-muted-foreground">Learning Management System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-green-200 bg-green-50/30">
              <CardContent className="pt-12 pb-12 text-center space-y-6">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex justify-center"
                >
                  <div className="bg-green-100 p-6 rounded-full">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                </motion.div>

                {/* Success Message */}
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold text-foreground">
                    Evaluation Submitted Successfully!
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thank you for taking the time to provide your feedback. Your input is valuable and helps us improve the quality of education.
                  </p>
                </div>

                {/* Confirmation Details */}
                <div className="bg-white rounded-lg p-6 space-y-3 text-left max-w-md mx-auto">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Submission Date:</span>
                    <span className="font-medium">{submission.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Submission Time:</span>
                    <span className="font-medium">{submission.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confirmation ID:</span>
                    <span className="font-medium font-mono">#EVAL-{submission.confirmationId}</span>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 max-w-md mx-auto">
                  <h3 className="font-semibold text-sm text-blue-900">What happens next?</h3>
                  <ul className="text-sm text-blue-800 space-y-1 text-left list-disc list-inside">
                    <li>Your responses are stored anonymously</li>
                    <li>Results will be aggregated with other students</li>
                    <li>Instructors will receive feedback after the evaluation period</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <NextLink href="/">
                    <Button className="gap-2 bg-primary hover:bg-primary/90">
                      <ArrowRight className="h-4 w-4" />
                      Return to Dashboard
                    </Button>
                  </NextLink>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Questions or concerns? Contact{" "}
              <a href="mailto:support@university.edu" className="text-primary hover:underline">
                support@university.edu
              </a>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}


