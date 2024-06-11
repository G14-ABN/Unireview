import React from 'react';
import { Button } from 'antd';

const GoogleLoginComponent: React.FC = () => {
  const handleLogin = () => {
    // Redirect to the Google OAuth login page
    window.location.href = 'http://localhost:8080/auth/google';
  };

  return (
    <div>
      <Button onClick={handleLogin}>Login with Google</Button>
    </div>
  );
};

export default GoogleLoginComponent;
