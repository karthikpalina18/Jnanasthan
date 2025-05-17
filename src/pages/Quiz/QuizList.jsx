// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const QuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/quizzes', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setQuizzes(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch quizzes');
//         setLoading(false);
//         console.error('Error fetching quizzes:', err);
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   if (loading) return <div className="flex justify-center p-8"><div className="loader"></div></div>;
//   if (error) return <div className="alert alert-danger">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Available Quizzes</h1>
      
//       {quizzes.length === 0 ? (
//         <p>No quizzes available at the moment.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {quizzes.map(quiz => (
//             <div key={quiz._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//               <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
//               <p className="text-gray-600 mb-4">{quiz.description}</p>
//               <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                 <span>{quiz.questions.length} questions</span>
//                 <span>{quiz.timeLimit} minutes</span>
//               </div>
//               <Link 
//                 to={`/quiz/${quiz._id}`} 
//                 className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
//               >
//                 Start Quiz
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizList;


// components/Quiz/QuizList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/quiz', {
          headers: {
            'x-auth-token': token
          }
        });
        setQuizzes(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quizzes');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Available Quizzes</h1>
      
      {quizzes.length === 0 ? (
        <p>No quizzes available at the moment. Check back later!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <div 
              key={quiz._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">
                    <i className="fas fa-question-circle mr-1"></i> {quiz.questions.length} Questions
                  </span>
                  <span>
                    <i className="fas fa-clock mr-1"></i> {Math.floor(quiz.timeLimit / 60)}:{(quiz.timeLimit % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <Link 
                  to={`/quiz/${quiz._id}`}
                  className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;