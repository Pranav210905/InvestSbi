import React from 'react';
import { useParams } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { SIPCalculator } from '../components/sip';
import {FDCalculator} from '../components/fd'
import POMISCalculator from '../components/pmis'
import {SWPCalculator}   from '../components/swp'
import {SSYCalculator} from '../components/ssys';
import {RDCalculator} from '../components/rd';
export const SchemeDetails = () => {
  const { id } = useParams();

  const schemeInfo = {
    'real-estate': {
      id: "real-estate",
      title: "Real Estate Investment",
      description: "Real Estate investment involves purchasing properties such as land, residential, or commercial buildings to generate rental income or capital appreciation.",
      features: [
        "Potential for capital appreciation",
        "Steady rental income",
        "Diversifies investment portfolio",
        "Requires substantial initial investment",
        "Can be leveraged for loans"
      ]
    },
    ulip: {
      title: 'Unit Linked Insurance Plan (ULIP)',
      description:
        'ULIPs combine investment and insurance benefits in a single plan. A portion of your premium goes towards life insurance, while the rest is invested in market-linked instruments.',
      features: [
        'Dual benefit of insurance and investment',
        'Market-linked returns',
        'Tax benefits under Section 80C & 10(10D)',
        'Flexibility to switch between funds',
        'Long-term wealth creation with protection',
      ],
    },
    sip: {
      id:'sip',
      title: 'Systematic Investment Plan (SIP)',
      description: 'A Systematic Investment Plan (SIP) is an investment strategy where you invest a fixed amount regularly in mutual funds. This disciplined approach helps in wealth creation over time through the power of compounding.',
      features: [
        'Regular investment intervals (monthly, quarterly)',
        'Rupee cost averaging benefits',
        'Start with as little as ₹500 per month',
        'Automated investment process',
        'Long-term wealth creation'
      ],
      sip:SIPCalculator
    },
    swp: {
      id:"swp",
      title: 'Systematic Withdrawal Plan (SWP)',
      description: 'A Systematic Withdrawal Plan allows you to withdraw a fixed amount from your mutual fund investments at regular intervals. It\'s ideal for generating regular income from your investments.',
      features: [
        'Regular withdrawal facility',
        'Flexibility in withdrawal amount',
        'Tax-efficient withdrawals',
        'Better than traditional fixed deposits',
        'Maintain investment growth potential'
      ]
    },
    fd: {
      id: "fd",
      title: 'Fixed Deposit',
      description: 'Fixed Deposits are secure investment instruments offered by banks that provide guaranteed returns. They\'re ideal for risk-averse investors looking for steady returns.',
      features: [
        'Guaranteed returns',
        'Flexible tenure options',
        'Higher interest rates than savings accounts',
        'Loan facility against FD',
        'Safe and secure investment'
      ]
    },
    rd: {
      id:"rd",
      title: 'Recurring Deposit',
      description: 'Recurring Deposits help you save regularly by depositing a fixed amount monthly. It\'s perfect for building a savings habit while earning guaranteed returns.',
      features: [
        'Monthly investment discipline',
        'Fixed interest rates',
        'Flexible tenure',
        'No market risk',
        'Ideal for short-term goals'
      ]
    },
    'post-office': {
      id:"post-office",
      title: 'Post Office Schemes',
      description: 'Post Office Savings Schemes are government-backed investment options offering secure returns. They include various schemes catering to different investment needs.',
      features: [
        'Government backed security',
        'Higher interest rates',
        'Tax benefits available',
        'Wide accessibility',
        'Multiple scheme options'
      ]
    },
    gold: {
      id: "gold",
      title: "Gold",
      description: "Gold is a traditional investment asset that acts as a hedge against inflation and economic uncertainties. It can be held in physical or digital form.",
      features: [
        "Acts as a hedge against inflation",
        "High liquidity",
        "Can be held in physical or digital form",
        "Globally recognized asset",
        "Limited supply ensures value retention"
      ]
    },
    'index-funds': {
      title: 'Index Funds',
      description:
        'Index Funds are passive mutual funds that track a specific market index like the NIFTY 50 or SENSEX. They offer diversification and low-cost investing with market-linked returns.',
      features: [
        'Low-cost passive investing',
        'Tracks a market index (e.g., NIFTY 50, SENSEX)',
        'No active fund management risk',
        'Diversification across multiple stocks',
        'Ideal for long-term wealth creation',
      ],
    },
    pension: {
      id:"pension",
      title: 'Pension Scheme',
      description: 'Pension schemes are long-term retirement savings products that help you build a corpus for your retirement years while providing tax benefits.',
      features: [
        'Regular pension post retirement',
        'Tax benefits on investment',
        'Life coverage included',
        'Multiple investment options',
        'Inflation protection'
      ]
    },
    shares: {
      id: "shares",
      title: "Shares",
      description: "Shares represent ownership in a company, giving investors a claim on profits and voting rights. They are traded in stock markets and can generate returns through capital appreciation and dividends.",
      features: [
        "Potential for high returns",
        "Dividend income",
        "Market liquidity",
        "Ownership in a company",
        "Risk varies based on market conditions"
      ]
    },
  
    "suku": {
      id:"suku",
      title: 'Sukanya Samriddhi Yojana',
      description: 'A government-backed savings scheme for girl children that offers high interest rates and tax benefits. It\'s designed to secure the financial future of girl children.',
      features: [
        'Higher interest rates',
        'Tax-free returns',
        'Government backed scheme',
        'Long-term savings plan',
        'Partial withdrawal facility'
      ]
    },
    startups: {
      id: "startups",
      title: "Startup Investment",
      description: "Investing in startups involves funding early-stage companies with high growth potential but also significant risk.",
      features: [
        "High-risk, high-reward potential",
        "Opportunity to support innovation",
        "Equity ownership in startups",
        "Requires thorough research",
        "Long-term investment horizon"
      ]
    },
  
    'senior-citizen': {
      id:"senior-citizen",
      title: 'Senior Citizen Savings Scheme',
      description: 'A government-sponsored savings scheme exclusively for senior citizens that offers higher interest rates and regular income options.',
      features: [
        'Higher interest rates than FDs',
        'Regular quarterly interest payout',
        'Tax benefits available',
        'Secure government backing',
        'Simple documentation'
      ]
    },
    reit: {
      title: 'Real Estate Investment Trusts (REITs)',
      description:
        'REITs allow individuals to invest in income-generating real estate properties without directly owning them. They provide liquidity and steady dividends.',
      features: [
        'Diversified real estate investment',
        'Regular dividend income',
        'Lower investment entry barrier',
        'Liquidity compared to physical property',
        'Regulated investment option',
      ],
    },
    ipo: {
      title: 'Initial Public Offerings (IPOs)',
      description:
        'An Initial Public Offering (IPO) is when a private company offers its shares to the public for the first time. Investing in IPOs provides an opportunity to become an early investor in promising companies.',
      features: [
        'Opportunity to invest in new companies',
        'Potential for high growth',
        'Early access to company shares',
        'Short & long-term investment options',
        'Regulated by SEBI for transparency',
      ],
    },
  };

  const currentScheme = schemeInfo[id?.toLowerCase()];


  if (!currentScheme) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Scheme not found
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Scheme Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {currentScheme.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {currentScheme.description}
        </p>
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Key Features
        </h2>
        <ul className="space-y-4">
          {currentScheme.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-blue-500 dark:text-blue-400 mr-3">
                •
              </span>
              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Calculator Section */}
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <Calculator className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Investment Calculator
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Use our calculator to plan your investment and estimate returns.
        </p>

        {/* Render SIP Calculator only for SIP */}
        {id === 'sip' && <SIPCalculator />}
        {id==="fd" && <FDCalculator/>}
        {id==="rd" && <RDCalculator/>}
        {id==="pension" && <POMISCalculator/>}
        {id==="suku" && <SSYCalculator/>}
        {id==="swp" && <SWPCalculator/>}

      </div>
    </div>
  );
};
