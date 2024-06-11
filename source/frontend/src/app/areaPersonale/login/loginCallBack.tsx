import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('authToken', token);
      navigate('/protected'); // Redirect to a protected route
    } else {
      console.error('No token found in URL');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
