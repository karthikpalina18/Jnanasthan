import React, { useEffect, useState } from 'react';
import { Clock, Building2, ExternalLink, Award, AlertCircle, Briefcase, Search, GraduationCap, Filter } from 'lucide-react';

function OpportunitiesList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/opportunities');
        if (!res.ok) throw new Error('Failed to fetch data');
        const fetchedData = await res.json();
        setData(fetchedData);
        setError(null);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOpportunities();
  }, []);

  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const endDate = new Date(deadline);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : -1;
  };

  const getUrgencyClass = (daysLeft) => {
    if (daysLeft < 0) return 'text-gray-500';
    if (daysLeft <= 3) return 'text-red-500';
    if (daysLeft <= 7) return 'text-orange-500';
    return 'text-green-500';
  };

  const getTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'job': return <Briefcase className="mr-1" size={16} />;
      case 'internship': return <GraduationCap className="mr-1" size={16} />;
      case 'scholarship': return <Award className="mr-1" size={16} />;
      default: return <Award className="mr-1" size={16} />;
    }
  };

  const filteredAndSortedData = data
    .filter(item => filter === 'all' || item.type?.toLowerCase() === filter)
    .filter(item => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'deadline') {
        const daysLeftA = calculateDaysLeft(a.deadline);
        const daysLeftB = calculateDaysLeft(b.deadline);
        return daysLeftA - daysLeftB;
      } else if (sortBy === 'company') {
        return (a.company || '').localeCompare(b.company || '');
      } else {
        return (a.title || '').localeCompare(b.title || '');
      }
    });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-100 rounded-lg p-6 h-48"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center">
          <AlertCircle className="text-red-500 mr-3" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-red-700">Error loading opportunities</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover Opportunities</h1>
        <p className="text-gray-600 mb-6">Find your next career step, internship, or scholarship opportunity</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search opportunities..." 
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
              <select 
                className="pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-all"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="job">Jobs</option>
                <option value="internship">Internships</option>
                <option value="scholarship">Scholarships</option>
              </select>
            </div>
            
            <select 
              className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-all"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="company">Sort by Company</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedData.length > 0 ? (
            filteredAndSortedData.map((item, idx) => {
              const daysLeft = calculateDaysLeft(item.deadline);
              const urgencyClass = getUrgencyClass(daysLeft);
              
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center">
                        {getTypeIcon(item.type)}
                        {item.type || 'Opportunity'}
                      </span>
                      
                      <div className={`flex items-center ${urgencyClass}`}>
                        <Clock size={16} className="mr-1"/>
                        <span className="text-sm font-medium">
                          {daysLeft > 0 
                            ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left` 
                            : 'Deadline passed'}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <Building2 size={16} className="mr-2"/>
                      <span>{item.company || 'Organization'}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.description || 'No description available'}
                    </p>
                  </div>
                  
                  <div className="mt-auto border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Deadline: {item.deadline ? new Date(item.deadline).toLocaleDateString() : 'Not specified'}
                    </div>
                    
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                    >
                      Apply <ExternalLink size={16} className="ml-1"/>
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 flex items-center justify-center rounded-full mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-1">No opportunities found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
      
      {filteredAndSortedData.length > 0 && (
        <div className="text-center text-gray-500 text-sm">
          Showing {filteredAndSortedData.length} {filteredAndSortedData.length === 1 ? 'opportunity' : 'opportunities'}
        </div>
      )}
    </div>
  );
}

export default OpportunitiesList;