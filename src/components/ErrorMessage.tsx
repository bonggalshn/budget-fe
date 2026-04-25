import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <p className="mt-2 text-sm text-red-600" id="error-message">
      {message}
    </p>
  );
};

export default ErrorMessage;