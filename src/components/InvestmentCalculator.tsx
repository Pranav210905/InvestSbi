import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import type { CalculatorInputs } from '../types';

interface Props {
  type: 'sip' | 'fd' | 'rd' | 'swp';
  title: string;
}

export const InvestmentCalculator: React.FC<Props> = ({ type, title }) => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    amount: 0,
    duration: 0,
    rate: 0,
    frequency: 'monthly'
  });
  const [result, setResult] = useState<number | null>(null);

  const calculateSIP = (amount: number, duration: number, rate: number): number => {
    const monthlyRate = rate / (12 * 100);
    const months = duration * 12;
    return amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  };

  const calculateFD = (amount: number, duration: number, rate: number): number => {
    return amount * Math.pow(1 + rate / 100, duration);
  };

  const calculateRD = (amount: number, duration: number, rate: number): number => {
    const monthlyRate = rate / (12 * 100);
    const months = duration * 12;
    return amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  };

  const handleCalculate = () => {
    let calculatedResult = 0;
    switch (type) {
      case 'sip':
        calculatedResult = calculateSIP(inputs.amount, inputs.duration, inputs.rate);
        break;
      case 'fd':
        calculatedResult = calculateFD(inputs.amount, inputs.duration, inputs.rate);
        break;
      case 'rd':
        calculatedResult = calculateRD(inputs.amount, inputs.duration, inputs.rate);
        break;
      case 'swp':
        // SWP calculation is similar to SIP but in reverse
        calculatedResult = calculateSIP(inputs.amount, inputs.duration, inputs.rate);
        break;
    }
    setResult(Math.round(calculatedResult));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {type === 'swp' ? 'Withdrawal Amount' : 'Investment Amount'} (₹)
          </label>
          <input
            type="number"
            value={inputs.amount}
            onChange={(e) => setInputs({ ...inputs, amount: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Duration (Years)
          </label>
          <input
            type="number"
            value={inputs.duration}
            onChange={(e) => setInputs({ ...inputs, duration: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Interest Rate (% p.a.)
          </label>
          <input
            type="number"
            value={inputs.rate}
            onChange={(e) => setInputs({ ...inputs, rate: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700"
          />
        </div>

        {(type === 'sip' || type === 'swp') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Frequency
            </label>
            <select
              value={inputs.frequency}
              onChange={(e) => setInputs({ ...inputs, frequency: e.target.value as 'monthly' | 'quarterly' | 'yearly' })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4"
        >
          Calculate
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">Estimated Returns:</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{result.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};