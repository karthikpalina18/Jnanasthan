// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import axios from 'axios';

// // const AdminQuizList = () => {
// //   const [quizzes, setQuizzes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [confirmDelete, setConfirmDelete] = useState(null);

// //   useEffect(() => {
// //     const fetchQuizzes = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const response = await axios.get('/api/admin/quizzes', {
// //           headers: { 'x-auth-token': token }
// //         });
// //         setQuizzes(response.data);
// //         setLoading(false);
// //       } catch (err) {
// //         setError('Failed to fetch quizzes. Please try again later.');
// //         setLoading(false);
// //         console.error('Error fetching quizzes:', err);
// //       }
// //     };

// //     fetchQuizzes();
// //   }, []);

// //   const handleDelete = async (quizId) => {
// //     if (confirmDelete === quizId) {
// //       try {
// //         const token = localStorage.getItem('token');
// //         await axios.delete(`/api/admin/quizzes/${quizId}`, {
// //           headers: { 'x-auth-token': token }
// //         });
// //         setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
// //         setConfirmDelete(null);
// //       } catch (err) {
// //         setError('Failed to delete quiz. Please try again.');
// //         console.error('Error deleting quiz:', err);
// //       }
// //     } else {
// //       setConfirmDelete(quizId);
// //     }
// //   };

// //   const filteredQuizzes = quizzes.filter(quiz => 
// //     quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   if (loading) {
// //     return <div className="flex justify-center items-center h-screen">Loading quizzes...</div>;
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-3xl font-bold">Manage Quizzes</h1>
// //         <Link 
// //           to="/admin/quiz/create" 
// //           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// //         >
// //           Create New Quiz
// //         </Link>
// //       </div>

// //       <div className="mb-6">
// //         <input
// //           type="text"
// //           placeholder="Search quizzes..."
// //           className="w-full p-3 border border-gray-300 rounded"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //       </div>

// //       {error && (
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //           {error}
// //         </div>
// //       )}

// //       {filteredQuizzes.length === 0 ? (
// //         <div className="text-center py-8">
// //           <p className="text-gray-500 text-lg">No quizzes found.</p>
// //         </div>
// //       ) : (
// //         <div className="bg-white rounded-lg shadow overflow-hidden">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Quiz Title
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Category
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Questions
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Status
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {filteredQuizzes.map((quiz) => (
// //                 <tr key={quiz._id}>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
// //                     <div className="text-sm text-gray-500">
// //                       Created: {new Date(quiz.createdAt).toLocaleDateString()}
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {quiz.category}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {quiz.questions?.length || 0}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                       quiz.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
// //                     }`}>
// //                       {quiz.isPublished ? 'Published' : 'Draft'}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                     <div className="flex space-x-2">
// //                       <Link 
// //                         to={`/admin/quiz/edit/${quiz._id}`}
// //                         className="text-indigo-600 hover:text-indigo-900"
// //                       >
// //                         Edit
// //                       </Link>
// //                       <button
// //                         onClick={() => handleDelete(quiz._id)}
// //                         className={`${
// //                           confirmDelete === quiz._id
// //                             ? 'text-red-600 font-bold'
// //                             : 'text-red-500 hover:text-red-700'
// //                         }`}
// //                       >
// //                         {confirmDelete === quiz._id ? 'Confirm?' : 'Delete'}
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
      
// //       <div className="mt-4">
// //         <Link to="/admin" className="text-blue-600 hover:text-blue-800">
// //           &larr; Back to Admin Panel
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminQuizList;

// // components/Admin/AdminQuizList.js
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const AdminQuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/quiz/admin/all', {
//           headers: {
//             'x-auth-token': token
//           }
//         });
//         setQuizzes(res.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch quizzes');
//         setLoading(false);
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   const handleDeleteQuiz = async (quizId) => {
//     if (!window.confirm('Are you sure you want to delete this quiz?')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/quiz/${quizId}`, {
//         headers: {
//           'x-auth-token': token
//         }
//       });
      
//       // Update the state to remove the deleted quiz
//       setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
//     } catch (err) {
//       setError('Failed to delete quiz');
//     }
//   };

//   if (loading) return <div>Loading quizzes...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Manage Quizzes</h1>
//         <Link 
//           to="/admin/quiz/create" 
//           className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
//         >
//           Create New Quiz
//         </Link>
//       </div>
      
//       {quizzes.length === 0 ? (
//         <p>No quizzes available. Create your first quiz!</p>
//       ) : (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Title
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Questions
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Created At
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {quizzes.map(quiz => (
//                 <tr key={quiz._id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
//                     <div className="text-sm text-gray-500">{quiz.description.substring(0, 50)}...</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {quiz.questions.length}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span 
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                         ${quiz.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
//                     >
//                       {quiz.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(quiz.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <Link 
//                       to={`/admin/quiz/edit/${quiz._id}`}
//                       className="text-blue-600 hover:text-blue-900 mr-4"
//                     >
//                       Edit
//                     </Link>
//                     <button 
//                       onClick={() => handleDeleteQuiz(quiz._id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminQuizList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminQuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [publishLoading, setPublishLoading] = useState(null);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/quiz/admin/all', {
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

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/quiz/${quizId}`, {
        headers: {
          'x-auth-token': token
        }
      });
      
      // Update the state to remove the deleted quiz
      setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
    } catch (err) {
      setError('Failed to delete quiz');
    }
  };

  const togglePublishStatus = async (quizId, currentStatus) => {
    setPublishLoading(quizId);
    try {
      const token = localStorage.getItem('token');
      
      // Get the quiz to update
      const quizToUpdate = quizzes.find(q => q._id === quizId);
      if (!quizToUpdate) {
        throw new Error('Quiz not found');
      }
      
      // Update just the isPublished field
      const updatedData = {
        title: quizToUpdate.title,
        description: quizToUpdate.description,
        timeLimit: quizToUpdate.timeLimit,
        questions: quizToUpdate.questions,
        isPublished: !currentStatus // Toggle the status
      };
      
      await axios.put(`http://localhost:5000/api/quiz/${quizId}`, updatedData, {
        headers: {
          'x-auth-token': token
        }
      });
      
      // Update local state
      setQuizzes(quizzes.map(quiz => 
        quiz._id === quizId 
          ? { ...quiz, isPublished: !currentStatus } 
          : quiz
      ));
      
      setPublishLoading(null);
    } catch (err) {
      console.error('Error updating publish status:', err);
      setError('Failed to update quiz status');
      setPublishLoading(null);
    }
  };

  if (loading) return <div>Loading quizzes...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Quizzes</h1>
        <Link 
          to="/admin/quiz/create" 
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Create New Quiz
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            className="float-right font-bold"
            onClick={() => setError(null)}
          >
            &times;
          </button>
        </div>
      )}
      
      {quizzes.length === 0 ? (
        <p>No quizzes available. Create your first quiz!</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quizzes.map(quiz => (
                <tr key={quiz._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                    <div className="text-sm text-gray-500">{quiz.description.substring(0, 50)}...</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quiz.questions.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${quiz.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      onClick={() => togglePublishStatus(quiz._id, quiz.isPublished)}
                      disabled={publishLoading === quiz._id}
                    >
                      {publishLoading === quiz._id ? 'Updating...' : 
                        quiz.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/admin/quiz/edit/${quiz._id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDeleteQuiz(quiz._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminQuizList;