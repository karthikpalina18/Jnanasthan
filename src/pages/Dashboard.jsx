import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, RadialLinearScale, ArcElement } from "chart.js";
import { Line, Bar, Radar } from "react-chartjs-2";
import { BookOpen, Code, MessageCircle, Video, Coffee, Award, TrendingUp, Bell, Users, Calendar, User, LogOut, Search, Menu, X } from "lucide-react";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
// import { User } from 'lucide-react';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courseProgress, setCourseProgress] = useState(65);
  const [notifications, setNotifications] = useState(3);
  // const username = localStorage.getItem('eamil');
  

  const navigate = useNavigate();


  console.log(User.email)
  // const { username } = useContext(UserContext);

  // return <h2>Welcome, {username}!</h2>;


  // Sample data for the learning progress chart
  const learningData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Hours Studied",
        data: [5, 8, 12, 9, 15, 10],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Sample data for skill chart
  const skillData = {
    labels: ["Problem Solving", "Algorithms", "Data Structures", "Web Dev", "Database", "System Design"],
    datasets: [
      {
        label: "Skill Level",
        data: [85, 70, 75, 90, 65, 60],
        backgroundColor: "rgba(99, 102, 241, 0.4)",
        borderColor: "rgba(99, 102, 241, 1)",
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
      },
    ],
  };

  // Sample data for quiz performance
  const quizData = {
    labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
    datasets: [
      {
        label: "Your Score",
        data: [85, 92, 78, 95, 88],
        backgroundColor: "rgba(16, 185, 129, 0.7)",
      },
      {
        label: "Average Score",
        data: [75, 82, 70, 85, 78],
        backgroundColor: "rgba(251, 191, 36, 0.7)",
      },
    ],
  };

  // Sample upcoming events
  const upcomingEvents = [
    { title: "System Design Workshop", date: "Today, 3:00 PM", type: "Workshop" },
    { title: "JavaScript Interview Prep", date: "Tomorrow, 5:00 PM", type: "Study Group" },
    { title: "Database Fundamentals Quiz", date: "May 8, 2:00 PM", type: "Quiz" },
    { title: "Resume Building Session", date: "May 9, 4:00 PM", type: "Career" },
  ];

  // Sample recommended courses
  const recommendedCourses = [
    { 
      title: "Advanced Algorithm Design",
      instructor: "Dr. Sarah Johnson",
      level: "Advanced",
      students: 2345,
      image: "/api/placeholder/300/150"
    },
    { 
      title: "Web Development Bootcamp",
      instructor: "Mike Chen",
      level: "Intermediate",
      students: 4521,
      image: "/api/placeholder/300/150"
    },
    { 
      title: "System Design Fundamentals",
      instructor: "Priya Sharma",
      level: "Intermediate",
      students: 1897,
      image: "/api/placeholder/300/150"
    },
  ];

  // Sample active internships
  const activeInternships = [
    { 
      role: "Frontend Developer Intern",
      company: "TechInnovate",
      location: "Remote",
      deadline: "May 15, 2025",
    },
    { 
      role: "Data Science Intern",
      company: "AnalyticsHub",
      location: "Hybrid",
      deadline: "May 20, 2025",
    },
    { 
      role: "Backend Developer Intern",
      company: "CloudSystems",
      location: "On-site",
      deadline: "May 25, 2025",
    },
  ];

  // Sample study streak data
  const studyStreakData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Study Hours",
        data: [2.5, 3, 4, 2, 3.5, 1.5, 2],
        backgroundColor: "rgba(234, 88, 12, 0.7)",
      },
    ],
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-indigo-800 text-white">
        <div className="px-6 py-4 flex items-center border-b border-indigo-700">
          <h1 className="text-2xl font-bold">Jnanasthan</h1>
        </div>
        <div className="p-4 flex flex-col h-full">
          <div className="flex flex-col items-center p-4 mb-4 bg-indigo-900 rounded-lg">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-2">
              <User size={32} />
            </div>
            <p className="text-sm font-semibold">{User.email}</p>
            <p className="text-xs text-indigo-300">Computer Science Student</p>
          </div>
          
          <nav className="flex-1 space-y-1">
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "dashboard" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <TrendingUp size={18} />
              <span>Dashboard</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "learn" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("learn"); toggleMobileMenu();navigate('/study-material');}}
            >
              <BookOpen size={18} />
              <span>Study Material</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "practice" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("practice"); toggleMobileMenu(); navigate('/compiler');} }
            >
              <Code size={18} />
              <span>Practice</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "quiz" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("quizzes");toggleMobileMenu(); navigate('/quizzes')}}
            >
              <Award size={18} />
              <span>Quiz</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "collaborate" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("collabrate");toggleMobileMenu(); navigate('/connection')}}
            >
              <Users size={18} />
              <span>Collaborate</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "chat" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("chat");toggleMobileMenu(); navigate('/message')}}
            >
              <MessageCircle size={18} />
              <span>Chat</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "meetings" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("meetings"); toggleMobileMenu(); navigate('/join-room')}}
            >
              <Video size={18} />
              <span>Video Meetings</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "internships" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("opportunities"); toggleMobileMenu(); navigate('/opportunity')}}
            >
              <Coffee size={18} />
              <span>Opportunities</span>
            </button>

            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "chat" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("Admin");toggleMobileMenu(); navigate('/admin')}}
            >
              <User size={18} />
              <span>Admin</span>
            </button>
          </nav>
          
          <button className="mt-auto flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-black hover:bg-red-600 transition" 
          onClick={() => {setActiveTab("Log out");toggleMobileMenu(); navigate('/log-out')}}>
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Mobile Header and Sidebar */}
      <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 ${mobileMenuOpen ? 'block' : 'hidden'}`} onClick={toggleMobileMenu}></div>
      
      <div className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-indigo-800 text-white z-50 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-6 py-4 flex items-center justify-between border-b border-indigo-700">
          <h1 className="text-xl font-bold">Jnanasthan</h1>
          <button onClick={toggleMobileMenu} className="text-white">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 flex flex-col h-full">
          <div className="flex flex-col items-center p-4 mb-4 bg-indigo-900 rounded-lg">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mb-2">
              <User size={24} />
            </div>
            <p className="text-sm font-semibold">{User.email}</p>
            <p className="text-xs text-indigo-300">Computer Science Student</p>
          </div>
          
          <nav className="flex-1 space-y-1">
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "dashboard" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("dashboard"); toggleMobileMenu();}}
            >
              <TrendingUp size={18} />
              <span>Dashboard</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "learn" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("learn"); toggleMobileMenu();navigate('/study-material');}}
            >
              <BookOpen size={18} />
              <span>StudyMaterials</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "practice" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("practice"); toggleMobileMenu(); navigate('/compiler');}}
            >
              <Code size={18} />
              <span>Practice</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "quiz" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("quiz"); toggleMobileMenu();}}
            >
              <Award size={18} />
              <span>Quiz</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "collaborate" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("collaborate"); toggleMobileMenu();}}
            >
              <Users size={18} />
              <span>Collaborate</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "chat" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("chat"); toggleMobileMenu();}}
            >
              <MessageCircle size={18} />
              <span>Chat</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "meetings" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("meetings"); toggleMobileMenu(); navigate('/join-room')}}
            >
              <Video size={18} />
              <span>Video Meetings</span>
            </button>
            
            <button 
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition ${activeTab === "internships" ? "bg-indigo-900" : "hover:bg-indigo-700"}`}
              onClick={() => {setActiveTab("opportunities"); toggleMobileMenu(); navigate('/opportunity')}}
            >
              <Coffee size={18} />
              <span>Internships</span>
            </button>
          </nav>
          
          <button className="mt-auto flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-white hover:bg-red-600 transition">
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button className="lg:hidden mr-4 text-gray-600" onClick={toggleMobileMenu}>
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "learn" && "Learning Center"}
                {activeTab === "practice" && "Practice Coding"}
                {activeTab === "quiz" && "Quiz Zone"}
                {activeTab === "collaborate" && "Collaboration Hub"}
                {activeTab === "chat" && "Chat Room"}
                {activeTab === "meetings" && "Video Meetings"}
                {activeTab === "internships" && "Internship Opportunities"}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
              </div>
              <button className="relative p-2">
                <Bell size={20} className="text-gray-600" onClick={() => {navigate('/notification')}} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    {notifications}
                  </span>
                )}
              </button  >
              <div className="hidden md:flex items-center space-x-2" onClick={() => {navigate('/Profile')}}>
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">{User.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Dashboard Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome and Stats Row */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Welcome back, {User.email}!</h3>
                  <p className="mb-6">Continue your learning journey where you left off.</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                      {courseProgress}%
                    </div>
                    <div>
                      <p className="font-semibold">Course Progress</p>
                      <p className="text-sm opacity-80">Keep going! You're doing great.</p>
                    </div>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Completed</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-indigo-600">7</p>
                      <p className="text-sm text-gray-500">Courses</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-500">15</p>
                      <p className="text-sm text-gray-500">Quizzes</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Your Streak</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-orange-500">28</p>
                      <p className="text-sm text-gray-500">Days</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Coffee size={24} className="text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Learning Progress</h3>
                  <div className="h-72">
                    <Line 
                      data={learningData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Hours'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Quiz Performance</h3>
                  <div className="h-72">
                    <Bar 
                      data={quizData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                              display: true,
                              text: 'Score (%)'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Upcoming Events and Recommended Courses */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800">See All</button>
                  </div>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                          <Calendar size={20} className="text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{event.title}</h4>
                          <p className="text-sm text-gray-500">{event.date}</p>
                          <span className="text-xs inline-block mt-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Recommended Courses</h3>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800">Browse All</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {recommendedCourses.map((course, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                        <img src={course.image} alt={course.title} className="w-full h-32 object-cover" />
                        <div className="p-3">
                          <h4 className="font-medium text-gray-800 mb-1">{course.title}</h4>
                          <p className="text-sm text-gray-500">{course.instructor}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                              {course.level}
                            </span>
                            <span className="text-xs text-gray-500">
                              {course.students} students
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Study Streak and Skill Radar */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Weekly Study Streak</h3>
                  <div className="h-64">
                    <Bar 
                      data={studyStreakData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Hours'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Skills</h3>
                  <div className="h-64">
                    <Radar 
                      data={skillData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                              stepSize: 20
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Internship Opportunities */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Active Internship Opportunities</h3>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Deadline</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activeInternships.map((internship, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{internship.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{internship.company}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{internship.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{internship.deadline}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition">
                              Apply Now
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== "dashboard" && (
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {activeTab === "learn" && "Learning Center"}
                {activeTab === "practice" && "Practice Coding"}
                {activeTab === "quiz" && "Quiz Zone"}
                {activeTab === "collaborate" && "Collaboration Hub"}
                {activeTab === "chat" && "Chat Room"}
                {activeTab === "meetings" && "Video Meetings"}
                {activeTab === "internships" && "Internship Opportunities"}
              </h3>
              <p className="text-gray-600">This section is currently under development. Check back soon!</p>
            </div>
          )}
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-600">© 2025 Jnanasthan Learning Platform. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;