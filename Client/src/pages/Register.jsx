import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const RegistrationPage = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const debateDetails = location.state;
  const { debateId } = useParams(); 
  const [debate, setDebate] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDebate = async () => {
      const res = await axios.get(`/api/debates/${debateId}`);
      setDebate(res.data);
    };
    fetchDebate();
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, [debateId]);

  const handleRegister = async () => {
    try {
      const res = await axios.post(`/api/debates/${debateId}/register`);
      setMessage('Successfully registered for the debate.');
      setTimeout(() => navigate('/registered-events'), 2000); 
    } catch (error) {
      setMessage('Error registering for the debate.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen "> 
      <div className="bg-slate-100 rounded-lg p-9  h-90 w-96 shadow-2xl">
        {debate ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center pb-3 hover:underline">Register for Debate</h2>
            <p className="text-lg text-gray-700 mb-2"><strong>Title: </strong> {debateDetails.title}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Location:</strong> {debateDetails.location}</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Time:</strong> {debateDetails.time}</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Date:</strong> {debateDetails.date}</p>
            <button
              onClick={handleRegister}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:rounded-full transition duration-300"
            >
              Confirm Registration
            </button>

            {message && (
              <p
                className={`mt-4 text-center font-medium ${
                  message.includes('Success') ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message}
              </p>
            )}
          </>
        ) : (
          <p className="text-lg text-gray-700">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;