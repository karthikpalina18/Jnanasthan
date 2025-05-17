import React from 'react';
import { Link } from 'react-router-dom';

const QuizCard = ({ quiz }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
      <p className="text-gray-600 mb-4">{quiz.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>{quiz.questions.length} questions</span>
        <span>{quiz.timeLimit} minutes</span>
      </div>
      <Link 
        to={`/quiz/${quiz._id}`} 
        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizCard;