import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RefreshCcw } from 'lucide-react';
import { questions } from '../types/questions';
import { Question, Answer } from '../types/advisor';

interface QuestionnaireProps {
  onComplete: (answers: Answer[]) => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [direction, setDirection] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: currentQuestion.id,
      answer
    };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const restart = () => {
    setAnswers([]);
    setDirection(-1);
    setCurrentQuestionIndex(0);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="relative h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestionIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-medium text-gray-500">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <button
                    onClick={restart}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <RefreshCcw size={20} />
                  </button>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentQuestion.text}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 text-left rounded-lg transition-all ${
                      answers[currentQuestionIndex]?.answer === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={goToPrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center ${
                    currentQuestionIndex === 0
                      ? 'text-gray-300'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>
                <div className="flex space-x-2">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentQuestionIndex
                          ? 'bg-blue-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                {currentQuestionIndex < questions.length - 1 && (
                  <button
                    onClick={() => handleAnswer(answers[currentQuestionIndex]?.answer || '')}
                    disabled={!answers[currentQuestionIndex]}
                    className={`flex items-center ${
                      !answers[currentQuestionIndex]
                        ? 'text-gray-300'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};