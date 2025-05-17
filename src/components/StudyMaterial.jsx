
import React, { useEffect, useState } from 'react';
import { BookOpen, FileText, Loader2, ChevronDown, ChevronRight } from 'lucide-react';

export default function StudyMaterial() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch subjects on component mount
    setLoading(true);
    fetch('http://localhost:5000/api/studymaterials/subjects')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch subjects');
        return res.json();
      })
      .then(data => {
        setSubjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching subjects:', err);
        setError('Unable to load subjects. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleSubjectChange = (subject) => {
    if (!subject) {
      setSelectedSubject('');
      setUnits([]);
      return;
    }

    setSelectedSubject(subject);
    setLoading(true);
    
    fetch(`http://localhost:5000/api/studymaterials/${subject}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch units');
        return res.json();
      })
      .then(data => {
        setUnits(data.units || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching units:', err);
        setError(`Unable to load data for ${subject}. Please try again later.`);
        setLoading(false);
      });
  };

  const toggleUnit = (idx) => {
    setExpandedUnit(expandedUnit === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-8 border-b pb-4">
        <BookOpen className="text-indigo-600 mr-3" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Study Materials</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select a subject to explore
        </label>
        <div className="relative">
          <select
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((subject, idx) => (
              <option key={idx} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )}

      {!loading && selectedSubject && units.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <h3 className="text-xl font-semibold text-indigo-700">{selectedSubject}</h3>
            <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {units.length} {units.length === 1 ? 'unit' : 'units'}
            </span>
          </div>
          
          <div className="space-y-3">
            {units.map((unit, idx) => (
              <div key={idx} className="border border-gray-200 rounded-md bg-white overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleUnit(idx)}
                >
                  <div className="flex items-center">
                    {expandedUnit === idx ? 
                      <ChevronDown className="text-gray-500 mr-2" size={18} /> : 
                      <ChevronRight className="text-gray-500 mr-2" size={18} />
                    }
                    <h4 className="font-medium text-gray-800">{unit.unitTitle}</h4>
                  </div>
                </div>
                
                {expandedUnit === idx && (
                  <div className="px-4 pb-4 pt-1">
                    <div className="flex items-center text-sm p-2 bg-gray-50 rounded border border-gray-100">
                      <FileText className="text-indigo-500 mr-2" size={16} />
                      <a 
                        href={unit.pdfUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 hover:underline flex-1"
                      >
                        View or download materials
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && selectedSubject && units.length === 0 && (
        <div className="bg-yellow-50 p-4 rounded-md text-center">
          <p className="text-yellow-700">No study materials available for this subject yet.</p>
        </div>
      )}

      {!loading && !selectedSubject && !error && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BookOpen className="mx-auto text-gray-400" size={48} />
          <p className="mt-4 text-gray-600">Select a subject to view available study materials</p>
        </div>
      )}
    </div>
  );
}

// export default StudyMaterial;
