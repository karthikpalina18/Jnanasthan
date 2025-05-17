import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudyMaterialSearch = () => {
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get('/studymaterials');
        console.log('Fetched materials:', res.data);
        // Ensure res.data is an array, else adjust as needed
        setMaterials(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching study materials:', err);
        setMaterials([]); // fallback to empty array
      }
    };

    fetchMaterials();
  }, []);

  const filteredMaterials = materials.filter(material =>
    material.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Study Material List</h2>
      <input
        type="text"
        placeholder="Search by subject"
        className="block w-full p-2 border border-gray-300 rounded mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {filteredMaterials.length > 0 ? (
        filteredMaterials.map((material) => (
          <div key={material._id} className="mb-6 p-4 border rounded shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">{material.subject}</h3>
            {material.units.map((unit, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border p-3 rounded mb-2 bg-white"
              >
                <div>
                  <p className="font-medium">Unit {unit.unitNumber}: {unit.title}</p>
                  <p className="text-sm text-gray-500 truncate">{unit.pdfUrl}</p>
                </div>
                <a
                  href={unit.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  View PDF
                </a>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No study materials available.</p>
      )}
    </div>
  );
};

export default StudyMaterialSearch;
