import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';

interface AnalysisResponse {
  document_type: string;
  explanation: string;
  key_details: string[];
  calculations: string[];
  insights: string;
}

const InvestmentAnalysis: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload_file', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      
      if (data.error) {
        throw new Error(data.error);
      }

      try {
        const parsedAnalysis = typeof data.analysis === 'string' ? JSON.parse(data.analysis) : data.analysis;
        setAnalysis(parsedAnalysis);
      } catch (parseError) {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to connect to analysis server. Please ensure the server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type === 'application/pdf')) {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('Please upload only PDF or image files (PNG, JPG)');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Investment Document Analysis</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <div className="flex items-center justify-center w-full">
            <label
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50' 
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className={`w-10 h-10 mb-3 ${loading ? 'animate-bounce' : ''}`} />
                <p className="mb-2 text-sm">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs">PDF or Image files (PNG, JPG)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                disabled={loading}
              />
            </label>
          </div>

          {file && (
            <div className="mt-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span className="truncate max-w-[200px]">{file.name}</span>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`ml-auto px-4 py-2 rounded-md flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800'
                    : 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300'
                } text-white transition-colors disabled:cursor-not-allowed`}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Analyzing...' : 'Analyze Document'}
              </button>
            </div>
          )}

          {error && (
            <div className={`mt-4 p-4 rounded-md flex items-center gap-2 ${
              theme === 'dark' 
                ? 'bg-red-900/50 text-red-200' 
                : 'bg-red-100 text-red-700'
            }`}>
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {analysis && (
          <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Document Type</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {analysis.document_type}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Explanation</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {analysis.explanation}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Key Details</h3>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.key_details.map((detail, index) => (
                    <li key={index} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {analysis.calculations.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Calculations</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.calculations.map((calc, index) => (
                      <li key={index} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {calc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold mb-2">Insights</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {analysis.insights}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentAnalysis;