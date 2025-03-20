import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator, IndianRupee, Landmark, PiggyBank, Wallet,
  BadgeDollarSign, Heart, GraduationCap, Building2, Coins,
  LineChart, BarChart3, Briefcase, Building, Trophy
} from 'lucide-react';
import { useSavedSchemes } from '../contexts/SavedSchemesContext';
import { WebinarSlider } from '../components/WebinarSlider';
import type { InvestmentScheme } from '../types';


const schemes: InvestmentScheme[] = [
  // Fixed Capital Schemes
  {
    id: 'real-estate',
    title: 'Real Estate Investment',
    description: 'Long-term investment in property assets',
    icon: 'Building2',
    path: '/scheme/real-estate',
    category: 'fixed'
  },
  {
    id: 'fd',
    title: 'Fixed Deposit',
    description: 'Secure fixed-term investments',
    icon: 'Landmark',
    path: '/scheme/fd',
    category: 'fixed'
  },
  {
    id: 'gold',
    title: 'Gold Investment',
    description: 'Investment in physical and digital gold',
    icon: 'Coins',
    path: '/scheme/gold',
    category: 'fixed'
  },
  {
    id: 'shares',
    title: 'Share Market',
    description: 'Direct equity investments in stocks',
    icon: 'LineChart',
    path: '/scheme/shares',
    category: 'fixed'
  },
  {
    id: 'swp',
    title: 'SWP Mutual Funds',
    description: 'Regular withdrawals from investments',
    icon: 'IndianRupee',
    path: '/scheme/swp',
    category: 'fixed'
  },
  {
    id: 'index-funds',
    title: 'Index Funds',
    description: 'Passive investment tracking market indices',
    icon: 'BarChart3',
    path: '/scheme/index-funds',
    category: 'fixed'
  },
  {
    id: 'ulip',
    title: 'ULIP Plans',
    description: 'Combined insurance and investment',
    icon: 'Briefcase',
    path: '/scheme/ulip',
    category: 'fixed'
  },
  {
    id:"suku",
      title: 'Sukanya Samriddhi Yojana',
    description: 'Government backed savings schemes',
    icon: 'Wallet',
    path: '/scheme/post-office',
    category: 'fixed'
  },
  {
    id: 'startups',
    title: 'Startup Investment',
    description: 'Investment in emerging businesses',
    icon: 'Building',
    path: '/scheme/startups',
    category: 'fixed'
  },
  {
    id: 'senior-citizen',
    title: 'Senior Citizen Savings',
    description: 'Special savings for senior citizens',
    icon: 'GraduationCap',
    path: '/scheme/senior-citizen',
    category: 'fixed'
  },
  {
    id: 'ipo',
    title: 'IPO Investment',
    description: 'Investment in new public offerings',
    icon: 'Trophy',
    path: '/scheme/ipo',
    category: 'fixed'
  },
  {
    id: 'reit',
    title: 'REITs',
    description: 'Real Estate Investment Trusts',
    icon: 'Building2',
    path: '/scheme/reit',
    category: 'fixed'
  },

  // Recurring Capital Schemes
  {
    id: 'rd',
    title: 'Recurring Deposit',
    description: 'Regular savings with fixed returns',
    icon: 'PiggyBank',
    path: '/scheme/rd',
    category: 'recurring'
  },
  {
    id: 'sip',
    title: 'Systematic Investment Plan (SIP)',
    description: 'Regular investment in mutual funds',
    icon: 'Calculator',
    path: '/scheme/sip',
    category: 'recurring',
  }
];

const iconComponents = {
  Calculator,
  IndianRupee,
  Landmark,
  PiggyBank,
  Wallet,
  BadgeDollarSign,
  Heart,
  GraduationCap,
  Building2,
  Coins,
  LineChart,
  BarChart3,
  Briefcase,
  Building,
  Trophy
};

export const Home = () => {
  const navigate = useNavigate();
  const { toggleSaveScheme, isSchemesSaved } = useSavedSchemes();

  const fixedCapitalSchemes = schemes.filter(scheme => scheme.category === 'fixed');
  const recurringCapitalSchemes = schemes.filter(scheme => scheme.category === 'recurring');

  return (
    <div className="space-y-8">
      {/* Webinar Slider */}
      <WebinarSlider />

      {/* Recurring Capital Schemes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recurring Capital Investment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recurringCapitalSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              iconComponents={iconComponents}
              onNavigate={navigate}
              onToggleSave={toggleSaveScheme}
              isSaved={isSchemesSaved(scheme.id)}
            />
          ))}
        </div>
      </div>

      {/* Fixed Capital Schemes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Fixed Capital Investment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fixedCapitalSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              iconComponents={iconComponents}
              onNavigate={navigate}
              onToggleSave={toggleSaveScheme}
              isSaved={isSchemesSaved(scheme.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface SchemeCardProps {
  scheme: InvestmentScheme;
  iconComponents: Record<string, React.ComponentType>;
  onNavigate: (path: string) => void;
  onToggleSave: (scheme: InvestmentScheme) => void;
  isSaved: boolean;
}

const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  iconComponents,
  onNavigate,
  onToggleSave,
  isSaved
}) => {
  const IconComponent = iconComponents[scheme.icon as keyof typeof iconComponents];

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700 relative group"
      onClick={() => onNavigate(scheme.path)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave(scheme);
        }}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart
          className={`h-6 w-6 ${
            isSaved
              ? 'text-red-500 fill-current'
              : 'text-gray-400 hover:text-red-500'
          }`}
        />
      </button>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
      <span className="h-6 w-6 text-blue-600 dark:text-blue-400">
        <IconComponent/>
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{scheme.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{scheme.description}</p>
    </div>
  );
};