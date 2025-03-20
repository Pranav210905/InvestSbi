import React, { useState } from "react";

export const PPFCalculator: React.FC = () => {
  const [annualDeposit, setAnnualDeposit] = useState<number>(50000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7.1);
  const [investmentDuration, setInvestmentDuration] = useState<number>(15);
  const [maturityAmount, setMaturityAmount] = useState<number | null>(null);

  const calculatePPF = () => {
    const rate = annualInterestRate / 100;
    let amount = 0;
    
    for (let i = 0; i < investmentDuration; i++) {
      amount = (amount + annualDeposit) * (1 + rate);
    }

    setMaturityAmount(amount);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Public Provident Fund (PPF) Calculator</h2>
      <div className="space-y-2">
        <label className="block">Annual Deposit:</label>
        <input type="number" value={annualDeposit} onChange={(e) => setAnnualDeposit(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Annual Interest Rate (%):</label>
        <input type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(+e.target.value)} className="w-full p-2 border rounded" />
        
        <label className="block">Investment Duration (years):</label>
        <input type="number" value={investmentDuration} onChange={(e) => setInvestmentDuration(+e.target.value)} className="w-full p-2 border rounded" />
        
        <button onClick={calculatePPF} className="w-full bg-blue-500 text-white p-2 rounded mt-4">Calculate</button>
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

export default PPFCalculator;
