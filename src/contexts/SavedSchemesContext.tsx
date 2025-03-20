import React, { createContext, useContext, useState, useEffect } from 'react';
import type { InvestmentScheme } from '../types';

interface SavedSchemesContextType {
  savedSchemes: InvestmentScheme[];
  toggleSaveScheme: (scheme: InvestmentScheme) => void;
  isSchemesSaved: (schemeId: string) => boolean;
}

const SavedSchemesContext = createContext<SavedSchemesContextType>({
  savedSchemes: [],
  toggleSaveScheme: () => {},
  isSchemesSaved: () => false,
});

export const SavedSchemesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedSchemes, setSavedSchemes] = useState<InvestmentScheme[]>(() => {
    const saved = localStorage.getItem('savedSchemes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedSchemes', JSON.stringify(savedSchemes));
  }, [savedSchemes]);

  const toggleSaveScheme = (scheme: InvestmentScheme) => {
    setSavedSchemes(prev => {
      const isAlreadySaved = prev.some(s => s.id === scheme.id);
      if (isAlreadySaved) {
        return prev.filter(s => s.id !== scheme.id);
      }
      return [...prev, scheme];
    });
  };

  const isSchemesSaved = (schemeId: string) => {
    return savedSchemes.some(scheme => scheme.id === schemeId);
  };

  return (
    <SavedSchemesContext.Provider value={{ savedSchemes, toggleSaveScheme, isSchemesSaved }}>
      {children}
    </SavedSchemesContext.Provider>
  );
};

export const useSavedSchemes = () => useContext(SavedSchemesContext);