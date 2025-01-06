'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1 flex items-center justify-center text-center'>
          <AlertCircle className='h-12 w-12 text-red-500 mb-2' />
          <CardTitle className='text-2xl font-bold text-gray-900'>
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-gray-500 mt-2'>
            We encountered an unexpected error while processing your request.
          </p>
          {error.message && (
            <p className='mt-2 text-sm text-gray-600 p-3 bg-gray-100 rounded-md'>
              {error.message}
            </p>
          )}
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button onClick={() => reset()} className='w-full sm:w-auto'>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
