// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import QuizTimer from '../../components/Quiz/QuizTimer;

// const TakeQuiz = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [quiz, setQuiz] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [timeUp, setTimeUp] = useState(false);
//   const [startTime] = useState(new Date());
  
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`/api/quizzes/${id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setQuiz(response.data);
        
//         // Initialize answers array
//         setAnswers(response.data.questions.map(q => ({
//           questionId: q._id,
//           selectedOptions: []
//         })));
        
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch quiz');
//         setLoading(false);
//         console.error('Error fetching quiz:', err);
//       }
//     };

//     fetchQuiz();
//   }, [id]);
  
//   useEffect(() => {
//     // Handle time up
//     if (timeUp) {
//       handleSubmit();
//     }
//   }, [timeUp]);
  
//   const handleOptionSelect = (optionId) => {
//     const question = quiz.questions[currentQuestion];
    
//     if (question.questionType === 'true-false') {
//       // For true-false, only allow one selection
//       setSelectedOptions([optionId]);
//     } else {
//       // For multiple choice, toggle selection
//       if (selectedOptions.includes(optionId)) {
//         setSelectedOptions(selectedOptions.filter(id => id !== optionId));
//       } else {
//         setSelectedOptions([...selectedOptions, optionId]);
//       }
//     }
//   };
  
//   const handleNext = () => {
//     // Save answer for current question
//     const updatedAnswers = [...answers];
//     updatedAnswers[currentQuestion] = {
//       ...updatedAnswers[currentQuestion],
//       selectedOptions: [...selectedOptions]
//     };
//     setAnswers(updatedAnswers);
    
//     // Move to next question
//     if (currentQuestion < quiz.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       // Reset selected options for next question
//       setSelectedOptions(answers[currentQuestion + 1]?.selectedOptions || []);
//     }
//   };
  
//   const handlePrevious = () => {
//     // Save answer for current question
//     const updatedAnswers = [...answers];
//     updatedAnswers[currentQuestion] = {
//       ...updatedAnswers[currentQuestion],
//       selectedOptions: [...selectedOptions]
//     };
//     setAnswers(updatedAnswers);
    
//     // Move to previous question
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//       // Load selected options for previous question
//       setSelectedOptions(answers[currentQuestion - 1]?.selectedOptions || []);
//     }
//   };
  
//   const handleSubmit = async () => {
//     // Save answer for current question
//     const updatedAnswers = [...answers];
//     updatedAnswers[currentQuestion] = {
//       ...updatedAnswers[currentQuestion],
//       selectedOptions: [...selectedOptions]
//     };
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('/api/quiz-attempts', {
//         quizId: quiz._id,
//         answers: updatedAnswers,
//         startedAt: startTime.toISOString()
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       navigate(`/quiz-result/${response.data.attemptId}`);
//     } catch (err) {
//       setError('Failed to submit quiz');
//       console.error('Error submitting quiz:', err);
//     }
//   };
  
//   if (loading) {
//     return <div className="flex justify-center p-8"><div className="loader"></div></div>;
//   }
  
//   if (error) {
//     return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>;
//   }
  
//   if (!quiz) {
//     return <div className="text-center p-8">Quiz not found</div>;
//   }
  
//   const question = quiz.questions[currentQuestion];
  
//   return (
//     <div className="container mx-auto p-4 max-w-3xl">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">{quiz.title}</h2>
//           <QuizTimer 
//             timeLimit={quiz.timeLimit} 
//             onTimeUp={() => setTimeUp(true)} 
//           />
//         </div>
        
//         <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//           <div 
//             className="bg-blue-600 h-2.5 rounded-full" 
//             style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
//           ></div>
//         </div>
        
//         <div className="text-sm text-gray-500 mb-6">
//           Question {currentQuestion + 1} of {quiz.questions.length}
//         </div>
        
//         <div className="mb-8">
//           <h3 className="text-xl font-medium mb-4">{question.questionText}</h3>
          
//           <div className="space-y-3">
//             {question.options.map(option => (
//               <div 
//                 key={option._id}
//                 className={`p-4 border rounded-lg cursor-pointer ${
//                   selectedOptions.includes(option._id) 
//                     ? 'bg-blue-50 border-blue-500' 
//                     : 'hover:bg-gray-50'
//                 }`}
//                 onClick={() => handleOptionSelect(option._id)}
//               >
//                 {option.text}
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="flex justify-between">
//           <button 
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
//             onClick={handlePrevious}
//             disabled={currentQuestion === 0}
//           >
//             Previous
//           </button>
          
//           {currentQuestion < quiz.questions.length - 1 ? (
//             <button 
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               onClick={handleNext}
//             >
//               Next
//             </button>
//           ) : (
//             <button 
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//               onClick={handleSubmit}
//             >
//               Submit Quiz
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TakeQuiz;

// components/Quiz/TakeQuiz.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Auto-submit when timer expires
  const handleTimeExpired = useCallback(() => {
    console.log('Time expired, auto-submitting...');
    handleSubmit();
  }, []);

  // Set up auto-submit on time expiry
  useEffect(() => {
    if (timeLeft === 0 && quiz) {
      handleTimeExpired();
    }
  }, [timeLeft, quiz, handleTimeExpired]);

  // Timer countdown
  useEffect(() => {
    if (!timeLeft) return;
    
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Fetch quiz details
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/quiz/${id}`, {
          headers: {
            'x-auth-token': token
          }
        });
        
        setQuiz(res.data);
        setTimeLeft(res.data.timeLimit);
        setLoading(false);
      } catch (err) {
        setError('Failed to load quiz. It may have been removed or you do not have permission to access it.');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  // Handle option selection
  const handleOptionSelect = (optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: optionId
    });
  };

  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Navigate to next question
  const goToNextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Submit quiz answers
  const handleSubmit = async () => {
    if (submitting) return; // Prevent multiple submissions
    
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // Format answers
      const answers = Object.keys(selectedOptions).map(questionIndex => ({
        questionId: quiz.questions[questionIndex]._id,
        selectedOptionId: selectedOptions[questionIndex]
      }));
      
      const response = await axios.post(
        'http://localhost:5000/api/attempt/submit',
        {
          quizId: id,
          answers,
          timeSpent: quiz.timeLimit - timeLeft
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        }
      );

      
      // Redirect to results page
      navigate(`/result/${response.data._id}`);
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      setError('Failed to submit your answers. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error || 'Quiz not found'}</p>
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

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="text-lg font-medium">
            Time Left: <span className={timeLeft < 60 ? "text-red-500" : ""}>{formatTime(timeLeft)}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
        
        {/* Question */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm text-gray-500">
              {currentQuestionData.points} {currentQuestionData.points === 1 ? 'point' : 'points'}
            </span>
          </div>
          
          <h2 className="text-xl font-medium mb-6">{currentQuestionData.questionText}</h2>
          
          {/* Options */}
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <div 
                key={option._id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOptions[currentQuestion] === option._id
                    ? 'bg-blue-50 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleOptionSelect(option._id)}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full border mr-3 ${
                    selectedOptions[currentQuestion] === option._id
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-gray-300'
                  }`}>
                    {selectedOptions[currentQuestion] === option._id && (
                      <span className="text-sm">✓</span>
                    )}
                  </div>
                  <span>{option.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={goToPrevQuestion}
            disabled={currentQuestion === 0}
            className={`py-2 px-4 rounded ${
              currentQuestion === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            Previous
          </button>
          
          {currentQuestion < quiz.questions.length - 1 ? (
            <button
              onClick={goToNextQuestion}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          )}
        </div>
        
        {/* Question navigation dots */}
        <div className="flex justify-center mt-6 space-x-1">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentQuestion
                  ? 'bg-blue-500'
                  : selectedOptions[index]
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to question ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;