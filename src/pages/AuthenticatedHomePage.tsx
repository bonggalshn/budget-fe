import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const AuthenticatedHomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.username || 'User'}</h1>
            <p className="mt-2 text-sm text-gray-600">
              Here's your personalized budget dashboard
            </p>
          </div>
          <div>
            <Button
              variant="secondary"
              size="md"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/dashboard')}
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                View your financial overview and key metrics
              </p>
            </div>
          </div>
          
          <div
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/transactions')}
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Transactions</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage and categorize your transactions
              </p>
            </div>
          </div>
          
          <div
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/budgets')}
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Budget Overview</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Track your budget categories and spending
              </p>
            </div>
          </div>
          
          <div
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/reports')}
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Reports</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Generate financial reports and insights
              </p>
            </div>
          </div>
          
          <div
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/goals')}
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Financial Goals</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Set and track your savings goals
              </p>
            </div>
          </div>
          
          <div
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/settings')}
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage your account preferences
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => navigate('/transactions/add')}
              >
                Add Transaction
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => navigate('/budgets/create')}
              >
                Create Budget
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => navigate('/goals/add')}
              >
                Add Goal
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => navigate('/import')}
              >
                Import Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedHomePage;