import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Quiz = ({ quizData, onComplete }) => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizData.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // If no quiz data is provided, use a sample quiz
  const questions = quizData || [
    {
      question: t('learning.quiz.sample.q1.question'),
      options: [
        t('learning.quiz.sample.q1.options.a'),
        t('learning.quiz.sample.q1.options.b'),
        t('learning.quiz.sample.q1.options.c'),
        t('learning.quiz.sample.q1.options.d')
      ],
      correctAnswer: 2
    },
    {
      question: t('learning.quiz.sample.q2.question'),
      options: [
        t('learning.quiz.sample.q2.options.a'),
        t('learning.quiz.sample.q2.options.b'),
        t('learning.quiz.sample.q2.options.c'),
        t('learning.quiz.sample.q2.options.d')
      ],
      correctAnswer: 0
    },
    {
      question: t('learning.quiz.sample.q3.question'),
      options: [
        t('learning.quiz.sample.q3.options.a'),
        t('learning.quiz.sample.q3.options.b'),
        t('learning.quiz.sample.q3.options.c'),
        t('learning.quiz.sample.q3.options.d')
      ],
      correctAnswer: 1
    }
  ];

  const handleSelectAnswer = (answerIndex) => {
    if (isSubmitted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] === questions[i].correctAnswer) {
        newScore++;
      }
    }
    
    setScore(newScore);
    setIsSubmitted(true);
    
    if (onComplete) {
      onComplete({
        score: newScore,
        totalQuestions: questions.length,
        percentage: Math.round((newScore / questions.length) * 100)
      });
    }
  };

  const isQuizComplete = selectedAnswers.every(answer => answer !== null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!isSubmitted ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {t('learning.quiz.question')} {currentQuestion + 1} / {questions.length}
            </h3>
            <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {selectedAnswers.filter(a => a !== null).length} / {questions.length} {t('learning.quiz.answered')}
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              {questions[currentQuestion].question}
            </h4>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full text-left p-3 rounded-md border ${
                    selectedAnswers[currentQuestion] === index
                      ? 'bg-green-50 border-leaf-green'
                      : 'border-gray-300 hover:border-leaf-green'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'bg-leaf-green text-white'
                        : 'bg-gray-100'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`py-2 px-4 rounded-md ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('learning.quiz.previous')}
            </button>
            
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="py-2 px-4 bg-leaf-green text-white rounded-md hover:bg-green-700"
              >
                {t('learning.quiz.next')}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isQuizComplete}
                className={`py-2 px-4 rounded-md ${
                  !isQuizComplete
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-leaf-green text-white hover:bg-green-700'
                }`}
              >
                {t('learning.quiz.submit')}
              </button>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      index === currentQuestion
                        ? 'bg-leaf-green text-white'
                        : selectedAnswers[index] !== null
                        ? 'bg-green-100 text-leaf-green'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              {!isQuizComplete && (
                <span className="text-sm text-gray-500">
                  {t('learning.quiz.answerAllPrompt')}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-4">
              <span className="text-3xl font-bold text-leaf-green">{score}/{questions.length}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {score === questions.length
                ? t('learning.quiz.results.perfect')
                : score >= questions.length / 2
                ? t('learning.quiz.results.good')
                : t('learning.quiz.results.needsPractice')}
            </h3>
            <p className="text-gray-600">
              {t('learning.quiz.results.scoreMessage', { score, total: questions.length, percentage: Math.round((score / questions.length) * 100) })}
            </p>
          </div>
          
          <div className="space-y-6">
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="bg-gray-50 p-4 rounded-lg text-left">
                <h4 className="font-medium text-gray-800 mb-2">{question.question}</h4>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div
                      key={oIndex}
                      className={`p-2 rounded-md ${
                        question.correctAnswer === oIndex
                          ? 'bg-green-100 border border-green-300'
                          : selectedAnswers[qIndex] === oIndex && selectedAnswers[qIndex] !== question.correctAnswer
                          ? 'bg-red-100 border border-red-300'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${
                          question.correctAnswer === oIndex
                            ? 'bg-green-500 text-white'
                            : selectedAnswers[qIndex] === oIndex
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200'
                        }`}>
                          {String.fromCharCode(65 + oIndex)}
                        </div>
                        <span>{option}</span>
                        {question.correctAnswer === oIndex && (
                          <svg className="ml-auto h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedAnswers(Array(questions.length).fill(null));
                setCurrentQuestion(0);
                setScore(0);
              }}
              className="py-2 px-6 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-4"
            >
              {t('learning.quiz.retake')}
            </button>
            
            <Link
              to='/learning'
              className="py-2 px-6 bg-leaf-green text-white rounded-md hover:bg-green-700"
            >
              {t('learning.quiz.continueLearning')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
