import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type CategoriesStyleProps = {
  title: string;
  url: string;
  className?: string;
  style?: React.CSSProperties;
  imageUrl?: string;
  index: number;
};

const CategoriesStyleCard = ({
  title,
  url,
  className,
  style,
  imageUrl,
  index,
}: CategoriesStyleProps) => {
  return (
    <div className='group relative overflow-hidden'>
      <Link
        href={url}
        className='block relative w-full h-[350px] rounded-2xl overflow-hidden'
      >
        <div
          className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
          style={style}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80' />
        <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8'>
          <h3 className='text-2xl md:text-3xl font-bold text-white tracking-wide'>
            {title}
          </h3>
          <div className='mt-4 flex items-center text-white/90 text-sm font-medium'>
            <span className='mr-2'>Explore Collection</span>
            <svg
              className='w-4 h-4 transform transition-transform group-hover:translate-x-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
  return (
    <Link
      href={url}
      className={cn([
        'group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl',
        'aspect-[4/5] w-full',
        className,
      ])}
    >
      <div
        className='absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-110'
        style={style}
      />
      <div className='absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 group-hover:bg-opacity-50' />
      <div className='absolute inset-0 flex items-end p-6'>
        <h3 className='text-2xl font-bold text-white transition-all duration-300 group-hover:translate-y-[-8px]'>
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoriesStyleCard;
