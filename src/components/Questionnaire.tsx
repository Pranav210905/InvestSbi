import { useState } from 'react';

interface QuestionnaireProps {
  onComplete: (answers: Answer[]) => Promise<void>;
}

interface Answer {
  question: string;
  answer: string;
}

export const Questionnaire = ({ onComplete }: QuestionnaireProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const questions = [
    {
      question: "What's your age?",
      type: 'number',
      placeholder: 'Enter your age',
    },
    {
      question: "What's your investment horizon?",
      type: 'choice',
      options: ['Short-term (1-3 years)', 'Long-term (5+ years)'],
    },
    {
      question: "For how many years do you want to invest?",
      type: 'number',
      placeholder: 'Enter number of years',
    },
    {
      question: "How would you like to invest?",
      type: 'choice',
      options: ['Recurring', 'Lumpsum'],
    },
    {
      question: "What's your investment amount?",
      type: 'number',
      placeholder: 'Enter amount in ₹',
    },
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = { question: questions[step].question, answer };
    setAnswers(updatedAnswers);
  };

  const currentQuestion = questions[step];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center mb-8">
        {currentQuestion.question}
      </h2>

      <div className="w-full max-w-md mx-auto">
        {currentQuestion.type === 'number' ? (
          <input
            type="number"
            value={answers[step]?.answer || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
            placeholder={currentQuestion.placeholder}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`p-4 rounded-lg transition-all ${
                  answers[step]?.answer === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleNext}
          disabled={!answers[step]?.answer}
          className={`px-8 py-3 rounded-lg text-lg font-semibold transition-all ${
            answers[step]?.answer
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {step < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};