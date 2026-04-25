import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

// Define validation schema
const loginSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.identifier, data.password);
      navigate('/home'); // Redirect to authenticated home on success
    } catch (err) {
      // Error handling is managed by AuthContext
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <div className="mt-1">
                <input
                  id="identifier"
                  type="text"
                  {...register('identifier')}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.identifier ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter your username or email"
                  aria-invalid={errors.identifier ? 'true' : 'false'}
                  aria-describedby={errors.identifier ? 'identifier-error' : undefined}
                />
                {errors.identifier && (
                  <ErrorMessage message={errors.identifier.message || ''} />
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter your password"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                {errors.password && (
                  <ErrorMessage message={errors.password.message || ''} />
                )}
              </div>
            </div>
          </div>
          
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {error === 'invalid_credentials' && 'Invalid username/email or password'}
                    {error === 'account_locked' && 'Account is locked. Please contact support.'}
                    {error === 'email_not_verified' && 'Email not verified. Please check your inbox.'}
                    {!['invalid_credentials', 'account_locked', 'email_not_verified'].includes(error) && 'Login failed. Please try again.'}
                  </h3>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <><LoadingSpinner size="sm" /> Signing In...</> : 'Sign In'}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Don't have an account? Register
              </Link>
            </div>
            <div className="text-sm">
              <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                ← Back to Home
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;