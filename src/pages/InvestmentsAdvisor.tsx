import { useState } from 'react';
import { Questionnaire } from '../components/Questionnaire';
import { Results } from '../components/Results';
import type { Answer, InvestmentPlan } from '../types/advisor';
import axios from 'axios';
import { Briefcase } from 'lucide-react';

export default function InvestmentsAdvisor() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleQuestionnaireComplete = async (answers: Answer[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const getAge = () => {
        const ageStr = answers[0]?.answer?.split('-')[0];
        const age = parseInt(ageStr);
        if (isNaN(age)) throw new Error('Invalid age value');
        return age;
      };

      const getHorizon = () => {
        const horizonAnswer = answers[1]?.answer || '';
        return horizonAnswer.toLowerCase().includes('short') ? 'short' : 'long';
      };

      const getPeriod = () => {
        const periodStr = answers[2]?.answer?.split('-')[0];
        const period = parseInt(periodStr);
        if (isNaN(period)) throw new Error('Invalid period value');
        return period;
      };

      const getInvestmentType = () => {
        return (answers[3]?.answer || '').toLowerCase();
      };

      const getAmount = () => {
        const amountStr = answers[4]?.answer?.replace(/[^0-9]/g, '');
        const amount = parseInt(amountStr);
        if (isNaN(amount)) throw new Error('Invalid amount value');
        return amount;
      };

      const payload = {
        age: getAge(),
        horizon: getHorizon(),
        period: getPeriod(),
        investment_type: getInvestmentType(),
        amount: getAmount()
      };

      const response = await axios.post('http://localhost:5000/get_investment_options', payload);
      
      if (!response.data?.recommended_investments) {
        throw new Error('Invalid response from server');
      }

      const plans: InvestmentPlan[] = response.data.recommended_investments.map((name: string) => ({
        name,
        expectedReturns: getExpectedReturns(name),
        minimumInvestment: getMinimumInvestment(name),
        recommendedFor: getRecommendedFor(name)
      }));

      setInvestmentPlans(plans);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching investment options:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setInvestmentPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuestionnaire = () => {
    setShowResults(false);
    setInvestmentPlans([]);
    setError(null);
  };

  const getExpectedReturns = (name: string): string => {
    const returns: Record<string, string> = {
      'Real Estate Investment': '8-12% p.a.',
      'Fixed Deposit': '5-7% p.a.',
      'Gold Investment': '8-10% p.a.',
      'Share Market': '12-15% p.a.',
      'SWP Mutual Funds': '10-12% p.a.',
      'Index Funds': '10-12% p.a.',
      'ULIP Plans': '8-10% p.a.',
      'Post Office Schemes': '6-7% p.a.',
      'Startup Investment': '15-25% p.a.',
      'Senior Citizen Savings': '7-8% p.a.',
      'REIT': '8-10% p.a.',
      'LIC': '5-6% p.a.'
    };
    return returns[name] || '8-12% p.a.';
  };

  const getMinimumInvestment = (name: string): string => {
    const minimums: Record<string, string> = {
      'Real Estate Investment': '₹10,00,000',
      'Fixed Deposit': '₹1,000',
      'Gold Investment': '₹5,000',
      'Share Market': '₹500',
      'SWP Mutual Funds': '₹500',
      'Index Funds': '₹100',
      'ULIP Plans': '₹12,000/year',
      'Post Office Schemes': '₹1,000',
      'Startup Investment': '₹25,000',
      'Senior Citizen Savings': '₹1,000',
      'REIT': '₹50,000',
      'LIC': '₹10,000/year'
    };
    return minimums[name] || '₹10,000';
  };

  const getRecommendedFor = (name: string): string => {
    const recommendations: Record<string, string> = {
      'Real Estate Investment': 'Long-term investors with substantial capital',
      'Fixed Deposit': 'Conservative investors seeking stable returns',
      'Gold Investment': 'Risk-averse investors seeking value preservation',
      'Share Market': 'Risk-tolerant investors seeking high returns',
      'SWP Mutual Funds': 'Regular income seekers',
      'Index Funds': 'First-time investors seeking market returns',
      'ULIP Plans': 'Long-term investors seeking insurance + investment',
      'Post Office Schemes': 'Conservative investors seeking government backing',
      'Startup Investment': 'High-risk investors seeking exponential growth',
      'Senior Citizen Savings': 'Retirees seeking stable returns',
      'REIT': 'Real estate investors seeking liquidity',
      'LIC': 'Risk-averse investors seeking insurance benefits'
    };
    return recommendations[name] || 'All investors';
  };

  return (
    <div className="p-6 bg-transparent dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <Briefcase className="text-blue-500 w-10 h-10 mr-3" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Smart Investment Advisor
          </h1>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-6 p-5 bg-red-50 border border-red-200 rounded-lg text-lg">
            <p className="text-red-700">{error}</p>
            <button
              onClick={resetQuestionnaire}
              className="mt-3 text-red-600 hover:text-red-800 text-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-500"></div>
          </div>
        ) : showResults ? (
          <Results plans={investmentPlans} onReset={resetQuestionnaire} />
        ) : (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        )}
      </div>
    </div>
  );
}