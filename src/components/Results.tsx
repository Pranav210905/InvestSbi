import React from 'react';
import { motion } from 'framer-motion';
import { InvestmentPlan } from '../types/advisor';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

interface ResultsProps {
  plans: InvestmentPlan[];
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ plans, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto p-6"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Recommended Investment Plans
        </h2>
        
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {plan.name}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <TrendingUp size={20} className="mr-3" />
                  <span>Expected Returns: {plan.expectedReturns}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <DollarSign size={20} className="mr-3" />
                  <span>Minimum Investment: {plan.minimumInvestment}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Users size={20} className="mr-3" />
                  <span>Recommended For: {plan.recommendedFor}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={onReset}
          className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Over
        </button>
      </div>
    </motion.div>
  );
};