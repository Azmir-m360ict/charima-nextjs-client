'use client';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

const Custom404 = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-4'>
      <div
        className={`text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Warning Icon */}
        <div className='mb-8 animate-bounce'>
          <AlertTriangle className='w-16 h-16 text-blue-500 mx-auto' />
        </div>

        {/* Error Code */}
        <div className='relative mb-4'>
          <h1 className='text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500'>
            404
          </h1>
          <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-semibold'>
            Error Code
          </div>
        </div>

        {/* Error Messages */}
        <div className='space-y-4 mb-8'>
          <h2 className='text-2xl font-bold text-gray-800'>Page Not Found</h2>
          <div className='max-w-md mx-auto space-y-2'>
            <p className='text-gray-600'>
              The page you're looking for seems to have vanished into the
              digital void.
            </p>
            <div className='bg-blue-50 p-4 rounded-lg border border-blue-100'>
              <p className='text-blue-700 text-sm font-mono'>
                CAUTION: This page does not exist in the current directory
                structure. Please verify the URL and try again.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details Accordion */}
        <div className='mb-8 max-w-md mx-auto'>
          <details className='bg-gray-50 rounded-lg border border-gray-200'>
            <summary className='cursor-pointer p-4 text-gray-700 hover:text-gray-900'>
              Technical Details
            </summary>
            <div className='p-4 text-sm text-gray-600 border-t border-gray-200'>
              <ul className='space-y-2 text-left'>
                <li>• Request URL path not found in routes</li>
                <li>• HTTP Status: 404 Not Found</li>
              </ul>
            </div>
          </details>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={() => (window.location.href = '/')}
            className='group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
          >
            <Home className='w-5 h-5 group-hover:rotate-12 transition-transform' />
            Return Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className='group flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg'
          >
            <RefreshCcw className='w-5 h-5 group-hover:rotate-180 transition-transform duration-500' />
            Try Again
          </button>
        </div>
      </div>

      {/* Background Decoration */}
      <div className='fixed inset-0 -z-10 overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#EEF2FF,transparent)]'></div>
        <div className='absolute w-full h-full opacity-30'>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className='absolute bg-blue-200 w-1 h-1 rounded-full'
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Custom404;
