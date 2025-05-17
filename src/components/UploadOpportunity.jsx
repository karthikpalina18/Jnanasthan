// components/UploadOpportunity.js
import React, { useState } from 'react';
import axios from 'axios';

function UploadOpportunity() {
  const [formData, setFormData] = useState({
    title: '', type: 'Internship', description: '',
    company: '', link: '', deadline: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/opportunities/upload', formData);
    alert('Uploaded successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <select name="type" onChange={handleChange}>
        <option>Internship</option><option>Job</option>
        <option>Webinar</option><option>Hackathon</option><option>Other</option>
      </select>
      <input name="company" placeholder="Company" onChange={handleChange} />
      <input name="link" placeholder="Application Link" onChange={handleChange} />
      <input name="deadline" type="date" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}
export default UploadOpportunity;
