import React, { useState } from "react";

export const RDCalculator: React.FC = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(6.5);
  const [depositDuration, setDepositDuration] = useState<number>(5);
  const [maturityAmount, setMaturityAmount] = useState<number | null>(null);

  const calculateRD = () => {
    const months = depositDuration * 12;
    const monthlyRate = annualInterestRate / 12 / 100;
    let amount = 0;

    for (let i = 0; i < months; i++) {
      amount = (amount + monthlyDeposit) * (1 + monthlyRate);
    }

    setMaturityAmount(amount);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recurring Deposit Calculator</h2>
      <div className="space-y-2">
        <label className="block">Monthly Deposit:</label>
        <input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Annual Interest Rate (%):</label>
        <input type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Deposit Duration (years):</label>
        <input type="number" value={depositDuration} onChange={(e) => setDepositDuration(+e.target.value)} className="w-full p-2 border rounded" />
        
        <button onClick={calculateRD} className="w-full bg-blue-500 text-white p-2 rounded mt-4">Calculate</button>
      </div>
      {maturityAmount !== null && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Maturity Amount:</h3>
          <p className="text-green-600 font-bold">${maturityAmount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};


