export interface QuestionnaireData {
  age: number;
  investmentFor: 'myself' | 'kids' | 'parents' | any;
  investmentTerm: 'short-term' | 'long-term';
  investmentType: 'recurring' | 'lumpsum';
  frequency?: 'monthly' | 'fortnightly';
  amount: number;
  duration: number;
  currentCorpus?: number;
}

export interface InvestmentOption {
  term: string;
  category: string;
  id: string;
  name: string;
  description: string;
  icon: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  minInvestment: number;
  expectedReturns: string;
  suitabilityScore: number;
  recommendedFor: string[];
}


export const investmentOptions: InvestmentOption[] = [
  {
    id: 'Recurring-Deposit',
    name: 'Recurring Deposit',
    description: 'Recurring Deposits help you save monthly with fixed returns, zero market risk, and flexible tenure.',
    icon: '📈',
    riskLevel: 'Low',
    minInvestment: 1500,
    expectedReturns: '6.5-9% p.a.',
    suitabilityScore: 0,
    recommendedFor: [
      'Salaried Individuals: To build disciplined savings for short-term goals.',
      'Students & Young Professionals: To develop a habit of saving with small monthly deposits.',
      'Retirees & Conservative Investors: To earn secure and stable returns without market risk.'
    ],
    category: "",
    term: ""
  },
  {
    id: 'sip',
    name: 'Systematic Investment Plan (SIP)',
    description: 'SIP helps you grow wealth systematically over time by investing a fixed amount in mutual funds at regular intervals.',
    icon: '👶',
    riskLevel: 'Low',
    minInvestment: 2000,
    expectedReturns: '8-10% p.a.',
    suitabilityScore: 0,
    recommendedFor: [
      'Young Professionals & First-Time Investors : To start investing with small amounts and build long-term wealth.',
      'Salaried Individuals: To create financial discipline and benefit from rupee cost averaging.',
      'Long-Term Investors & Retirement Planners: To achieve financial goals through consistent and compounded growth.'
    ],
    category: "",
    term: ""
  },
    {
      "id": "fd",
      "name": "Fixed Deposit (FD)",
      "description": "FD is a secure investment option that offers guaranteed returns over a fixed tenure, making it ideal for risk-averse investors.",
      "icon": "💰",
      "riskLevel": "Low",
      "minInvestment": 1000,
      "expectedReturns": "5-8% p.a.",
      "suitabilityScore": 0,
      "recommendedFor": [
        "Retirees & Senior Citizens: To earn steady income with higher interest rates.",
        "Salaried & Middle-Class Individuals: To park surplus funds safely and earn assured returns.",
        "Conservative Investors: To grow savings without market-related risks."
      ],
      category: "",
      term: ""
    },
  {
    "id": "swp",
    "name": "Systematic Withdrawal Plan (SWP)",
    "description": "SWP allows you to withdraw a fixed amount from your mutual fund investments at regular intervals while keeping your remaining investments growing.",
    "icon": "📤",
    "riskLevel": "Medium",
    "minInvestment": 5000,
    "expectedReturns": "8-12% p.a.",
    "suitabilityScore": 0,
    "recommendedFor": [
      "Retirees & Pensioners: To generate a steady income while keeping investments growing.",
      "Freelancers & Self-Employed Individuals: To create a consistent income stream from investments.",
      "Long-Term Investors: To withdraw funds periodically while maintaining long-term capital appreciation."
    ],
    category: "",
    term: ""
  },
  {
    "id": "post_office_schemes",
    "name": "Post Office Savings Schemes",
    "description": "Government-backed savings schemes offering secure returns with tax benefits and multiple investment options.",
    "icon": "🏤",
    "riskLevel": "Low",
    "minInvestment": 500,
    "expectedReturns": "4-8% p.a.",
    "suitabilityScore": 0,
    "recommendedFor": [
      "Retirees & Senior Citizens: To invest in safe, high-return schemes with regular income options.",
      "Low-Risk Investors: To secure guaranteed returns with government-backed security.",
      "Tax Savers: To benefit from tax deductions while earning stable interest."
    ],
    category: "",
    term: ""
  },
  {
    "id": "scss",
    "name": "Senior Citizen Savings Scheme (SCSS)",
    "description": "A government-backed savings scheme for senior citizens offering high-interest rates and regular income through quarterly payouts.",
    "icon": "👴",
    "riskLevel": "Low",
    "minInvestment": 1000,
    "expectedReturns": "7-8% p.a.",
    "suitabilityScore": 0,
    "recommendedFor": [
      "Retired Individuals: To ensure a steady and secure post-retirement income.",
      "Risk-Averse Investors: To benefit from a government-backed, safe investment option.",
      "Pensioners: To supplement their pension with guaranteed interest payouts."
    ],
    category: " ",
    term: ""
  }
];