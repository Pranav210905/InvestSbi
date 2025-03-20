export interface InvestmentScheme {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  category: 'fixed' | 'recurring';
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  calculate: (params: any) => number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  registrationUrl: string;
}

export interface CalculatorInputs {
  amount: number;
  duration: number;
  rate: number;
  frequency?: 'monthly' | 'quarterly' | 'yearly';
}