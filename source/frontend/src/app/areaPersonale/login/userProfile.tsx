import React from 'react';

interface UserProfileProps {
  user: {
    email: string;
    nomeUtente: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
      <p>Name: {user.nomeUtente}</p>
    </div>
  );
};

export default UserProfile;
