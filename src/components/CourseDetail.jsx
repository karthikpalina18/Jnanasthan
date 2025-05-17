import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Video, FileText, ChevronRight, Award, Calendar, Clock, User } from 'lucide-react';
import API from '../api';
import '../index.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    API.get(`/courses/${id}`)
      .then(res => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching course:", err);
        setError("Failed to load course. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  const extractYouTubeID = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-6 rounded-lg">
        <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-indigo-700 rounded-xl p-8 mb-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg opacity-90 mb-6">{course.description}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              {course.instructor && (
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  <span>Instructor: {course.instructor}</span>
                </div>
              )}
              {course.duration && (
                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  <span>{course.duration}</span>
                </div>
              )}
              {course.lastUpdated && (
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>Updated: {course.lastUpdated}</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center md:justify-end">
            {course.badge && (
              <div className="flex flex-col items-center">
                <Award size={80} className="text-yellow-300" />
                <span className="mt-2 font-semibold">{course.badge}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto mb-8 border-b">
        <button 
          className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          <BookOpen size={16} className="mr-2" />
          Overview
        </button>
        <button 
          className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'videos' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
          onClick={() => setActiveTab('videos')}
        >
          <Video size={16} className="mr-2" />
          Videos {course.videos && `(${course.videos.length})`}
        </button>
        <button 
          className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'notes' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
          onClick={() => setActiveTab('notes')}
        >
          <FileText size={16} className="mr-2" />
          Notes {course.notes && `(${course.notes.length})`}
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Roadmap Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                <ChevronRight size={20} className="mr-2 text-blue-500" />
                Learning Roadmap
              </h3>
              <div className="bg-blue-50 p-5 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{course.roadmap}</p>
              </div>
            </div>

            {/* Industry Benefits Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                <ChevronRight size={20} className="mr-2 text-blue-500" />
                Industry Benefits
              </h3>
              <div className="bg-green-50 p-5 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{course.industryBenefits}</p>
              </div>
            </div>
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
              <Video size={20} className="mr-2 text-blue-500" />
              Course Videos
            </h3>
            
            {course.videos && course.videos.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {course.videos.map((url, index) => {
                  const videoId = extractYouTubeID(url);
                  return videoId ? (
                    <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          className="w-full h-64"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`Course Video ${index + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-medium">Video {index + 1}</h4>
                        <p className="text-sm text-gray-500 mt-1">Part of {course.title}</p>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="bg-red-50 p-4 rounded-lg">
                      <p className="text-red-600">Invalid YouTube URL: {url}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Video size={48} className="mx-auto mb-4 opacity-30" />
                <p>No videos available for this course yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
              <FileText size={20} className="mr-2 text-blue-500" />
              Course Notes & Resources
            </h3>
            
            {course.notes && course.notes.length > 0 ? (
              <div className="space-y-6">
                {course.notes.map((pdfUrl, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                      <h4 className="font-medium">Note Document {index + 1}</h4>
                      <a 
                        href={pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm flex items-center"
                      >
                        Open in new tab
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                    <iframe
                      src={pdfUrl}
                      className="w-full h-96"
                      title={`PDF Note ${index + 1}`}
                    ></iframe>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText size={48} className="mx-auto mb-4 opacity-30" />
                <p>No notes available for this course yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;