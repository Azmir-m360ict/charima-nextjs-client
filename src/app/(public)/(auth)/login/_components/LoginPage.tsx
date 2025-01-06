'use client';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormFieldInput } from '@/components/ui/FormItem';
import { site_config } from '@/lib/site_config';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { doCredentialLogin, SocialLogin } from '@/utils/action';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  session: Session | null;
}

export default function LoginPage({ session }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect_to = searchParams.get('redirect') || '';

  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError('');
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);

      await doCredentialLogin({ formData, redirectTo: redirect_to });

      // if (!is_user) {
      //   if (redirect_to) router.replace(`/${redirect_to}`);
      //   else router.replace('/');
      // }
    } catch (e) {
      console.log({ e });

      setError('Email or password is incorrect');
    }
  }

  return (
    <div className='w-full max-w-sm relative'>
      <div className='mb-8'>
        <div className='h-8 w-8'>
          <Link
            href='/'
            className={cn([
              integralCF.className,
              'text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10 text-primary',
            ])}
          >
            {site_config.site_name}
          </Link>
        </div>
      </div>
      <span className='absolute top-10 right-0 text-red-600'>{error}</span>
      <div className='space-y-4'>
        <div>
          <h1 className='text-2xl font-semibold mb-2'>Login account</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormFieldInput<FormValues>
              form={form}
              name='email'
              label='Email'
              placeholder='mail@example.com'
              type='email'
            />
            <FormFieldInput<FormValues>
              form={form}
              name='password'
              label='Password'
              type='password'
            />
            <Button
              type='submit'
              size={'lg'}
              className='w-full bg-black text-white hover:bg-gray-800'
            >
              Sign in
            </Button>
          </form>
        </Form>

        <div className='text-center'>
          <Link
            href='/forgot-password'
            className='text-sm text-primary hover:underline'
          >
            Forgot your password?
          </Link>
        </div>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='flex space-x-4'>
          <Button
            onClick={() => SocialLogin('google', redirect_to)}
            variant='outline'
            className='w-full'
          >
            <FaGoogle className='mr-2 h-4 w-4' />
            Google
          </Button>
        </div>
        <div className='text-center text-sm'>
          Don't have any account?{' '}
          <Link href='signup' className='text-blue-600 hover:underline'>
            Sign-up
          </Link>
        </div>
      </div>
    </div>
  );
}
