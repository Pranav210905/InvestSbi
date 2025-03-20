import React, { useState } from "react";

export const SWPCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(5000);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(7);
  const [investmentDuration, setInvestmentDuration] = useState<number>(10);
  const [remainingBalance, setRemainingBalance] = useState<number | null>(null);

  const calculateSWP = () => {
    let balance = initialInvestment;
    const monthlyRate = annualReturnRate / 12 / 100;
    const months = investmentDuration * 12;

    for (let i = 0; i < months; i++) {
      balance = balance * (1 + monthlyRate) - monthlyWithdrawal;
      if (balance <= 0) {
        balance = 0;
        break;
      }
    }

    setRemainingBalance(balance);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">SWP Calculator</h2>
      <div className="space-y-2">
        <label className="block">Initial Investment:</label>
        <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Monthly Withdrawal:</label>
        <input type="number" value={monthlyWithdrawal} onChange={(e) => setMonthlyWithdrawal(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Annual Return Rate (%):</label>
        <input type="number" value={annualReturnRate} onChange={(e) => setAnnualReturnRate(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Investment Duration (years):</label>
        <input type="number" value={investmentDuration} onChange={(e) => setInvestmentDuration(+e.target.value)} className="w-full p-2 border rounded" />
        
        <button onClick={calculateSWP} className="w-full bg-blue-500 text-white p-2 rounded mt-4">Calculate</button>
      </div>
      {remainingBalance !== null && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Remaining Balance:</h3>
          <p className="text-green-600 font-bold">${remainingBalance.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};


