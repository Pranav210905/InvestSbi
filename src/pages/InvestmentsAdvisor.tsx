import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Question } from '../components/Question';
import { RecommendationCard } from '../components/RecommendationCard';
import { QuestionnaireData, investmentOptions } from '../types/investment';
import React from 'react';

export const InvestmentsAdvisor = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuestionnaireData>({
    age: 0,
    investmentFor: "myself",
    investmentTerm: 'long-term',
    investmentType: 'recurring',
    amount: 0,
    duration: 0,
    timePeriod: 0,
  });

  const questions = [
    {
      question: "What's your age?",
      component: (
        <input
          type="number"
          value={data.age || ''}
          onChange={(e) => setData({ ...data, age: parseInt(e.target.value) })}
          className="w-full bg-gray-700 text-white rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your age"
        />
      ),
      isValid: () => data.age > 0
    },
    {
      question: "What's your investment horizon?",
      component: (
        <div className="grid grid-cols-2 gap-4">
          {["short-term", "long-term"].map((option) => (
            <button
              key={option}
              onClick={() => setData({ ...data, investmentTerm: option as any })}
              className={`p-4 rounded-lg transition-all ${
                data.investmentTerm === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      ),
      isValid: () => Boolean(data.investmentTerm)
    },
    {
      question: "How would you like to invest?",
      component: (
        <div className="grid grid-cols-2 gap-4">
          {["recurring", "lumpsum"].map((option) => (
            <button
              key={option}
              onClick={() => setData({ ...data, investmentType: option as any })}
              className={`p-4 rounded-lg transition-all ${
                data.investmentType === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      ),
      isValid: () => Boolean(data.investmentType)
    },
    {
      question: data.investmentType === 'recurring' ? "Choose your investment frequency" : "Enter your lumpsum amount",
      component: data.investmentType === 'recurring' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {["monthly", "fortnightly"].map((option) => (
              <button
                key={option}
                onClick={() => setData({ ...data, frequency: option as any })}
                className={`p-4 rounded-lg transition-all ${
                  data.frequency === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={data.amount || ''}
            onChange={(e) => setData({ ...data, amount: parseInt(e.target.value) })}
            className="w-full bg-gray-700 text-white rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount per installment"
          />
        </div>
      ) : (
        <input
          type="number"
          value={data.amount || ''}
          onChange={(e) => setData({ ...data, amount: parseInt(e.target.value) })}
          className="w-full bg-gray-700 text-white rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter lumpsum amount"
        />
      ),
      isValid: () => data.investmentType === 'recurring' ? (Boolean(data.frequency) && data.amount > 0) : data.amount > 0
    },
    {
      question: "For how many years do you want to invest?",
      component: (
        <input
          type="number"
          value={data.duration || ''}
          onChange={(e) => setData({ ...data, duration: parseInt(e.target.value) })}
          className="w-full bg-gray-700 text-white rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter number of years"
        />
      ),
      isValid: () => data.duration > 0
    }
  ];

  return (
    <div className="p-6 bg-transparent dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Smart Investment Advisor
        </h1>
        
        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <Question
              key={step}
              question={questions[step].question}
              onNext={() => setStep(step + 1)}
              canProgress={questions[step].isValid()}
            >
              {React.cloneElement(questions[step].component, {
                className: `w-full rounded-lg p-4 focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white ${
                  questions[step].component.props.className || ''
                }`
              })}
            </Question>
          ) : (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-center mb-8">
                Here are your personalized investment recommendations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investmentOptions.map((option) => (
                  <RecommendationCard 
                    key={option.id} 
                    option={option} 
                    className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700/20"
                  />
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
