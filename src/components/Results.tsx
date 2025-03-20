import React from 'react';
import { motion } from 'framer-motion';
import { InvestmentPlan } from '../types/advisor';
import { TrendingUp, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Recommended Investment Plans
        </h2>

        <div className="space-y-8">
          {plans.map((plan, index) => {
            const isLIC = plan.name.toLowerCase().includes('lic');
            const isPostOffice = plan.name.toLowerCase().includes('post office');
            const isMutualFund = plan.name.toLowerCase().includes('mutual fund');
            const isGold = plan.name.toLowerCase().includes('gold');

            const PlanCard = (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 cursor-pointer hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {plan.name}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <TrendingUp size={20} className="mr-3" />
                    <span>Expected Returns: {plan.expectedReturns}</span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <DollarSign size={20} className="mr-3" />
                    <span>Minimum Investment: {plan.minimumInvestment}</span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users size={20} className="mr-3" />
                    <span>Recommended For: {plan.recommendedFor}</span>
                  </div>
                </div>
              </motion.div>
            );

            // Condition: LIC Plan
            if (isLIC) {
              return (
                <Link to="/lic-explorer" key={index}>
                  {PlanCard}
                </Link>
              );
            }

            // Condition: Post Office Plan
            if (isPostOffice) {
              return (
                <Link to="/post-office-explorer" key={index}>
                  {PlanCard}
                </Link>
              );
            }

            // Condition: Mutual Fund Plan
            if (isMutualFund) {
              return (
                <Link to="/get-mutual-funds" key={index}>
                  {PlanCard}
                </Link>
              );
            }

            if(isGold){
              return (
                <Link to="/gold" key={index}>
                  {PlanCard}
                </Link>
              );
            }

            // Default (Non-Clickable)
            return PlanCard;
          })}
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