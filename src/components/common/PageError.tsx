import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
type Props = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

const PageError = ({ error, reset }: Props) => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg'>
        <div className='flex flex-col items-center'>
          <AlertCircle className='h-16 w-16 text-red-500 mb-4' />
          <h1 className='text-3xl font-bold text-gray-800 mb-2 text-center'>
            Oops! Something went wrong
          </h1>
          <p className='text-gray-600 text-center mb-6'>
            We apologize for the inconvenience. An unexpected error has
            occurred.
          </p>
          <div className='flex space-x-4'>
            <Button
              onClick={reset}
              variant='outline'
              className='flex items-center'
            >
              <RefreshCw className='mr-2 h-4 w-4' />
              Try again
            </Button>
            <Button
              onClick={() => (window.location.href = '/')}
              variant='default'
              className='flex items-center'
            >
              <Home className='mr-2 h-4 w-4' />
              Go to Homepage
            </Button>
          </div>
          {error.digest && (
            <p className='mt-4 text-sm text-gray-500'>
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageError;
