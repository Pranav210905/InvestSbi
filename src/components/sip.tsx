import React, { useState } from "react";

export const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(12);
  const [investmentDuration, setInvestmentDuration] = useState<number>(10);
  const [finalAmount, setFinalAmount] = useState<number | null>(null);

  const calculateSIP = () => {
    const months = investmentDuration * 12;
    const monthlyRate = annualReturnRate / 12 / 100;
    let amount = 0;

    for (let i = 0; i < months; i++) {
      amount = (amount + monthlyInvestment) * (1 + monthlyRate);
    }

    setFinalAmount(amount);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">SIP Calculator</h2>
      <div className="space-y-2">
        <label className="block">Monthly Investment:</label>
        <input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Annual Return Rate (%):</label>
        <input type="number" value={annualReturnRate} onChange={(e) => setAnnualReturnRate(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Investment Duration (years):</label>
        <input type="number" value={investmentDuration} onChange={(e) => setInvestmentDuration(+e.target.value)} className="w-full p-2 border rounded" />
        
        <button onClick={calculateSIP} className="w-full bg-blue-500 text-white p-2 rounded mt-4">Calculate</button>
      </div>
      {finalAmount !== null && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Final Amount:</h3>
          <p className="text-green-600 font-bold">${finalAmount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

