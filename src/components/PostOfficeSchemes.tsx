import { useEffect, useState } from 'react';
import { PiggyBank, Landmark, ShieldCheck, Banknote, ArrowUpRight, Building2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Scheme {
  title: string;
  content: string;
}

const getSchemeIcon = (title: string) => {
  if (title.includes('Deposit')) return Banknote;
  if (title.includes('Savings') || title.includes('Account')) return PiggyBank;
  if (title.includes('Pension') || title.includes('Senior')) return Landmark;
  if (title.includes('Insurance')) return ShieldCheck;
  return Building2;
};

export function PostOfficeSchemeExplorer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // <-- For toggling

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await fetch('http://localhost:5000/post_office_policies');
      const data = await response.json();
      setSchemes(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch schemes. Please try again later.');
      setLoading(false);
    }
  };

  const toggleContent = (index: number) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
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
    <div className="space-y-8">
      <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Post Office Saving Schemes
      </h2>

      <div className="space-y-4">
        {schemes.map((scheme, index) => {
          const Icon = getSchemeIcon(scheme.title);
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 shadow-lg ${
                isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
            >
              {/* Title */}
              <div
                className={`flex justify-between items-center cursor-pointer px-6 py-4 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}
                onClick={() => toggleContent(index)}
              >
                <div className="flex items-center space-x-4">
                  <Icon className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className="text-lg font-semibold">{scheme.title}</h3>
                </div>
                <ArrowUpRight
                  className={`h-5 w-5 transform transition-transform ${
                    isExpanded ? 'rotate-45' : ''
                  } ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                />
              </div>

              {/* Content */}
              {isExpanded && (
                <div>
                <div
                  className={`px-6 py-4 border-t ${
                    isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'
                  }`}
                  dangerouslySetInnerHTML={{ __html: scheme.content }}
                />
                <a href="https://www.indiapost.gov.in/VAS/Pages/Form.aspx#SavingCertificates">Forms available</a>
              </div>
              )}
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
