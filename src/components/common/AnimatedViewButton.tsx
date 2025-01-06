import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const AnimatedButton = ({
  children = 'View Details',
  className,
  onClick,
  href,
  ...props
}: Props) => {
  return (
    <Link
      href={href || '#'}
      onClick={onClick}
      className={cn(
        'group relative inline-flex items-center justify-center px-8 py-3',
        'overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-500',
        'text-white font-medium transition-all duration-300',
        'hover:from-purple-700 hover:to-blue-600',
        'focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ',
        className
      )}
      {...props}
    >
      <span className='absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-transform duration-1000 ease-out group-hover:-translate-x-40' />
      <span className='relative flex items-center gap-2'>
        {children}
        <svg
          className='h-5 w-5 transform transition-transform duration-300 ease-out group-hover:translate-x-1'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M14 5l7 7m0 0l-7 7m7-7H3'
          />
        </svg>
      </span>
    </Link>
  );
};
