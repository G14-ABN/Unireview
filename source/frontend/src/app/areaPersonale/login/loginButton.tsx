import React from 'react';
import { Button } from 'antd';

const GOOGLE_CLIENT_ID = '115683779443-s5j34cf9d1apup77ic1qrq39es70blme.apps.googleusercontent.com'; // Replace with your actual Google Client ID

const LoginButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = `http://localhost:8080/api/auth/google`;
  };

  return <Button onClick={handleLogin}>Login with Google</Button>;
};

export default LoginButton;
