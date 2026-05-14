"use client"
import { useState } from "react";
import { GraduationCap, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { QuickFeedbackTags } from "../components/student/quick-feedback-tags";
import { RatingCategory } from "../components/student/rating-category";
import { TeacherCard } from "../components/student/teacher-card";
import { ProgressIndicator } from "../components/student/progress-indicator";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [comments, setComments] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ratingCategories = [
    { 
      name: "Teaching Effectiveness", 
      description: "Clarity of instruction and ability to explain concepts"
    },
    { 
      name: "Communication Skills", 
      description: "Clarity and responsiveness in communication"
    },
    { 
      name: "Punctuality", 
      description: "Arrives on time and respects scheduled hours"
    },
    { 
      name: "Engagement", 
      description: "Makes classes interesting and interactive"
    },
    { 
      name: "Fairness in Grading", 
      description: "Grades assignments and exams fairly"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(1);
      setComments("");
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl text-gray-800 mb-3">Thank You!</h2>
          <p className="text-gray-600">
            Your evaluation has been submitted successfully. Your feedback helps us improve the quality of education.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-8 px-4 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl shadow-lg mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl text-gray-800 mb-2">Teacher Evaluation</h1>
          <p className="text-gray-600">Help us improve by sharing your honest feedback</p>
        </motion.div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={3} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Teacher Information Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TeacherCard
              teacherName="Dr. Sarah Johnson"
              subject="Quantitative Methods"
              avatarUrl="https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2NjcxNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
          </motion.div>

          {/* Rating Categories */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-sm"
          >
            <h3 className="text-xl text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-gray-800">⭐</span>
              </div>
              Rate Your Experience
            </h3>
            <div className="space-y-4">
              {ratingCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <RatingCategory
                    category={category.name}
                    description={category.description}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Feedback Tags */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <QuickFeedbackTags />
          </motion.div>

          {/* Written Feedback Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm"
          >
            <h3 className="text-gray-800 mb-2">Additional Comments</h3>
            <p className="text-sm text-gray-500 mb-4">
              Share any additional thoughts or suggestions (optional)
            </p>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Your feedback helps us improve..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none text-gray-700 placeholder-gray-400"
            />
            <div className="text-right text-sm text-gray-400 mt-2">
              {comments.length} characters
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4"
          >
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className="flex-1 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
            >
              Previous
            </button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-8 py-4 bg-yellow-400 text-gray-800 rounded-xl hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <span className="font-semibold">Submit Evaluation</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Privacy Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-gray-500 bg-blue-50 rounded-xl p-4 border border-blue-100"
          >
            🔒 Your feedback is anonymous and will be used to improve teaching quality
          </motion.div>
        </form>
      </div>
    </div>
  );
}


