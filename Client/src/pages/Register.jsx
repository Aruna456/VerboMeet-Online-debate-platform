import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const { debateId } = useParams(); // Debate ID from the route
  const [debate, setDebate] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch debate details by ID
    const fetchDebate = async () => {
      const res = await axios.get(`/api/debates/${debateId}`);
      setDebate(res.data);
    };
    fetchDebate();
  }, [debateId]);

  const handleRegister = async () => {
    try {
      const res = await axios.post(`/api/debates/${debateId}/register`);
      setMessage('Successfully registered for the debate.');
      setTimeout(() => navigate('/registered-events'), 2000); // Redirect to registered events after 2 seconds
    } catch (error) {
      setMessage('Error registering for the debate.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        {debate ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Register for Debate</h2>
            <p className="text-lg text-gray-700 mb-2"><strong>Title:</strong> {debate.title}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Location:</strong> {debate.location}</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Time:</strong> {debate.time}</p>

            <button
              onClick={handleRegister}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
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
