import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface GoldRate {
  city: string;
  gold_22k: string;
  gold_24k: string;
}

export const GoldRatesTable: React.FC = () => {
  const { theme } = useTheme();
  const [rates, setRates] = useState<GoldRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGoldRates = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_gold_rates');
        const data = await response.json();
        setRates(data);
      } catch (error) {
        console.error('Error fetching gold rates:', error);
        setRates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldRates();
  }, []);

  return (
    <div className={`overflow-x-auto ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <table className="w-full caption-bottom text-sm border">
        <thead>
          <tr className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <th className="p-4 text-left">City</th>
            <th className="p-4 text-left">22K Gold Rate (8g)</th>
            <th className="p-4 text-left">24K Gold Rate (8g)</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="text-center p-4">Loading...</td>
            </tr>
          ) : rates.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4">No data available</td>
            </tr>
          ) : (
            rates.map((rate, index) => (
              <tr
                key={rate.city}
                className={`
                  ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}
                  ${index % 2 === 0 ? (theme === 'dark' ? 'bg-gray-900' : 'bg-white') : (theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50')}
                `}
              >
                <td className="p-4">{rate.city}</td>
                <td className="p-4">{rate.gold_22k}</td>
                <td className="p-4">{rate.gold_24k}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GoldRatesTable;
