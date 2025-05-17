// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import React from 'react';
import AddCourseForm from './../AddCourseForm';
import AddStudyMaterialForm from './../AddStudyMaterialForm';
import CourseList from './../CourseList';
import StudyMaterialSearch from './../StudyMaterialSearch';
import dashboard from './../../pages/Dashboard';

// const AdminPanel = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalQuizzes: 0,
//     totalAttempts: 0,
//     recentUsers: [],
//     recentQuizzes: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Get user data from localStorage
//         const userData = localStorage.getItem('user');
//         if (userData) {
//           const user = JSON.parse(userData);
//           setUsername(user.username);
//         }

//         // Fetch dashboard statistics
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         // You'll need to implement these endpoints on your backend
//         const [usersRes, quizzesRes, attemptsRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/auth/users/count', {
//             headers: { 'x-auth-token': token }
//           }),
//           axios.get('http://localhost:5000/api/quiz/count', {
//             headers: { 'x-auth-token': token }
//           }),
//           axios.get('http://localhost:5000/api/attempt/count', {
//             headers: { 'x-auth-token': token }
//           })
//         ]);

//         // Optional: Get recent users and quizzes
//         const [recentUsersRes, recentQuizzesRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/auth/users/recent', {
//             headers: { 'x-auth-token': token }
//           }),
//           axios.get('http://localhost:5000/api/quiz/recent', {
//             headers: { 'x-auth-token': token }
//           })
//         ]);

//         setStats({
//           totalUsers: usersRes.data.count || 0,
//           totalQuizzes: quizzesRes.data.count || 0,
//           totalAttempts: attemptsRes.data.count || 0,
//           recentUsers: recentUsersRes.data || [],
//           recentQuizzes: recentQuizzesRes.data || []
//         });
//       } catch (error) {
//         console.error('Error fetching admin data:', error);
//         // For demonstration, use mock data if endpoints aren't implemented
//         setStats({
//           totalUsers: 42,
//           totalQuizzes: 15,
//           totalAttempts: 127,
//           recentUsers: [
//             { _id: '1', username: 'user1', email: 'user1@example.com', createdAt: new Date().toISOString() },
//             { _id: '2', username: 'user2', email: 'user2@example.com', createdAt: new Date().toISOString() }
//           ],
//           recentQuizzes: [
//             { _id: '1', title: 'JavaScript Basics', createdAt: new Date().toISOString() },
//             { _id: '2', title: 'React Fundamentals', createdAt: new Date().toISOString() }
//           ]
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//             <span className="text-gray-600">Welcome, {username}</span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
//           {/* Total Users */}
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
//                   <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
//                   </svg>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
//                     <dd className="flex items-baseline">
//                       <div className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</div>
//                     </dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Total Quizzes */}
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
//                   <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
//                   </svg>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Total Quizzes</dt>
//                     <dd className="flex items-baseline">
//                       <div className="text-2xl font-semibold text-gray-900">{stats.totalQuizzes}</div>
//                     </dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Total Attempts */}
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
//                   <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
//                   </svg>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">Quiz Attempts</dt>
//                     <dd className="flex items-baseline">
//                       <div className="text-2xl font-semibold text-gray-900">{stats.totalAttempts}</div>
//                     </dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-white shadow mb-6 rounded-lg">
//           <div className="px-4 py-5 sm:p-6">
//             <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
//             <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <Link
//                 to="/admin/quizzes"
//                 className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
//               >
//                 Manage Quizzes
//               </Link>
//               <Link
//                 to="/admin/quiz/create"
//                 className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
//               >
//                 Create New Quiz
//               </Link>
//               <button
//                 className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
//                 onClick={() => alert('Feature coming soon!')}
//               >
//                 Generate Reports
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity - Grid Layout */}
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//           {/* Recent Users */}
//           <div className="bg-white shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Users</h3>
//               <div className="mt-5 max-h-80 overflow-y-auto">
//                 <ul className="divide-y divide-gray-200">
//                   {stats.recentUsers.map(user => (
//                     <li key={user._id} className="py-4">
//                       <div className="flex items-center space-x-4">
//                         <div className="flex-shrink-0">
//                           <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
//                             <span className="text-sm font-medium text-gray-500">
//                               {user.username.charAt(0).toUpperCase()}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
//                           <p className="text-sm text-gray-500 truncate">{user.email}</p>
//                         </div>
//                         <div className="flex-shrink-0 text-sm text-gray-500">
//                           {new Date(user.createdAt).toLocaleDateString()}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Recent Quizzes */}
//           <div className="bg-white shadow rounded-lg">
//             <div className="px-4 py-5 sm:p-6">
//               <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Quizzes</h3>
//               <div className="mt-5 max-h-80 overflow-y-auto">
//                 <ul className="divide-y divide-gray-200">
//                   {stats.recentQuizzes.map(quiz => (
//                     <li key={quiz._id} className="py-4">
//                       <div className="flex items-center space-x-4">
//                         <div className="flex-shrink-0">
//                           <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
//                             <svg className="h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
//                             </svg>
//                           </div>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-900 truncate">{quiz.title}</p>
//                           <p className="text-sm text-gray-500 truncate">Created {new Date(quiz.createdAt).toLocaleDateString()}</p>
//                         </div>
//                         <div className="flex-shrink-0">
//                           <Link
//                             to={`/admin/quiz/edit/${quiz._id}`}
//                             className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
//                           >
//                             Edit
//                           </Link>
//                         </div>
//                       </div>
//                     </li>
                    
