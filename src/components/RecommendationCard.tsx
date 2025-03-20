import React from 'react';
import { motion } from 'framer-motion';
import { InvestmentOption } from "../types/investment"

interface Props {
  option: InvestmentOption;
  index: number;
}

export const RecommendationCard: React.FC<Props> = ({ option, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl text-blue-400">{option.icon}</div>
        <span className={`px-3 py-1 rounded-full text-xs ${
          option.riskLevel === 'Low' ? 'bg-green-900 text-green-200' :
          option.riskLevel === 'Medium' ? 'bg-yellow-900 text-yellow-200' :
          'bg-red-900 text-red-200'
        }`}>
          {option.riskLevel} Risk
        </span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{option.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{option.description}</p>
      <div className="space-y-2">
        <p className="text-gray-300 text-sm">
          <span className="text-gray-500">Min Investment:</span> ₹{option.minInvestment.toLocaleString()}
        </p>
        <p className="text-gray-300 text-sm">
          <span className="text-gray-500">Expected Returns:</span> {option.expectedReturns}
        </p>
        <div className="text-gray-400 text-sm mt-4">
          <p className="font-semibold text-blue-400 mb-2">Recommended for:</p>
          <ul className="list-disc list-inside space-y-1">
            {option.recommendedFor.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};