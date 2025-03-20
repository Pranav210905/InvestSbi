export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  investorType: 'beginner' | 'intermediate' | 'expert' | 'verified';
  followers: number;
  following: number;
  joined: string;
  reputation: number;
  bio: string;
}

export interface Post {
  id: string;
  content: string;
  user: User;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  isLiked: boolean;
  isReposted: boolean;
  sentiment?: 'bullish' | 'bearish' | 'neutral';
  tickers?: string[];
  image?: string;
  poll?: {
    options: { text: string; votes: number }[];
    totalVotes: number;
    endsAt: string;
  };
}

export interface TrendingTopic {
  id: string;
  name: string;
  posts: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  change?: number;
}

export interface MarketData {
  index: string;
  price: number;
  change: number;
  changePercent: number;
}

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    username: 'alexm_investor',
    avatar: 'https://i.pravatar.cc/150?img=1',
    verified: true,
    investorType: 'expert',
    followers: 24800,
    following: 342,
    joined: 'January 2021',
    reputation: 98,
    bio: 'Investment analyst | Fintech enthusiast | 10+ years in market | Sharing insights on stocks, crypto, and economic trends.'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    username: 'sarahc_fintech',
    avatar: 'https://i.pravatar.cc/150?img=5',
    verified: true,
    investorType: 'verified',
    followers: 15700,
    following: 189,
    joined: 'March 2022',
    reputation: 94,
    bio: 'VC Partner | Finance PhD | Investing in fintech innovation | Speaker & Author on market trends'
  },
  {
    id: '3',
    name: 'Michael Kumar',
    username: 'mikekumar',
    avatar: 'https://i.pravatar.cc/150?img=8',
    verified: false,
    investorType: 'intermediate',
    followers: 3250,
    following: 512,
    joined: 'October 2022',
    reputation: 76,
    bio: 'Software engineer by day, investor by night. Sharing my journey in tech stocks and cryptocurrency.'
  },
  {
    id: '4',
    name: 'Priya Patel',
    username: 'priya_invests',
    avatar: 'https://i.pravatar.cc/150?img=9',
    verified: false,
    investorType: 'beginner',
    followers: 890,
    following: 320,
    joined: 'May 2023',
    reputation: 62,
    bio: 'Beginner investor learning the ropes. Documenting my journey from savings to investments.'
  },
  {
    id: '5',
    name: 'Thomas Wilson',
    username: 'tom_capital',
    avatar: 'https://i.pravatar.cc/150?img=11',
    verified: true,
    investorType: 'expert',
    followers: 32600,
    following: 145,
    joined: 'April 2020',
    reputation: 97,
    bio: 'Hedge fund manager | Harvard MBA | Sharing insights on value investing and portfolio management'
  },
  {
    id: '6',
    name: 'Emma Rodriguez',
    username: 'emma_trades',
    avatar: 'https://i.pravatar.cc/150?img=16',
    verified: false,
    investorType: 'intermediate',
    followers: 5340,
    following: 231,
    joined: 'August 2022',
    reputation: 84,
    bio: 'Day trader turned swing investor. Focusing on renewable energy and EV sectors. Charts & technical analysis enthusiast.'
  },
  {
    id: '7',
    name: 'Jason Park',
    username: 'jpark_investor',
    avatar: 'https://i.pravatar.cc/150?img=12',
    verified: true,
    investorType: 'expert',
    followers: 18900,
    following: 105,
    joined: 'February 2021',
    reputation: 92,
    bio: 'Former Wall Street analyst | MBA from Wharton | Specializing in growth stocks and emerging markets'
  },
  {
    id: '8',
    name: 'Olivia Bennett',
    username: 'olivia_wealth',
    avatar: 'https://i.pravatar.cc/150?img=27',
    verified: true,
    investorType: 'verified',
    followers: 28700,
    following: 175,
    joined: 'December 2020',
    reputation: 95,
    bio: 'Certified Financial Planner | Wealth management expert | Helping people achieve financial freedom through smart investments'
  },
  {
    id: '9',
    name: 'David Kim',
    username: 'dkim_crypto',
    avatar: 'https://i.pravatar.cc/150?img=15',
    verified: false,
    investorType: 'intermediate',
    followers: 7680,
    following: 420,
    joined: 'June 2021',
    reputation: 81,
    bio: 'Blockchain developer and cryptocurrency investor. Exploring DeFi opportunities and NFT markets.'
  },
  {
    id: '10',
    name: 'Rachel Nguyen',
    username: 'rachel_reits',
    avatar: 'https://i.pravatar.cc/150?img=29',
    verified: false,
    investorType: 'expert',
    followers: 11200,
    following: 253,
    joined: 'September 2021',
    reputation: 89,
    bio: 'Real estate investment specialist | REIT analyst | Commercial property developer | Sharing market insights and dividend strategies'
  }
];

