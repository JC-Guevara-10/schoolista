"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const feedbackOptions = [
  "Explains Clearly",
  "Approachable",
  "Well Prepared",
  "Engaging Lectures",
  "Helpful Feedback",
  "Fair Grading",
  "Punctual",
  "Encouraging",
  "Organized",
  "Patient",
  "Knowledgeable",
  "Needs Improvement"
];

interface QuickFeedbackTagsProps {
  onSelectionChange?: (selected: string[]) => void;
}

export function QuickFeedbackTags({ onSelectionChange }: QuickFeedbackTagsProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    const newSelection = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelection);
    onSelectionChange?.(newSelection);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-blue-100">
      <h3 className="text-gray-800 mb-4">Quick Feedback Tags</h3>
      <p className="text-sm text-gray-500 mb-4">Select all that apply</p>
      
      <div className="flex flex-wrap gap-2">
        {feedbackOptions.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const isNegative = tag === "Needs Improvement";
          
          return (
            <motion.button
              key={tag}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2 ${
                isSelected
                  ? isNegative
                    ? "bg-red-50 border-red-400 text-red-700"
                    : "bg-blue-500 border-blue-500 text-white"
                  : "bg-white border-blue-200 text-gray-700 hover:border-blue-400"
              }`}
            >
              {isSelected && <Check className="w-4 h-4" />}
              <span className="text-sm">{tag}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}


