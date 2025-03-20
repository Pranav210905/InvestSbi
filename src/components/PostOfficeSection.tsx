import React, { useEffect, useState } from 'react';
import { 
  PiggyBank, 
  Calculator, 
  Clock, 
  Building, 
  Mail, 
  Banknote,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Scheme {
  title: string;
  description: string;
  link: string;
}

interface SchemeCategories {
  [key: string]: Scheme[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Savings Schemes':
      return PiggyBank;
    case 'Time Deposits':
      return Clock;
    case 'Monthly Income Schemes':
      return Calculator;
    case 'Senior Citizens Schemes':
      return Building;
    case 'Recurring Deposits':
      return Banknote;
    default:
      return Mail;
  }
};

export function PostOfficeSchemeExplorer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [schemes, setSchemes] = useState<SchemeCategories>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await fetch('http://localhost:5000/post_office_policies');
      const data = await response.json();

      if (!data || typeof data !== "object") {
        throw new Error("Invalid API response");
      }

      setSchemes(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch post office schemes. Please try again later.');
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(schemes).map(([category, categorySchemes]) => (
        <div key={category} className="border-b border-gray-300 pb-4">
          {/* CATEGORY HEADER */}
          <div 
            className="flex justify-between items-center cursor-pointer p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => toggleCategory(category)}
          >
            <div className="flex items-center gap-3">
              <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
                isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'
              }`}>
                {React.createElement(getCategoryIcon(category), {
                  className: `h-6 w-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`
                })}
              </div>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {category}
              </h2>
            </div>
            {/* Chevron Icon for Expand/Collapse */}
            {openCategory === category ? (
              <ChevronUp className={`h-6 w-6 ${isDark ? 'text-indigo-400' : 'text-gray-600'}`} />
            ) : (
              <ChevronDown className={`h-6 w-6 ${isDark ? 'text-indigo-400' : 'text-gray-600'}`} />
            )}
          </div>

          {/* SCHEMES (Only Show If Category is Open) */}
          {openCategory === category && (
            <div className="p-4 space-y-6">
              {categorySchemes.map((scheme, index) => (
                <div key={`${category}-${index}`} className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                } shadow-md`}>
                  {/* Scheme Title */}
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {scheme.title}
                  </h3>

                  {/* Scheme Description */}
                  <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {scheme.description}
                  </p>

                  {/* Forms Available Button */}
                  <a 
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 text-sm"
                  >
                    Forms Available →
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