// Mock Posts
export const posts: Post[] = [
  {
    id: '1',
    content: 'Just analyzed the latest $TSLA earnings report. Impressive growth in the energy storage segment - could be a bigger revenue driver than cars in 5 years. What are your thoughts? #StockMarket #Tesla',
    user: users[0],
    timestamp: '2 hours ago',
    likes: 342,
    comments: 64,
    reposts: 89,
    isLiked: false,
    isReposted: false,
    sentiment: 'bullish',
    tickers: ['TSLA']
  },
  {
    id: '2',
    content: 'Market sentiment turning bearish on tech stocks. My analysis suggests this is a temporary correction rather than the beginning of a prolonged downturn. Adding to positions in $NVDA and $AMD. #TechStocks #Investment',
    user: users[1],
    timestamp: '5 hours ago',
    likes: 215,
    comments: 42,
    reposts: 31,
    isLiked: true,
    isReposted: false,
    sentiment: 'bullish',
    tickers: ['NVDA', 'AMD'],
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    content: 'Started my real estate investment journey today! Invested in my first REIT $VNQ. Low barrier to entry compared to direct property ownership, plus diversification benefits. #RealEstateInvesting #REIT',
    user: users[3],
    timestamp: '8 hours ago',
    likes: 89,
    comments: 25,
    reposts: 5,
    isLiked: false,
    isReposted: false,
    sentiment: 'neutral',
    tickers: ['VNQ']
  },
  {
    id: '4',
    content: 'Which sector do you think will outperform in the next 12 months?',
    user: users[4],
    timestamp: '1 day ago',
    likes: 176,
    comments: 38,
    reposts: 14,
    isLiked: false,
    isReposted: false,
    sentiment: 'neutral',
    poll: {
      options: [
        { text: 'Technology', votes: 432 },
        { text: 'Healthcare', votes: 287 },
        { text: 'Energy', votes: 145 },
        { text: 'Financials', votes: 198 }
      ],
      totalVotes: 1062,
      endsAt: 'in 2 days'
    }
  },
  {
    id: '5',
    content: 'Warning: Seeing major selling pressure on $JPM and other banking stocks. Q2 earnings miss and increased loan loss provisions signal potential trouble ahead. #Banking #StockMarket',
    user: users[2],
    timestamp: '1 day ago',
    likes: 112,
    comments: 45,
    reposts: 28,
    isLiked: false,
    isReposted: true,
    sentiment: 'bearish',
    tickers: ['JPM']
  },
  {
    id: '6',
    content: 'Gold continuing its upward trend as a safe haven amid market volatility. My position in $GLD up 8% this month alone. Consider allocating 5-10% of your portfolio to precious metals as a hedge. #GoldInvesting #PortfolioDiversification',
    user: users[0],
    timestamp: '2 days ago',
    likes: 267,
    comments: 42,
    reposts: 76,
    isLiked: true,
    isReposted: false,
    sentiment: 'bullish',
    tickers: ['GLD'],
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '7',
    content: 'Just completed my quarterly portfolio rebalancing. Increased allocation to $GOOG and $MSFT while trimming some $AMZN after the recent run-up. Keeping cash reserves for potential market dips. #PortfolioManagement #StockPicks',
    user: users[6],
    timestamp: '3 hours ago',
    likes: 187,
    comments: 42,
    reposts: 23,
    isLiked: false,
    isReposted: false,
    sentiment: 'neutral',
    tickers: ['GOOG', 'MSFT', 'AMZN']
  },
  {
    id: '8',
    content: 'The yield curve is signaling potential economic slowdown. Looking at defensive sectors like utilities and consumer staples for the next quarter. What are your safe-haven picks? $XLU $XLP #BondMarket #RiskManagement',
    user: users[7],
    timestamp: '6 hours ago',
    likes: 204,
    comments: 58,
    reposts: 41,
    isLiked: false,
    isReposted: false,
    sentiment: 'bearish',
    tickers: ['XLU', 'XLP']
  },
  {
    id: '9',
    content: 'Ethereum merge is around the corner! This shift to proof-of-stake will reduce energy consumption by ~99.95%. Extremely bullish on $ETH long-term prospects. #Crypto #Ethereum #ESGInvesting',
    user: users[8],
    timestamp: '1 day ago',
    likes: 312,
    comments: 76,
    reposts: 94,
    isLiked: true,
    isReposted: false,
    sentiment: 'bullish',
    tickers: ['ETH'],
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '10',
    content: 'Planning to diversify my portfolio with more alternative investments. Considering allocating 5% to commodities and 5% to REITs. What are your favorite tickers in these sectors? #Diversification #InvestmentStrategy',
    user: users[5],
    timestamp: '7 hours ago',
    likes: 156,
    comments: 87,
    reposts: 19,
    isLiked: false,
    isReposted: false,
    sentiment: 'neutral',
    tickers: []
  },
  {
    id: '11',
    content: 'Fed minutes release tomorrow could signal a more hawkish stance. Market is pricing in another 75 bps hike. Be cautious with high-growth stocks in the near term. $SPY $QQQ #FederalReserve #InterestRates',
    user: users[1],
    timestamp: '5 hours ago',
    likes: 243,
    comments: 56,
    reposts: 38,
    isLiked: false,
    isReposted: false,
    sentiment: 'bearish',
    tickers: ['SPY', 'QQQ']
  },
  {
    id: '12',
    content: 'My top 3 dividend aristocrats for consistent income: $JNJ, $PG, and $KO. All have increased dividends for 50+ consecutive years. Perfect for retirement portfolios. What are your favorite dividend stocks? #DividendInvesting #PassiveIncome',
    user: users[4],
    timestamp: '1 day ago',
    likes: 276,
    comments: 62,
    reposts: 47,
    isLiked: false,
    isReposted: false,
    sentiment: 'bullish',
    tickers: ['JNJ', 'PG', 'KO']
  },
  {
    id: '13',
    content: 'Considering investing in data center REITs like $EQIX and $DLR. The growth of cloud computing and AI should drive demand for years to come. Any opinions? #REITs #TechInvesting',
    user: users[9],
    timestamp: '9 hours ago',
    likes: 152,
    comments: 34,
    reposts: 12,
    isLiked: false,
    isReposted: false,
    sentiment: 'bullish',
    tickers: ['EQIX', 'DLR']
  },
  {
    id: '14',
    content: 'Dollar cost averaging into $BTC and $ETH has been my strategy for the past 2 years. Despite volatility, I\'m up 78% overall. Patience is key in crypto investing. #Cryptocurrency #DollarCostAveraging',
    user: users[8],
    timestamp: '3 days ago',
    likes: 345,
    comments: 87,
    reposts: 65,
    isLiked: true,
    isReposted: true,
    sentiment: 'bullish',
    tickers: ['BTC', 'ETH']
  },
  {
    id: '15',
    content: 'China\'s latest policy shifts could present buying opportunities in their tech sector. Looking at $BABA and $JD after the recent sell-off. High risk, but potential high reward play. #EmergingMarkets #ChineseStocks',
    user: users[6],
    timestamp: '2 days ago',
    likes: 198,
    comments: 76,
    reposts: 23,
    isLiked: false,
    isReposted: false,
    sentiment: 'neutral',
    tickers: ['BABA', 'JD'],
    image: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '16',
    content: 'What\'s your investment time horizon?',
    user: users[7],
    timestamp: '4 days ago',
    likes: 287,
    comments: 134,
    reposts: 42,
    isLiked: false,
    isReposted: false,
    sentiment: 'neutral',
    poll: {
      options: [
        { text: 'Short-term (< 1 year)', votes: 243 },
        { text: 'Medium-term (1-5 years)', votes: 567 },
        { text: 'Long-term (5-10 years)', votes: 789 },
        { text: 'Very long-term (10+ years)', votes: 432 }
      ],
      totalVotes: 2031,
      endsAt: 'ended'
    }
  }
];

