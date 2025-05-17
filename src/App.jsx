
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Compiler from './pages/Compiler';
import JoinRoom from './pages/JoinRoom';
import Room from './pages/Room';
import JoinPage from './pages/JoinPage';
import ChatRoom from './pages/ChatRoom';
import Profile from './pages/Profile';
import ProfileForm from './pages/ProfileForm';
import ProfilePage from './pages/ProfilePage';
import Connections from './pages/Connections';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Connect from './pages/Connect';

import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import StudyMaterial from './components/StudyMaterial';
import OpportunitiesList from './components/OpportunitesList';
import UploadOpportunity from './components/UploadOpportunity';
// Import quiz components
import QuizList from './components/Quiz/QuizList';
import TakeQuiz from './components/Quiz/TakeQuiz';
import QuizResult from './components/Quiz/QuizResult';
import AdminPanel from './components/Admin/AdminPanel';
import AdminQuizList from './components/Admin/AdminQuizList';
import CreateQuiz from './components/Admin/CreateQuiz';
import EditQuiz from './components/Admin/EditQuiz';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';


const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user role in localStorage
    const checkUserRole = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUserRole(null);
        setIsLoading(false);
        return;
      }

      try {
        // Try to get user info from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, []);

  // Handle route redirection based on role
  const handleDashboardRedirect = () => {
    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" />;
    }

    if (userRole === 'admin') {
      return <Navigate to="/admin" />;
    }

    return <Dashboard />;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Redirect to appropriate dashboard based on role */}
      <Route path="/dashboard" element={handleDashboardRedirect()} />
      
      {/* Public routes */}
      <Route path="/compiler" element={<Compiler />} />
      <Route path="/join-room" element={<JoinRoom />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="/chat-join" element={<JoinPage />} />
      <Route path="/chat/:roomId" element={<ChatRoom />} />

      <Route path="/course" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/study-material" element={<StudyMaterial />} />
        <Route path="/profileForm" element={<ProfileForm/>}/>
        <Route path="/profilePage/:Userid" element={<ProfilePage/>}/> 
        <Route path="/profile" element={<Profile/>}/> 
        <Route path="/message" element={<Messages />} />
          <Route path="/connection" element={<Connections />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/connect" element={<Connect />} />
          <Route path='/opportunity' element ={<OpportunitiesList/>}/>
      
      {/* User routes */}
      <Route path="/quizzes" element={
        <PrivateRoute>
          <QuizList />
        </PrivateRoute>
      } />
      <Route path="/quiz/:id" element={
        <PrivateRoute>
          <TakeQuiz />
        </PrivateRoute>
      } />
      <Route path="/result/:attemptId" element={
        <PrivateRoute>
          <QuizResult />
        </PrivateRoute>
      } />
      
      {/* Admin routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminPanel />
        </AdminRoute>
      } />
      <Route path="/admin/quizzes" element={
        <AdminRoute>
          <AdminQuizList />
        </AdminRoute>
      } />
      <Route path="/admin/quiz/create" element={
        <AdminRoute>
          <CreateQuiz />
        </AdminRoute>
      } />
      <Route path="/admin/quiz/edit/:id" element={
        <AdminRoute>
          <EditQuiz />
        </AdminRoute>
      } />
      <Route path="/UploadOpportunity" element={
        <AdminRoute>
          <UploadOpportunity />
        </AdminRoute>
      } />
    </Routes>
  );
};

export default App;