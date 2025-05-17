import { useState } from 'react';
import { UserPlus, Send, Users } from 'lucide-react';

// Function to send connection request (unchanged from your original)
const sendConnectionRequest = async (email) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return alert('You are not authenticated.');
  }

  try {
    // Using a direct fetch implementation since axios might not be available
    const response = await fetch('http://localhost:5000/api/connection/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send request');
    }
    
    return await response.json();
  } catch (err) {
    console.error('Error sending request:', err);
    throw err;
  }
};

// Main Connections component
const Connections = () => {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const handleSendRequest = async () => {
    if (!receiverEmail) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Please enter an email address'
      });
      return;
    }

    setIsLoading(true);
    try {
      await sendConnectionRequest(receiverEmail);
      setNotification({
        show: true,
        type: 'success',
        message: 'Connection request sent successfully!'
      });
      setReceiverEmail('');
    } catch (err) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Failed to send request. Please try again.'
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setNotification({ show: false, type: '', message: '' });
      }, 3000);
    }
  };

  const navigateToConnect = () => {
    window.location.href = '/connect';
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <div className="flex items-center mb-6">
        <Users className="w-6 h-6 text-sky-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Manage Connections</h1>
      </div>

      {notification.show && (
        <div className={`alert mb-4 ${notification.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {notification.message}
        </div>
      )}

      <div className="mb-6">
        <p className="text-gray-600 mb-4">Send a connection request to collaborate with other users.</p>
        
        <div className="flex flex-col sm:flex-row">
          <div className="form-group w-full mb-3 sm:mb-0 sm:mr-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="colleague@example.com"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              className="form-input w-full"
            />
          </div>
          
          <button 
            onClick={handleSendRequest} 
            disabled={isLoading}
            className={`btn mt-6 flex items-center justify-center ${isLoading ? 'btn-secondary' : 'btn-primary'}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="w-4 h-4 border-2 border-white rounded-full animate-spin mr-2 border-t-transparent"></div>
                Sending...
              </span>
            ) : (
              <span className="flex items-center">
                <Send className="w-4 h-4 mr-2" />
                Send Request
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Need to view all your connections?</p>
          <button 
            onClick={navigateToConnect} 
            className="btn btn-secondary flex items-center"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            View Connections
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connections;