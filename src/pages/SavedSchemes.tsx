import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useSavedSchemes } from '../contexts/SavedSchemesContext';

export const SavedSchemes = () => {
  const { savedSchemes, toggleSaveScheme } = useSavedSchemes();
  const navigate = useNavigate();

  if (savedSchemes.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Saved Schemes</h2>
        <p className="text-gray-600 dark:text-gray-400">
          You haven't saved any investment schemes yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Schemes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{scheme.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaveScheme(scheme);
                }}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                <Heart className="h-6 w-6 fill-current" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{scheme.description}</p>
            <button
              onClick={() => navigate(scheme.path)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};