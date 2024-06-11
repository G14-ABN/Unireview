import React, { useEffect, useState } from 'react';

const ProtectedRoute: React.FC = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:8080/api/auth/test', true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setMessage(response.message);
        } else {
          console.error('Error fetching protected data', xhr.statusText);
        }
      };
      xhr.onerror = () => {
        console.error('Request failed');
      };
      xhr.send();
    } else {
      setMessage('No token found');
    }
  }, []);

  return <div>{message}</div>;
};

export default ProtectedRoute;
