import React, { useState } from 'react';
import StudyMaterialSearch from './StudyMaterialSearch'; // adjust path if necessary

const StudyMaterialPage = () => {
  const [subject, setSubject] = useState('');
  const [units, setUnits] = useState([{ unitNumber: 1, title: '', pdfUrl: '' }]);

  const handleUnitChange = (index, field, value) => {
    const updated = [...units];
    updated[index][field] = value;
    setUnits(updated);
  };

  const addUnit = () => {
    setUnits([...units, { unitNumber: units.length + 1, title: '', pdfUrl: '' }]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/studymaterials/add', { subject, units });
      alert('Study Material added!');
    } catch (err) {
      alert('Error adding material');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Study Material</h2>
        <input
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
        {units.map((unit, idx) => (
          <div key={idx} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Title"
              value={unit.title}
              onChange={e => handleUnitChange(idx, 'title', e.target.value)}
            />
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="PDF URL"
              value={unit.pdfUrl}
              onChange={e => handleUnitChange(idx, 'pdfUrl', e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addUnit}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
        >
          + Add Unit
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>

      {/* 👇 Replacing the material card list with the new component */}
      <StudyMaterialSearch />
    </>
  );
};

export default StudyMaterialPage;
