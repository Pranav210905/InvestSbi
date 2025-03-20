import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Webinar } from '../types';

const webinars: Webinar[] = [
  {
    id: '1',
    title: 'Mastering Stock Market Basics',
    description: 'Learn the fundamentals of stock market investing from industry experts',
    date: '2025-04-15',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80',
    registrationUrl: '#'
  },
  {
    id: '2',
    title: 'Real Estate Investment Strategies',
    description: 'Discover proven strategies for successful real estate investments',
    date: '2025-04-20',
    imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80',
    registrationUrl: '#'
  },
  {
    id: '3',
    title: 'Mutual Funds Deep Dive',
    description: 'Understanding mutual fund categories and selection criteria',
    date: '2025-04-25',
    imageUrl: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80',
    registrationUrl: '#'
  },
  {
    id: '4',
    title: 'Tax-Efficient Investing',
    description: 'Learn how to optimize your investment returns through tax planning',
    date: '2025-05-01',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80',
    registrationUrl: '#'
  }
];

export const WebinarSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % webinars.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % webinars.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + webinars.length) % webinars.length);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="relative h-[300px] w-full">
        <img
          src={webinars[currentIndex].imageUrl}
          alt={webinars[currentIndex].title}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-600/50" />
        <div className="relative z-10 h-full flex flex-col justify-center p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">{webinars[currentIndex].title}</h2>
          <p className="text-lg mb-4">{webinars[currentIndex].description}</p>
          <div className="flex items-center space-x-4">
            <p className="text-sm bg-white/20 px-3 py-1 rounded-full">
              {new Date(webinars[currentIndex].date).toLocaleDateString()}
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
             
              Register Now

            </button>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {webinars.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};