// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// const QuizResult = () => {
//   const { attemptId } = useParams();
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     const fetchResult = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`/api/quiz-attempts/${attemptId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setResult(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch quiz result');
//         setLoading(false);
//         console.error('Error fetching quiz result:', err);
//       }
//     };

//     fetchResult();
//   }, [attemptId]);
  
//   if (loading) {
//     return <div className="flex justify-center p-8"><div className="loader"></div></div>;
//   }
  
//   if (error) {
//     return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>;
//   }
  
//   if (!result) {
//     return <div className="text-center p-8">Result not found</div>;
//   }
  
//   const score = Math.round((result.score / result.totalPoints) * 100);
//   const passThreshold = 70; // Example threshold
//   const passed = score >= passThreshold;
  
//   return (
//     <div className="container mx-auto p-4 max-w-3xl">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>
        
//         <div className={`p-6 mb-6 rounded-lg ${
//           passed ? 'bg-green-100' : 'bg-red-100'
//         }`}>
//           <div className="text-center">
//             <h3 className="text-3xl font-bold mb-2">
//               {score}%
//             </h3>
//             <p className={`text-lg font-medium ${
//               passed ? 'text-green-800' : 'text-red-800'
//             }`}>
//               {passed ? 'Congratulations! You passed!' : 'You did not pass this time.'}
//             </p>
//             <p className="mt-2">
//               Score: {result.score} out of {result.totalPoints} points
//             </p>
//           </div>
//         </div>
        
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-4">Question Summary</h3>
          
//           {result.answers.map((answer, index) => (
//             <div key={index} className="border-b pb-4 mb-4">
//               <div className="flex items-center mb-2">
//                 <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${
//                   answer.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                 }`}>
//                   {answer.isCorrect ? '✓' : '✗'}
//                 </div>
//                 <h4 className="font-medium">Question {index + 1}</h4>
//               </div>
//               <p className="ml-8 mb-2">{answer.questionText}</p>
              
//               {answer.selectedOptions.length > 0 ? (
//                 <div className="ml-8">
//                   <p className="text-sm text-gray-600">Your answer:</p>
//                   <ul className="list-disc ml-5">
//                     {answer.selectedOptions.map((option, optIndex) => (
//                       <li key={optIndex} className={`
//                         ${option.isCorrect ? 'text-green-600' : 'text-red-600'}
//                       `}>
//                         {option.text}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <p className="ml-8 text-gray-500 italic">No answer provided</p>
//               )}
              
//               {!answer.isCorrect && (
//                 <div className="ml-8 mt-2">
//                   <p className="text-sm text-gray-600">Correct answer:</p>
//                   <ul className="list-disc ml-5 text-green-600">
//                     {answer.correctOptions.map((option, optIndex) => (
//                       <li key={optIndex}>{option.text}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
        
//         <div className="flex justify-between">
//           <Link 
//             to="/quizzes" 
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//           >
//             Back to Quizzes
//           </Link>
          
//           <Link 
//             to={`/quiz/${result.quizId}`} 
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Try Again
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizResult;

// components/Quiz/QuizResult.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizResult = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

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
        setError('Failed to load quiz results. The attempt may not exist or you may not have permission to view it.');
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  const formatTimeSpent = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const calculatePercentage = () => {
    if (!result) return 0;
    const { score, totalPoints } = result;
    return Math.round((score / totalPoints) * 100);
  };

  const getResultMessage = () => {
    const percentage = calculatePercentage();
    
    if (percentage >= 90) return "Excellent! You've mastered this material.";
    if (percentage >= 80) return "Great job! You have a strong understanding.";
    if (percentage >= 70) return "Good work! You understand most of the material.";
    if (percentage >= 60) return "You passed! Keep studying to improve your score.";
    return "Keep practicing. You'll do better next time!";
  };

  const getColorClass = () => {
    const percentage = calculatePercentage();
    
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 70) return "text-yellow-500";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error || 'Result not found'}</p>
          <button 
            onClick={() => navigate('/quizzes')}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const percentage = calculatePercentage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Result header */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold mb-2">{result.quiz.title} - Results</h1>
            <p className="text-gray-600">{result.quiz.description}</p>
          </div>
          
          {/* Score summary */}
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-600 mb-1">Your Score</p>
                <p className="text-3xl font-bold">
                  <span className={getColorClass()}>
                    {result.score} / {result.totalPoints}
                  </span>
                  <span className="text-gray-500 text-xl"> ({percentage}%)</span>
                </p>
                <p className={`mt-2 font-medium ${getColorClass()}`}>{getResultMessage()}</p>
              </div>
              
              <div className="text-center">
                <div className="relative inline-block w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    {/* Foreground circle */}
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={percentage >= 70 ? "#10b981" : percentage >= 60 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="3"
                      strokeDasharray={`${percentage}, 100`}
                    />
                    <text x="18" y="20.5" className="text-5xl font-bold" textAnchor="middle" fill="currentColor">
                      {percentage}%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-gray-500 text-sm">Time Spent</p>
                <p className="font-medium">{formatTimeSpent(result.timeSpent)}</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-gray-500 text-sm">Correct Answers</p>
                <p className="font-medium">{result.correctAnswers} / {result.quiz.questions.length}</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-gray-500 text-sm">Completed On</p>
                <p className="font-medium">{new Date(result.submittedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          {/* View answers toggle */}
          <div className="p-6">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition-colors"
            >
              {showAnswers ? 'Hide Answers' : 'View Detailed Results'}
            </button>
          </div>
          
          {/* Detailed answers */}
          {showAnswers && (
            <div className="p-6 border-t">
              <h2 className="text-xl font-semibold mb-4">Question Review</h2>
              
              {result.answers.map((answer, index) => {
                const question = result.quiz.questions.find(q => q._id === answer.questionId);
                if (!question) return null;
                
                const isCorrect = answer.isCorrect;
                const selectedOption = question.options.find(opt => opt._id === answer.selectedOptionId);
                const correctOption = question.options.find(opt => opt.isCorrect);
                
                return (
                  <div key={index} className="mb-6 p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-medium mb-2">Question {index + 1}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    
                    <p className="mb-4">{question.questionText}</p>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div 
                          key={optIndex}
                          className={`p-3 border rounded-lg ${
                            option._id === answer.selectedOptionId && isCorrect
                              ? 'bg-green-50 border-green-300'
                              : option._id === answer.selectedOptionId
                              ? 'bg-red-50 border-red-300'
                              : option.isCorrect
                              ? 'bg-green-50 border-green-300'
                              : ''
                          }`}
                        >
                          <div className="flex items-center">
                            {option._id === answer.selectedOptionId ? (
                              <span className={`w-5 h-5 mr-2 flex items-center justify-center rounded-full ${
                                isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                              }`}>
                                {isCorrect ? '✓' : '✗'}
                              </span>
                            ) : option.isCorrect ? (
                              <span className="w-5 h-5 mr-2 flex items-center justify-center rounded-full bg-green-500 text-white">
                                ✓
                              </span>
                            ) : (
                              <span className="w-5 h-5 mr-2"></span>
                            )}
                            <span>{option.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {!isCorrect && (
                      <div className="mt-4 text-sm">
                        <p className="font-medium text-gray-700">Correct Answer:</p>
                        <p>{correctOption?.text}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Action buttons */}
          <div className="p-6 bg-gray-50 border-t flex justify-between">
            <Link
              to="/quizzes"
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Back to Quizzes
            </Link>
            
            <Link
              to={`/quiz/${result.quiz._id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Retry Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;