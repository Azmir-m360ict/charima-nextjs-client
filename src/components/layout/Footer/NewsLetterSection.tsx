'use client';
import { Button } from '@/components/ui/button';
import InputGroup from '@/components/ui/input-group';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { useNewLetterMutation } from '@/utils/api-call/commonApisEndpoint';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const NewsLetterSection = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [postEmail, { isLoading, isSuccess }] = useNewLetterMutation();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const subscribe = () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    console.log(email);
    postEmail({ email: email });
  };

  useEffect(() => {
    if (isSuccess) {
      setEmail('');
      toast({
        title: 'Success',
        description: 'You have been subscribed',
      });
    }
  }, [isSuccess]);

  return (
    <div className='relative grid grid-cols-1 md:grid-cols-2 py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-primary rounded-[20px]'>
      <p
        className={cn([
          integralCF.className,
          'font-bold text-[32px] md:text-[40px] text-white mb-9 md:mb-0',
        ])}
      >
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </p>
      <div className='flex items-center'>
        <div className='flex flex-col max-w-[349px] mx-auto'>
          <InputGroup className='flex bg-white mb-[14px]'>
            <InputGroup.Text>
              <Image
                priority
                src='/icons/envelope.svg'
                height={20}
                width={20}
                alt='email'
                className='min-w-5 min-h-5'
              />
            </InputGroup.Text>
            <InputGroup.Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              type='email'
              name='email'
              placeholder='Enter your email address'
              className='bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base'
            />
          </InputGroup>
          {error && <p className=' text-sm mb-2'>{error}</p>}
          <Button
            onClick={subscribe}
            variant='secondary'
            className='text-sm sm:text-base font-medium bg-white h-12 rounded-full px-4 py-3'
            aria-label='Subscribe to Newsletter'
            type='button'
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </Button>
          {isSuccess && (
            <p className='text-green-500 text-sm mt-2'>
              Successfully subscribed!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
