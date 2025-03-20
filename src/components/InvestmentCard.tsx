import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InvestmentOption } from '../types/investment';

interface Props {
  option: InvestmentOption;
}

export const InvestmentCard: React.FC<Props> = ({ option }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/investment/${option.id}`)}
      className="bg-gray-800 dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-700 hover:border-blue-500"
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
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-xs">Min Investment</p>
          <p className="text-white">₹{option.minInvestment.toLocaleString()}</p>
        </div>
        <ArrowRight className="text-blue-400" />
      </div>
    </div>
  );
};