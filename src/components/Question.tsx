//Question.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface QuestionProps {
  question: string;
  children: React.ReactNode;
  onNext: () => void;
  canProgress: boolean;
}

export const Question: React.FC<QuestionProps> = ({ question, children, onNext, canProgress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8 shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        {question}
      </h2>
      <div className="mb-6">{children}</div>
      {canProgress && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:from-blue-600 hover:to-purple-700"
        >
          Next
        </motion.button>
      )}
    </motion.div>
  );
};