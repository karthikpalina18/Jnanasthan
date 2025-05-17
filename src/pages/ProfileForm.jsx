import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    bio: '',
    linkedin: '',
    github: '',
    leetcode: '',
    website: '',
    profilePicture: '',
    location: ''
  });
  
  const [token, setToken] = useState(localStorage.getItem('token'));  // Assuming you are storing token in localStorage

  useEffect(() => {
    // Fetch profile data if it exists
    axios.get('http://localhost:5000/api/profile/${userId}', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      setProfile(response.data);
    })
    .catch(error => console.error('Error fetching profile data:', error));
  }, [token]);  // This dependency array ensures that the useEffect runs when the token is available.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // POST request to update profile data
    axios.post('http://localhost:5000/api/profile', profile, {
      headers: {
        Authorization: `Bearer ${token}`,  // Send the token in the header
      }
    })
    .then(response => {
      alert('Profile updated successfully!');
    })
    .catch(error => {
      console.error('Error updating profile:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="linkedin"
        value={profile.linkedin}
        onChange={handleChange}
        placeholder="LinkedIn URL"
      />
      <input
        type="text"
        name="github"
        value={profile.github}
        onChange={handleChange}
        placeholder="GitHub URL"
      />
      <input
        type="text"
        name="leetcode"
        value={profile.leetcode}
        onChange={handleChange}
        placeholder="LeetCode URL"
      />
      <input
        type="text"
        name="website"
        value={profile.website}
        onChange={handleChange}
        placeholder="Personal Website"
      />
      <input
        type="text"
        name="profilePicture"
        value={profile.profilePicture}
        onChange={handleChange}
        placeholder="Profile Picture URL"
      />
      <textarea
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        placeholder="Bio"
      />
      <input
        type="text"
        name="location"
        value={profile.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
