import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import './Quiz.css';

const questions = [
  {
    id: 1,
    question: 'What is the minimum voting age in the US?',
    options: ['16', '18', '21', '25'],
    answer: '18'
  },
  {
    id: 2,
    question: 'Which of these is a valid form of voter ID in most states?',
    options: ['Library Card', 'Driver\'s License', 'Gym Membership', 'Credit Card'],
    answer: 'Driver\'s License'
  },
  {
    id: 3,
    question: 'When is Election Day typically held?',
    options: ['First Monday in November', 'Tuesday following the first Monday in November', 'Last Friday in October', 'First day of Spring'],
    answer: 'Tuesday following the first Monday in November'
  },
  {
    id: 4,
    question: 'What is a mail-in ballot?',
    options: ['A ballot sent via email', 'A paper ballot you receive and return by mail', 'A ballot you drop off at a post office', 'A voting machine feature'],
    answer: 'A paper ballot you receive and return by mail'
  },
  {
    id: 5,
    question: 'What does "early voting" mean?',
    options: ['Voting before you turn 18', 'Voting in the morning on Election Day', 'Voting at designated locations before Election Day', 'Voting as soon as candidates are announced'],
    answer: 'Voting at designated locations before Election Day'
  },
  {
    id: 6,
    question: 'If you are in line when the polls close, can you still vote?',
    options: ['No, you must leave', 'Yes, stay in line', 'Only if you have an ID', 'Only in certain states'],
    answer: 'Yes, stay in line'
  }
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAnswerOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  return (
    <div className="quiz-container">
      <h1 className="text-center mb-8">Election Knowledge Quiz</h1>
      
      <Card className="quiz-card">
        {showScore ? (
          <div className="score-section text-center">
            <h2>You scored {score} out of {questions.length}</h2>
            <p className="mt-4 mb-4">
              {score === questions.length ? 'Perfect! You are well prepared.' : 'Good effort! Review the glossary to learn more.'}
            </p>
            <Button onClick={restartQuiz}>Restart Quiz</Button>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">{questions[currentQuestion].question}</div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  className={`quiz-option ${selectedOption === option ? 'selected' : ''}`}
                  onClick={() => handleAnswerOptionClick(option)}
                  aria-pressed={selectedOption === option}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="quiz-footer mt-4">
              <Button 
                onClick={handleNext} 
                disabled={!selectedOption}
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Quiz;
