import React, { useState } from 'react';
import API from '../api';

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    roadmap: '',
    industryBenefits: '',
    videos: '',
    notes: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...formData,
      videos: formData.videos.split(',').map(v => v.trim()),
      notes: formData.notes.split(',').map(n => n.trim())
    };
    try {
      await API.post('/courses/add', payload);
      alert('Course added successfully!');
      setFormData({
        title: '',
        description: '',
        roadmap: '',
        industryBenefits: '',
        videos: '',
        notes: ''
      });
    } catch (err) {
      alert('Failed to add course');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { name: 'title', label: 'Course Title' },
        { name: 'description', label: 'Description' },
        { name: 'roadmap', label: 'Roadmap' },
        { name: 'industryBenefits', label: 'Industry Benefits' },
        { name: 'videos', label: 'Video Links (comma separated)' },
        { name: 'notes', label: 'Notes Links (comma separated)' }
      ].map(({ name, label }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
            {label}
          </label>
          <input
            type="text"
            name={name}
            id={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={label}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <div className="md:col-span-2 mt-2">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
        >
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Course
        </button>
      </div>
    </form>
  );
};

export default AddCourseForm;
