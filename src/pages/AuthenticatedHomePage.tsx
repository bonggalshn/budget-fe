import React from 'react';
import Greeting from '../components/Greeting';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const AuthenticatedHomePage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <Greeting className="text-center" />
        
        <div className="space-y-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => alert('Dashboard feature coming soon!')}
          >
            Go to Dashboard
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => alert('Transactions feature coming soon!')}
          >
            View Transactions
          </Button>
          
          <Button
            variant="danger"
            size="lg"
            fullWidth
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedHomePage;