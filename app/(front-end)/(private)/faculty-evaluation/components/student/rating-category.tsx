import { Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface RatingCategoryProps {
  category: string;
  description?: string;
  onRatingChange?: (rating: number) => void;
}

export function RatingCategory({ category, description, onRatingChange }: RatingCategoryProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
    onRatingChange?.(value);
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-blue-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-gray-800 mb-1">{category}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
        {rating > 0 && (
          <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
            {rating}/5
          </span>
        )}
      </div>
      
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => handleRating(star)}
            className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg p-1"
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-gray-300"
              }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}


