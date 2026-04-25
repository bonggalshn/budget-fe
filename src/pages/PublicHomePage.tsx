import React from 'react';
import Greeting from '../components/Greeting';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const PublicHomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <Greeting className="text-center" />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublicHomePage;