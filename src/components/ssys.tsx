import React, { useState } from "react";

export const SSYCalculator: React.FC = () => {
  const [annualDeposit, setAnnualDeposit] = useState<number>(10000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7.6);
  const [investmentDuration, setInvestmentDuration] = useState<number>(21);
  const [maturityAmount, setMaturityAmount] = useState<number | null>(null);

  const calculateSSY = () => {
    const rate = annualInterestRate / 100;
    let amount = 0;
    
    for (let i = 0; i < investmentDuration; i++) {
      amount = (amount + annualDeposit) * (1 + rate);
    }

    setMaturityAmount(amount);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sukanya Samriddhi Yojana Calculator</h2>
      <div className="space-y-2">
        <label className="block">Annual Deposit:</label>
        <input type="number" value={annualDeposit} onChange={(e) => setAnnualDeposit(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Annual Interest Rate (%):</label>
        <input type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Investment Duration (years):</label>
        <input type="number" value={investmentDuration} onChange={(e) => setInvestmentDuration(+e.target.value)} className="w-full p-2 border rounded" />
        
        <button onClick={calculateSSY} className="w-full bg-blue-500 text-white p-2 rounded mt-4">Calculate</button>
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


