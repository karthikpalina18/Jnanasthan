import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const QuizResult = () => {
  const { attemptId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/attempt/${attemptId}`, {
          headers: {
            'x-auth-token': token
          }
        });
        setResult(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('Failed to fetch result. Please try again.');
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl text-gray-600">Loading result...</div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto max-w-2xl mt-8">
      {error}
    </div>
  );
  
  if (!result) return (
    <div className="text-center p-8">Result not found</div>
  );

  // Calculate score percentage
  const scorePercentage = (result.score / result.maxPossibleScore) * 100;
  
  // Determine color based on score
  const getScoreClass = () => {
    if (scorePercentage >= 80) return 'text-green-600';
    if (scorePercentage >= 60) return 'text-blue-600';
    if (scorePercentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Calculate time taken in minutes:seconds format
  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Quiz Result</h1>
        
        <div className="text-center mb-8">
          <h2 className="text-xl mb-2">{result.quiz?.title || 'Quiz'}</h2>
          <div className={`text-5xl font-bold ${getScoreClass()}`}>
            {scorePercentage.toFixed(1)}%
          </div>
          <div className="text-xl mt-2">
            Your score: {result.score} / {result.maxPossibleScore}
          </div>
          <p className="text-gray-600 mt-4">
            Time taken: {formatTime(result.timeSpent)}
          </p>
          <p className="text-gray-600 text-sm">
            Completed on: {new Date(result.completedAt).toLocaleString()}
          </p>
        </div>
        
        {/* Question Review Section */}
        {result.answers && result.answers.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Question Review</h2>
            
            {result.answers.map((answer, index) => {
              // Find the associated question from the populated quiz data
              const question = result.quiz?.questions?.find(q => 
                q._id.toString() === answer.question.toString());
                
              if (!question) return null;
              
              return (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <div className="flex items-start mb-2">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      answer.isCorrect 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {answer.isCorrect ? '✓' : '✗'}
                    </div>
                    <h3 className="font-medium">{question.questionText}</h3>
                  </div>
                  
                  <div className="ml-8 mb-2">
                    <p className="text-sm text-gray-600">
                      Points: {answer.pointsEarned} / {question.points || 1}
                    </p>
                  </div>
                  
                  <div className="ml-8 space-y-2">
                    {question.options.map((option, optIdx) => {
                      const isSelected = answer.selectedOptions.includes(option._id.toString());
                      const isCorrect = option.isCorrect;
                      
                      let optionClass = 'bg-gray-50 border border-gray-200';
                      if (isSelected && isCorrect) {
                        optionClass = 'bg-green-100 border border-green-300';
                      } else if (isSelected) {
                        optionClass = 'bg-red-100 border border-red-300';
                      } else if (isCorrect) {
                        optionClass = 'bg-green-50 border border-green-200';
                      }
                      
                      return (
                        <div 
                          key={optIdx} 
                          className={`p-3 rounded ${optionClass}`}
                        >
                          <div className="flex items-center">
                            {isSelected && (
                              <span className="mr-2 text-sm font-medium">Your answer</span>
                            )}
                            {isCorrect && !isSelected && (
                              <span className="mr-2 text-sm font-medium text-green-700">
                                Correct answer
                              </span>
                            )}
                            <span>{option.text}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link 
            to="/quizzes" 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;