// Categories for personalized feed
export const investmentCategories = [
  'Stocks',
  'Crypto',
  'Real Estate',
  'ETFs',
  'Commodities',
  'Forex',
  'Startups',
  'Bonds',
  'Options',
  'Retirement'
];

// Trending Topics
export const trendingTopics: TrendingTopic[] = [
  {
    id: '1',
    name: 'AI Stocks',
    posts: 24800,
    sentiment: 'bullish',
    change: 12.4
  },
  {
    id: '2',
    name: 'Federal Reserve',
    posts: 18600,
    sentiment: 'neutral'
  },
  {
    id: '3',
    name: 'Semiconductor Shortage',
    posts: 12400,
    sentiment: 'bearish',
    change: -3.8
  },
  {
    id: '4',
    name: 'ESG Investing',
    posts: 9800,
    sentiment: 'bullish',
    change: 5.2
  },
  {
    id: '5',
    name: 'Digital Banking',
    posts: 7400,
    sentiment: 'bullish',
    change: 2.3
  }
];

// Market Data
export const marketData: MarketData[] = [
  {
    index: 'S&P 500',
    price: 4892.75,
    change: 45.23,
    changePercent: 0.93
  },
  {
    index: 'NASDAQ',
    price: 17468.30,
    change: 284.11,
    changePercent: 1.65
  },
  {
    index: 'DOW JONES',
    price: 38996.40,
    change: -34.82,
    changePercent: -0.09
  },
  {
    index: 'RUSSELL 2000',
    price: 2065.59,
    change: 8.42,
    changePercent: 0.41
  }
];
