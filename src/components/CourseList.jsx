import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import { BookOpen, Clock, Briefcase, ChevronRight, Search } from 'lucide-react';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get('/courses');
        setCourses(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = ['All', 'Programming', 'Design', 'Business', 'Data Science'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-64 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-60 w-full max-w-2xl bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Our Courses</h1>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Course Count */}
      <p className="text-gray-600 mb-6">Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}</p>
      
      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div 
              key={course._id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div 
                className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4"
              >
                <BookOpen className="text-white" size={48} />
              </div>
              
              <div className="p-6 flex-grow">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                
                <div className="flex items-center text-gray-500 mb-2">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm">{course.duration || '6 weeks'}</span>
                </div>
                
                <div className="flex items-center text-gray-500">
                  <Briefcase size={16} className="mr-2" />
                  <span className="text-sm truncate">{course.industryBenefits || 'Enhance your career prospects'}</span>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-100">
                <Link 
                  to={`/courses/${course._id}`}
                  className="flex justify-between items-center text-blue-600 font-medium group hover:text-blue-800 transition-colors"
                >
                  View Course Details
                  <ChevronRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-800">No courses found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria</p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseList;