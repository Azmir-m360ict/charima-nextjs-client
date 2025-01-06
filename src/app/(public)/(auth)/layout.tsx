import React from 'react';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className='min-h-[100vh] flex'>
      <div className='hidden lg:block lg:flex-1 relative overflow-hidden  '>
        <div className='relative h-full flex flex-col items-center justify-center text-white text-center'>
          <img
            src='https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt='Dashboard preview'
            className='h-full'
          />
        </div>
      </div>

      <div className='w-full lg:flex-1 border flex items-center justify-center px-5 '>
        {children}
      </div>
    </div>
  );
};

export default layout;
