export interface Question {
    id: number;
    text: string;
    options: string[];
  }
  
  export interface Answer {
    questionId: number;
    answer: string;
  }
  
  export interface InvestmentPlan {
    name: string;
    expectedReturns: string;
    minimumInvestment: string;
    recommendedFor: string;
  }