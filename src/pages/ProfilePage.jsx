import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Linkedin, Github, Globe, Code, Mail, Edit, Share2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import './ProfilePage.css'; // Keep the existing CSS file

const ProfilePage = () => {
  const { Userid } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!Userid) {
        console.error('User ID is missing');
        setError('User ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${Userid}`);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [Userid]);

  // Check if the user has a profile and redirect if needed
  useEffect(() => {
    if (!loading && !error && !profile) {
      navigate("/profileForm");
    }
  }, [profile, navigate, loading, error]);

  const handleEditProfile = () => {
    navigate(`/editProfile/${Userid}`);
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Profile link copied to clipboard!");
    setShowShareOptions(false);
  };

  const goBack = () => {
    navigate("/profileForm");
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-50">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
  //         <p className="mt-4 text-gray-600">Loading profile...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">❗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={goBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center justify-center mx-auto"
          >
            <ArrowLeft size={16} className="mr-2" />
            Add Profile 
          </button >
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <button 
            onClick={goBack} 
            className="flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back</span>
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={handleEditProfile}
              className="flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              <Edit size={16} className="mr-1" />
              <span>Edit</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={handleShare}
                className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition"
              >
                <Share2 size={16} className="mr-1" />
                <span>Share</span>
              </button>
              
              {showShareOptions && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden w-48">
                  <button 
                    onClick={copyProfileLink}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Copy profile link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row md:items-end">
              <div className="relative -mt-16 mb-4 md:mb-0">
                {profile.profilePicture ? (
                  <img 
                    src={profile.profilePicture} 
                    alt={`${profile.user.username}'s profile`} 
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-gray-400 text-4xl">
                    {profile.user.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="md:ml-4 flex-grow">
                <h1 className="text-2xl font-bold text-gray-800">{profile.user.username}</h1>
                {profile.location && (
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin size={16} className="mr-1" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            {profile.bio && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">About</h2>
                <p className="text-gray-700">{profile.bio}</p>
              </div>
            )}
            
            {/* You can add more sections here like Projects, Experience, etc. */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Experience</h2>
              <div className="text-gray-500 text-center py-8">
                No experience added yet.
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Links</h2>
              <ul className="space-y-3">
                {profile.linkedin && (
                  <li>
                    <a 
                      href={profile.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-blue-600 transition"
                    >
                      <Linkedin size={18} className="mr-2 text-gray-500" />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                )}
                
                {profile.github && (
                  <li>
                    <a 
                      href={profile.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-blue-600 transition"
                    >
                      <Github size={18} className="mr-2 text-gray-500" />
                      <span>GitHub</span>
                    </a>
                  </li>
                )}
                
                {profile.leetcode && (
                  <li>
                    <a 
                      href={profile.leetcode} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-blue-600 transition"
                    >
                      <Code size={18} className="mr-2 text-gray-500" />
                      <span>LeetCode</span>
                    </a>
                  </li>
                )}
                
                {profile.website && (
                  <li>
                    <a 
                      href={profile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-blue-600 transition"
                    >
                      <Globe size={18} className="mr-2 text-gray-500" />
                      <span>Website</span>
                    </a>
                  </li>
                )}
                
                {!profile.linkedin && !profile.github && !profile.leetcode && !profile.website && (
                  <li className="text-gray-500 text-center py-2">
                    No links added yet.
                  </li>
                )}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact</h2>
              <button className="w-full flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                <Mail size={16} className="mr-2" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ProfilePage;