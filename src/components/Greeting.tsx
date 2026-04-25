import React from 'react';
import { useAuth } from '../context/AuthContext';

interface GreetingProps {
  className?: string;
}

const Greeting: React.FC<GreetingProps> = ({ className = '' }) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className={`text-center ${className}`}>
      {isAuthenticated && user ? (
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user.username}!
        </h1>
      ) : (
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to Budget App
        </h1>
      )}
      <p className="mt-2 text-gray-600">
        {isAuthenticated 
          ? 'Manage your budget and track your expenses'
          : 'Please login or register to get started'}
      </p>
    </div>
  );
};

export default Greeting;