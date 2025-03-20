import React, { useState } from "react";

export const POMISCalculator: React.FC = () => {
  const [principalAmount, setPrincipalAmount] = useState<number>(10000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7.4);
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);

  const calculatePOMIS = () => {
    const monthlyRate = annualInterestRate / 12 / 100;
    const income = principalAmount * monthlyRate;
    setMonthlyIncome(income);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Post Office Monthly Income Scheme Calculator</h2>
      <div className="space-y-2">
        <label className="block">Principal Amount:</label>
        <input type="number" value={principalAmount} onChange={(e) => setPrincipalAmount(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Annual Interest Rate (%):</label>
        <input type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(+e.target.value)} className="w-full p-2 border rounded" />
        
        <button onClick={calculatePOMIS} className="w-full bg-blue-500 text-white p-2 rounded mt-4">Calculate</button>
      </div>
      {monthlyIncome !== null && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Monthly Income:</h3>
          <p className="text-green-600 font-bold">${monthlyIncome.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default POMISCalculator;