//                   ))}
//                 </ul>
//                 <div>
//       <h1>Jnanasthan Admin Panel</h1>
//       <AddCourseForm />
//       <AddStudyMaterialForm />
//       <hr />
//       <CourseList />
//       <StudyMaterialSearch />
//     </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>

    
//   );
// };

// export default AdminPanel;

// //             <div className="relative">
// //               <button className="p-2 rounded-full hover:bg-gray-100">
// //                 <Bell size={18} className="text-gray-600" />
// //                 {notificationsCount > 0 && (
// //                   <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
// //                     {notificationsCount}
// //                   </span>
// //                 )}
// //               </button>
// //             </div>
            
// //             {/* User Menu */}
// //             <div className="relative">
// //               <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-1.5">
// //                 <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
// //                   {userData?.username?.charAt(0).toUpperCase() || 'A'}
// //                 </div>
// //                 <ChevronDown size={16} className="text-gray-600" />
// //               </button>
// //             </div>
// //           </div>
// //         </header>
        
// //         {/* Content Area */}
// //         <main className="flex-1 overflow-y-auto p-6">
// //           {renderContent()}
// //         </main>
        
// //         {/* Footer */}
// //         <footer className="h-12 bg-white border-t border-gray-200 px-6 flex items-center justify-between text-sm text-gray-600">
// //           <div>© 2025 Jnanasthan Learning Platform</div>
// //           <div className="flex items-center space-x-4">
// //             <a href="#" className="hover:text-blue-600 flex items-center">
// //               <HelpCircle size={14} className="mr-1" />
// //               Help Center
// //             </a>
// //             <a href="#" className="hover:text-blue-600 flex items-center">
// //               <Coffee size={14} className="mr-1" />
// //               Feedback
// //             </a>
// //           </div>
// //         </footer>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminPanel;
import '../../pages/Dashboard.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    totalAttempts: 0,
    recentUsers: [],
    recentQuizzes: []
  });
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUsername(user.username);
        }

        // Fetch dashboard statistics
        const token = localStorage.getItem('token');
        if (!token) return;

        // You'll need to implement these endpoints on your backend
        const [usersRes, quizzesRes, attemptsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/users/count', {
            headers: { 'x-auth-token': token }
          }),
          axios.get('http://localhost:5000/api/quiz/count', {
            headers: { 'x-auth-token': token }
          }),
          axios.get('http://localhost:5000/api/attempt/count', {
            headers: { 'x-auth-token': token }
          })
        ]);

        // Optional: Get recent users and quizzes
        const [recentUsersRes, recentQuizzesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/users/recent', {
            headers: { 'x-auth-token': token }
          }),
          axios.get('http://localhost:5000/api/quiz/recent', {
            headers: { 'x-auth-token': token }
          })
        ]);

        setStats({
          totalUsers: usersRes.data.count || 0,
          totalQuizzes: quizzesRes.data.count || 0,
          totalAttempts: attemptsRes.data.count || 0,
          recentUsers: recentUsersRes.data || [],
          recentQuizzes: recentQuizzesRes.data || []
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // For demonstration, use mock data if endpoints aren't implemented
        setStats({
          totalUsers: 42,
          totalQuizzes: 15,
          totalAttempts: 127,
          recentUsers: [
            { _id: '1', username: 'user1', email: 'user1@example.com', createdAt: new Date().toISOString() },
            { _id: '2', username: 'user2', email: 'user2@example.com', createdAt: new Date().toISOString() }
          ],
          recentQuizzes: [
            { _id: '1', title: 'JavaScript Basics', createdAt: new Date().toISOString() },
            { _id: '2', title: 'React Fundamentals', createdAt: new Date().toISOString() }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Menu items for sidebar navigation
  const menuItems = [
    { id: 'dashboard', label: 'Admin', icon: (
      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ) },
    { id: 'courses', label: 'Courses', icon: (
      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ) },
    { id: 'quizzes', label: 'Quizzes', icon: (
      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ) },
    { id: 'materials', label: 'Study Materials', icon: (
      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ) },
    { id: 'dashboard2', label: 'Dashboard', icon: (
      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) },
    // { id: 'reports', label: 'Reports', icon: (
    //   <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    //   </svg>
    // ) },
    // { id: 'settings', label: 'Settings', icon: (
    //   <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    //   </svg>
    // ) }
  ];

  // Placeholder renderer for tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'courses':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course Management</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Course</h3>
                 <AddCourseForm />
                {/* Placeholder for AddCourseForm */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter course title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select category</option>
                      <option>Programming</option>
                      <option>Design</option>
                      <option>Business</option>
                    </select>
                  </div> */}
                {/* </div> */}
                {/* <div className="mt-4">
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm">
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Course
                  </button>
                </div> */}
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800">Current Courses</h3>
                </div>
                <div className="overflow-x-auto">
                  
                  <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
    </tr>
  </thead>
  <CourseList />
</table>

                </div>
              </div>
            </div>
          </div>
        );
      case 'materials':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Study Materials</h2>
            {/* Placeholder for study materials */}
            <AddStudyMaterialForm />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">All Materials</h3>
                {/* <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Material
                </button> */}
              </div>
              
              
                <StudyMaterialSearch/>
              </div>
            </div>

        );
      case 'quizzes':
        return (
<div className="bg-white shadow mb-6 rounded-lg">
           <div className="px-4 py-5 sm:p-6">
             <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
             <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
                to="/admin/quizzes"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Manage Quizzes
              </Link>
              <Link
                to="/admin/quiz/create"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
              >
                Create New Quiz
              </Link>
              <button
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                onClick={() => alert('Feature coming soon!')}
              >
                Generate Reports
              </button>
            </div>
          </div>
        </div>
        ) ; 
      case 'dashboard2':
        return (
  <Link to="/dashboard">
    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
      Go to Dashboard
    </button>
  </Link>
);

      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{
              menuItems.find(item => item.id === activeTab)?.label
            }</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  const renderDashboard = () => {
    return (
      <>
        {/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  {/* First Card */}
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 rounded-xl bg-blue-50 p-3">
          {/* SVG icon */}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            <p className="ml-2 text-sm font-medium text-green-600">
              <span className="flex items-center">
                {/* Up arrow SVG */}
                
              </span>
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">From last month</p>
        </div>
      </div>
    </div>
  </div>

  {/* Second Card */}
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 rounded-xl bg-blue-50 p-3">
          {/* SVG icon */}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Quizzes </p>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">{stats.totalQuizzes}</p>
            <p className="ml-2 text-sm font-medium text-green-600">
              <span className="flex items-center">
                {/* Up arrow SVG */}
                
              </span>
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">From last month</p>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 rounded-xl bg-blue-50 p-3">
          {/* SVG icon */}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500 mb-1">Quiz Attempts</p>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">{stats.totalAttempts}</p>
            <p className="ml-2 text-sm font-medium text-green-600">
              <span className="flex items-center">
                {/* Up arrow SVG */}
                
              </span>
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">From last month</p>
        </div>
      </div>
    </div>
  </div>
  
</div>

        

        {/* Quick Actions */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Create Quiz
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200">
                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Course
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Material
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate Report
              </button>
            </div>
          </div>
        </div> */}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {stats.recentUsers.map(user => (
                <div key={user._id} className="p-5 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium shadow-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{user.username}</h4>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString(undefined, { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <button className="ml-2 text-gray-400 hover:text-gray-500">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 w-full text-center">
                Load More
              </button>
            </div>
          </div>

          {/* Recent Quizzes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Recent Quizzes</h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {stats.recentQuizzes.map(quiz => (
                <div key={quiz._id} className="p-5 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{quiz.title}</h4>
                          <p className="text-sm text-gray-500">Created {new Date(quiz.createdAt).toLocaleDateString(undefined, { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            View
                          </button>
                          <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 w-full text-center">
                Load More
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
          <div className="absolute top-0 left-0 h-24 w-24 flex justify-center items-center">
            <svg className="h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} fixed inset-0 z-40 lg:hidden`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="relative flex flex-col flex-1 w-full max-w-xs bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-xl font-bold text-blue-600">Jnanasthan</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full transition-colors duration-200`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  {username.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{username}</p>
                <button
                  className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  onClick={() => {
                    alert('Logout functionality would go here');
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-bold text-blue-600">Jnanasthan</span>
            </div>
            <div className="mt-6 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors duration-200`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  {username.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700 truncate">{username}</p>
                <button
                  className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  onClick={() => {
                    alert('Logout functionality would go here');
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top Navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            

          </div>
        </div>
        
        {/* Page Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;