import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '/src/index.css'
const Home = () => {
  // Consolidated state
  const [state, setState] = useState({
    activeSection: 'hero',
    isMenuOpen: false,
    isScrolled: false,
    testimonialIndex: 0,
    animatedCount: { students: 0, courses: 0, mentors: 0, satisfaction: 0 },
    showModal: false
  });

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setState(prev => ({ ...prev, isScrolled: window.scrollY > 50 }));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animate stats counters
  useEffect(() => {
    const targetValues = { students: 50000, courses: 200, mentors: 120, satisfaction: 98 };
    const duration = 2000;
    const frameRate = 40; // Reduced update frequency
    const totalFrames = duration / frameRate;
    let frame = 0;
    
    const counter = setInterval(() => {
      if (frame < totalFrames) {
        frame++;
        const progress = frame / totalFrames;
        setState(prev => ({
          ...prev,
          animatedCount: {
            students: Math.floor(targetValues.students * progress),
            courses: Math.floor(targetValues.courses * progress),
            mentors: Math.floor(targetValues.mentors * progress),
            satisfaction: Math.floor(targetValues.satisfaction * progress)
          }
        }));
      } else {
        clearInterval(counter);
      }
    }, frameRate);
    
    return () => clearInterval(counter);
  }, []);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        testimonialIndex: (prev.testimonialIndex + 1) % testimonials.length
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Optimized chart data
  const lineChartData = [
    { name: 'Jan', enrolled: 4000, completed: 2400 },
    { name: 'Mar', enrolled: 2000, completed: 9800 },
    { name: 'May', enrolled: 1890, completed: 4800 },
    { name: 'Jul', enrolled: 3490, completed: 4300 },
  ];

  const barChartData = [
    { name: 'Web Dev', students: 4000 },
    { name: 'AI/ML', students: 3000 },
    { name: 'Data Sci', students: 2000 },
    { name: 'UX/UI', students: 2780 }
  ];

  const pieChartData = [
    { name: 'Beginners', value: 400 },
    { name: 'Intermediate', value: 300 },
    { name: 'Advanced', value: 200 }
  ];

  const COLORS = ['#38bdf8', '#4ade80', '#facc15', '#f87171'];

  // Optimized featured courses data
  const featuredCourses = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      category: 'AI/ML',
      instructor: 'Dr. Ramesh Kumar',
      rating: 4.9,
      students: 12500,
      level: 'Intermediate',
      price: '₹2999'
    },
    {
      id: 2,
      title: 'Advanced Web Development',
      category: 'Web Dev',
      instructor: 'Priya Sharma',
      rating: 4.8,
      students: 15200,
      level: 'Advanced',
      price: '₹3499'
    },
    {
      id: 3,
      title: 'Data Science for Beginners',
      category: 'Data Science',
      instructor: 'Vikram Singh',
      rating: 4.7,
      students: 9800,
      level: 'Beginner',
      price: '₹1999'
    },
    {
      id: 4,
      title: 'Mobile App Development with Flutter',
      category: 'Mobile',
      instructor: 'Ananya Desai',
      rating: 4.9,
      students: 7500,
      level: 'Intermediate',
      price: '₹2799'
    }
  ];
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Aditya Sharma',
      role: 'Software Engineer',
      company: 'TechCorp',
      text: 'Jnanasthan transformed my career. The AI/ML courses were incredibly thorough and the instructors were always available to clarify concepts.'
    },
    {
      id: 2,
      name: 'Priya Malhotra',
      role: 'Data Scientist',
      company: 'DataWave',
      text: 'As someone from a non-technical background, I was worried about diving into data science. Jnanasthan made the journey enjoyable!'
    },
    {
      id: 3,
      name: 'Rahul Verma',
      role: 'Product Manager',
      company: 'InnovateTech',
      text: 'The practical approach of Jnanasthan courses sets them apart. Real-world projects and excellent mentorship helped me gain valuable skills.'
    }
  ];
  
  // Platform features - simplified
  const platformFeatures = [
    {
      title: 'Personalized Learning',
      description: 'AI-powered system creates a customized learning journey based on your goals and learning style.',
      icon: 'path'
    },
    {
      title: 'Expert-Led Sessions',
      description: 'Interact with industry experts in real-time through interactive live sessions.',
      icon: 'video'
    },
    {
      title: 'Hands-On Projects',
      description: 'Apply what you learn through practical projects that simulate real-world challenges.',
      icon: 'code'
    },
  ];
  
  // Helper function to scroll to a section
  const scrollToSection = (sectionId) => {
    setState(prev => ({
      ...prev,
      activeSection: sectionId,
      isMenuOpen: false
    }));
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Icon components for better performance
  const getIcon = (type) => {
    if (type === 'path') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      );
    } else if (type === 'video') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      );
    } else if (type === 'code') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  return (



    
    <div className="min-h-screen bg-white">
      {/* Video Modal */}
      {state.showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Jnanasthan Demo</h3>
              <button 
                onClick={() => setState(prev => ({ ...prev, showModal: false }))}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <p className="mt-2 text-gray-600">Video Demo Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${state.isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${state. isScrolled ? 'bg-sky-500' : 'bg-white'} flex items-center justify-center mr-2`}>
                <span className={`text-lg font-bold ${state.isScrolled ? 'text-white' : 'text-sky-500'}`}>J</span>
              </div>
              <span className={`text-lg font-bold ${state.isScrolled ? 'text-gray-800' : 'text-white'}`}>Jnanasthan</span>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6">
              {['hero', 'about', 'features', 'courses', 'stats', 'testimonials'].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`bg-transparent ${state.activeSection === section ? 'text-sky-500' : state.isScrolled ? 'text-gray-700 ' : 'text-black'} hover:text-sky-400`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Login/Signup buttons */}

            <div className="hidden md:flex items-center space-x-3">
  <button
    className={`px-3 py-1 rounded ${state.isScrolled ? 'text-sky-500 border border-sky-500' : 'text-black border border-white'} hover:bg-sky-500 hover:text-white transition duration-300`}
    onClick={() => {
      window.location.href = '/login';
    }}
  >
    Login
  </button>

  <button
    className="px-3 py-1 rounded bg-sky-500 text-white hover:bg-sky-600 transition duration-300"
    onClick={() => {
      window.location.href = '/signup';
    }}
  >
    Sign Up
  </button>
</div>

            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }))}
                className={`${state.isScrolled ? 'text-gray-800' : 'text-white'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {state.isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {state.isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-2 py-2 px-4">
            <div className="flex flex-col space-y-2">
              {['hero', 'about', 'features', 'courses', 'stats', 'testimonials'].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`${state.activeSection === section ? 'text-sky-500' : 'text-gray-700'} hover:text-sky-400 py-2`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <div className="pt-3 flex flex-col space-y-2">
                <button className="px-3 py-2 rounded border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition duration-300"onClick={() => {
      window.location.href = '/login';
    }}
                  >Login</button>
               
                <button className="px-3 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition duration-300"onClick={() => {
                    window.location.href = '/signup';
                  }}
                  >Sign Up</button>
                
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-violet-500 h-full w-full" />
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="max-w-6xl mx-auto px-4 relative z-10 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                <span className="block">Unlock Your</span>
                <span className="block text-yellow-300">Knowledge Potential</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-gray-100 max-w-lg mx-auto md:mx-0">
                Jnanasthan - Where knowledge meets opportunity. Discover quality courses taught by industry experts.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
                <button 
                  onClick={() => scrollToSection('courses')}
                  className="px-6 py-2 bg-yellow-400 text-gray-900 font-medium rounded-lg hover:bg-yellow-300 transition duration-300"
                >
                  Explore Courses
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, showModal: true }))}
                  className="px-6 py-2 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-sky-500 transition duration-300"
                >
                  Watch Demo
                </button>
              </div>
            </div>

            


            <div className="hidden md:block">
            {/* <img src="https://th.bing.com/th/id/OIP.adljp39tILDtytf2utOMgAHaNF?w=1087&h=1920&rs=1&pid=ImgDetMain"
  alt="Students learning"
  className="h-1/2 w-1/2 rounded-lg shadow-lg"
/> */}

            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path fill="#ffffff" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">About Jnanasthan</h2>
            <div className="mt-2 w-16 h-1 bg-sky-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Empowering Minds Across India</h3>
              <p className="text-gray-600 mb-4">
                Founded in 2020, Jnanasthan (meaning "place of knowledge" in Sanskrit) has quickly grown to become India's premier online learning platform.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission is to democratize quality education and make it accessible to learners across all demographics and geographical locations.
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Quality Assurance</h4>
                    <p className="text-sm text-gray-500">Rigorous standards</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Fast-Track Learning</h4>
                    <p className="text-sm text-gray-500">Efficient skill acquisition</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="/api/placeholder/400/300" alt="About Jnanasthan" className="rounded-lg shadow-md" />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Join 50,000+</p>
                    <p className="text-xs text-gray-500">Learners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Platform Features</h2>
            <div className="mt-2 w-16 h-1 bg-sky-500 mx-auto"></div>
            <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
              Discover what makes Jnanasthan the preferred learning platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {platformFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                <div className="mb-3">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-sky-500 to-violet-500 rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Advanced Learning Technology</h3>
                <p className="text-gray-100 mb-4 text-sm">
                  Our platform leverages AI and machine learning to enhance your learning experience with personalized recommendations.
                </p>
                <button className="px-4 py-2 bg-white text-sky-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300">
                  Learn More
                </button>
              </div>
              <div className="h-48 md:h-64 bg-gray-200"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses Section */}
      <section id="courses" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Courses</h2>
            <div className="mt-2 w-16 h-1 bg-sky-500 mx-auto"></div>
            <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
              Explore our most popular courses taught by industry experts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition duration-300">
                <div className="h-32 bg-gray-200 relative">
                  <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded text-gray-900">
                    {course.level}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-sky-600 font-semibold mb-1">{course.category}</div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm font-medium">{course.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">{(course.students/1000).toFixed(1)}k students</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-3">by {course.instructor}</div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sky-600">{course.price}</span>
                    <button className="px-3 py-1 text-xs font-medium bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-300">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="px-5 py-2 bg-sky-100 text-sky-600 font-medium rounded-lg hover:bg-sky-200 transition duration-300">
              View All Courses
            </button>
          </div>
        </div>
      </section>
      
    


    {/* Statistics Section */}
      <section id="stats" className="py-16 bg-gradient-to-r from-sky-500 to-violet-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Our Impact</h2>
            <div className="mt-2 w-16 h-1 bg-yellow-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6">
              <div className="text-3xl md:text-4xl font-bold text-black mb-1">
                {state.animatedCount.students.toLocaleString()}+
              </div>
              <div className="text-black-300 font-medium">Students</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6">
              <div className="text-3xl md:text-4xl font-bold text-black mb-1">
                {state.animatedCount.courses}+
              </div>
              <div className="text-black-300 font-medium">Courses</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6">
              <div className="text-3xl md:text-4xl font-bold text-black mb-1">
                {state.animatedCount.mentors}+
              </div>
              <div className="text-black-300 font-medium">Expert Mentors</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6">
              <div className="text-3xl md:text-4xl font-bold text-black mb-1">
                {state.animatedCount.satisfaction}%
              </div>
              <div className="text-black-300 font-medium">Satisfaction Rate</div>
            </div>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Enrollment Trends</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={lineChartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="enrolled" stroke="#38bdf8" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="completed" stroke="#4ade80" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Popular Categories</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={barChartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="students" fill="#38bdf8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Student Levels</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Our Students Say</h2>
            <div className="mt-2 w-16 h-1 bg-sky-500 mx-auto"></div>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              </div>
              <div className="text-center mb-6">
                <div className="flex justify-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonials[state.testimonialIndex].text}"</p>
                <h4 className="text-lg font-semibold text-gray-900">{testimonials[state.testimonialIndex].name}</h4>
                <p className="text-gray-500 text-sm">{testimonials[state.testimonialIndex].role}, {testimonials[state.testimonialIndex].company}</p>
              </div>
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setState(prev => ({ ...prev, testimonialIndex: idx }))}
                    className={`w-3 h-3 rounded-full ${idx === state.testimonialIndex ? 'bg-sky-500' : 'bg-gray-300'}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => setState(prev => ({
                  ...prev,
                  testimonialIndex: prev.testimonialIndex === 0 ? testimonials.length - 1 : prev.testimonialIndex - 1
                }))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 mr-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => setState(prev => ({
                  ...prev,
                  testimonialIndex: (prev.testimonialIndex + 1) % testimonials.length
                }))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of students who are already transforming their careers with Jnanasthan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button  className="px-8 py-3 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition duration-300 " onClick={() => {
                    window.location.href = '/signup'}} > 
              Sign Up For Free
            </button>
            <button 
              onClick={() => scrollToSection('courses')}
              className="px-8 py-3 bg-white border border-sky-500 text-sky-500 font-medium rounded-lg hover:bg-sky-50 transition duration-300"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center mr-2">
                  <span className="text-lg font-bold text-white">J</span>
                </div>
                <span className="text-lg font-bold text-white">Jnanasthan</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                India's premier online learning platform for tech skills.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-sky-500 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-sky-500 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-sky-500 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-sky-500 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition duration-300">Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition duration-300">Mentors</a></li>
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition duration-300">Success Stories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition duration-300">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition duration-300">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition duration-300">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition duration-300">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-sky-400 transition duration-300">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
              <p className="text-sm text-gray-400 mb-4">
                Stay updated with our latest courses and offers.
              </p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 rounded-l-lg text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button className="px-3 py-2 bg-sky-500 text-white rounded-r-lg hover:bg-sky-600 transition duration-300" >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Jnanasthan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;