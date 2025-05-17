// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import axios from 'axios';

// // const QuizList = () => {
// //   const [quizzes, setQuizzes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [deleteConfirm, setDeleteConfirm] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [categoryFilter, setCategoryFilter] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('');

// //   // Categories for filter dropdown
// //   const categories = [
// //     'Programming',
// //     'Web Development',
// //     'Data Science',
// //     'Mathematics',
// //     'Computer Science',
// //     'General Knowledge',
// //     'Other'
// //   ];

// //   useEffect(() => {
// //     fetchQuizzes();
// //   }, []);

// //   const fetchQuizzes = async () => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem('token');
// //       const response = await axios.get('/api/admin/quizzes', {
// //         headers: { 'x-auth-token': token }
// //       });
// //       setQuizzes(response.data);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error('Error fetching quizzes:', err);
// //       setError('Failed to load quizzes. Please try again later.');
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeleteClick = (quizId) => {
// //     setDeleteConfirm(quizId);
// //   };

// //   const cancelDelete = () => {
// //     setDeleteConfirm(null);
// //   };

// //   const confirmDelete = async (quizId) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       await axios.delete(`/api/admin/quizzes/${quizId}`, {
// //         headers: { 'x-auth-token': token }
// //       });
      
// //       // Remove from state
// //       setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
// //       setDeleteConfirm(null);
// //     } catch (err) {
// //       console.error('Error deleting quiz:', err);
// //       setError('Failed to delete quiz. Please try again.');
// //     }
// //   };

// //   const togglePublishStatus = async (quiz) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const updatedData = {
// //         ...quiz,
// //         isPublished: !quiz.isPublished
// //       };
      
// //       await axios.put(`/api/admin/quizzes/${quiz._id}/publish`, 
// //         { isPublished: !quiz.isPublished }, 
// //         { headers: { 'x-auth-token': token } }
// //       );
      
// //       // Update state
// //       setQuizzes(quizzes.map(q => 
// //         q._id === quiz._id ? { ...q, isPublished: !q.isPublished } : q
// //       ));
// //     } catch (err) {
// //       console.error('Error updating quiz status:', err);
// //       setError('Failed to update quiz status. Please try again.');
// //     }
// //   };

// //   // Filter quizzes based on search term and filters
// //   const filteredQuizzes = quizzes.filter(quiz => {
// //     // Search term filter (check title and description)
// //     const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
// //                           quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    
// //     // Category filter
// //     const matchesCategory = categoryFilter === '' || quiz.category === categoryFilter;
    
// //     // Status filter
// //     const matchesStatus = statusFilter === '' || 
// //                          (statusFilter === 'published' && quiz.isPublished) ||
// //                          (statusFilter === 'draft' && !quiz.isPublished);
    
// //     return matchesSearch && matchesCategory && matchesStatus;
// //   });

// //   // Helper function to generate badge for quiz status
// //   const getStatusBadge = (isPublished) => {
// //     return isPublished ? 
// //       <span className="badge bg-success">Published</span> : 
// //       <span className="badge bg-secondary">Draft</span>;
// //   };

// //   // Helper function to display date in readable format
// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleDateString();
// //   };

// //   if (loading) {
// //     return <div className="text-center p-5">Loading quizzes...</div>;
// //   }

// //   return (
// //     <div className="container py-4">
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h1>Manage Quizzes</h1>
// //         <Link to="/admin/quizzes/create" className="btn btn-primary">
// //           Create New Quiz
// //         </Link>
// //       </div>

// //       {error && (
// //         <div className="alert alert-danger" role="alert">
// //           {error}
// //           <button 
// //             type="button" 
// //             className="btn-close float-end" 
// //             onClick={() => setError(null)}
// //             aria-label="Close"
// //           ></button>
// //         </div>
// //       )}

// //       <div className="card mb-4">
// //         <div className="card-body">
// //           <h5 className="card-title">Filter Quizzes</h5>
// //           <div className="row g-3">
// //             <div className="col-md-6">
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 placeholder="Search by title or description"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //             <div className="col-md-3">
// //               <select
// //                 className="form-select"
// //                 value={categoryFilter}
// //                 onChange={(e) => setCategoryFilter(e.target.value)}
// //               >
// //                 <option value="">All Categories</option>
// //                 {categories.map((category, index) => (
// //                   <option key={index} value={category}>
// //                     {category}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //             <div className="col-md-3">
// //               <select
// //                 className="form-select"
// //                 value={statusFilter}
// //                 onChange={(e) => setStatusFilter(e.target.value)}
// //               >
// //                 <option value="">All Status</option>
// //                 <option value="published">Published</option>
// //                 <option value="draft">Draft</option>
// //               </select>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {filteredQuizzes.length === 0 ? (
// //         <div className="alert alert-info">
// //           No quizzes found. {searchTerm || categoryFilter || statusFilter ? 'Try adjusting your filters.' : 'Create your first quiz!'}
// //         </div>
// //       ) : (
// //         <div className="table-responsive">
// //           <table className="table table-striped table-hover">
// //             <thead className="table-light">
// //               <tr>
// //                 <th>Title</th>
// //                 <th>Category</th>
// //                 <th>Questions</th>
// //                 <th>Created</th>
// //                 <th>Status</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredQuizzes.map((quiz) => (
// //                 <tr key={quiz._id}>
// //                   <td>
// //                     <Link to={`/admin/quizzes/${quiz._id}`} className="text-decoration-none">
// //                       {quiz.title}
// //                     </Link>
// //                     <div className="small text-muted text-truncate" style={{ maxWidth: '250px' }}>
// //                       {quiz.description}
// //                     </div>
// //                   </td>
// //                   <td>{quiz.category}</td>
// //                   <td>{quiz.questions?.length || 0}</td>
// //                   <td>{formatDate(quiz.createdAt)}</td>
// //                   <td>{getStatusBadge(quiz.isPublished)}</td>
// //                   <td>
// //                     {deleteConfirm === quiz._id ? (
// //                       <div className="btn-group" role="group">
// //                         <button
// //                           className="btn btn-danger btn-sm"
// //                           onClick={() => confirmDelete(quiz._id)}
// //                         >
// //                           Confirm
// //                         </button>
// //                         <button
// //                           className="btn btn-secondary btn-sm"
// //                           onClick={cancelDelete}
// //                         >
// //                           Cancel
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <div className="btn-group" role="group">
// //                         <Link
// //                           to={`/admin/quizzes/${quiz._id}/edit`}
// //                           className="btn btn-outline-primary btn-sm"
// //                         >
// //                           Edit
// //                         </Link>
// //                         <Link
// //                           to={`/admin/quizzes/${quiz._id}/results`}
// //                           className="btn btn-outline-info btn-sm"
// //                         >
// //                           Results
// //                         </Link>
// //                         <button
// //                           className="btn btn-outline-success btn-sm"
// //                           onClick={() => togglePublishStatus(quiz)}
// //                         >
// //                           {quiz.isPublished ? 'Unpublish' : 'Publish'}
// //                         </button>
// //                         <button
// //                           className="btn btn-outline-danger btn-sm"
// //                           onClick={() => handleDeleteClick(quiz._id)}
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default QuizList;

// // components/Quiz/QuizList.js
// import React, { useState, useEffect } from 'react';
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
//         const res = await axios.get('http://localhost:5000/api/quiz', {
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

//   if (loading) return <div>Loading quizzes...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Available Quizzes</h1>
//       {quizzes.length === 0 ? (
//         <p>No quizzes available at the moment. Check back later!</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {quizzes.map(quiz => (
//             <div 
//               key={quiz._id} 
//               className="border rounded-lg p-4 bg-white shadow-md"
//             >
//               <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
//               <p className="text-gray-600 mb-4">{quiz.description}</p>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-500">
//                   {quiz.questions.length} questions
//                 </span>
//                 <Link 
//                   to={`/quiz/${quiz._id}`} 
//                   className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
//                 >
//                   Start Quiz
//                 </Link>
//               </div>
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
        setQuizzes(res.data); // Assuming res.data is an array of quizzes
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
        setError('Failed to load quizzes.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>All Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        <ul className="list-group">
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{quiz.title}</strong>
                <div className="text-muted small">{quiz.description}</div>
              </div>
              <Link to={`/quiz/${quiz._id}`} className="btn btn-sm btn-primary">
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;
