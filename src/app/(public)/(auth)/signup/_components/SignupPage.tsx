'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormFieldInput } from '@/components/ui/FormItem';
import { site_config } from '@/lib/site_config';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { useSignUpMutation } from '@/utils/api-call/commonApisEndpoint';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignupPage() {
  const router = useRouter();

  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signUp({
      email: values.email,
      password: values.password,
      name: values.name,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Your account has been created successfully');
      router.push('/login');
    }
  }, [isSuccess]);

  return (
    <div className='w-full max-w-sm'>
      <div className='mb-8'>
        <div className='h-8 w-8'>
          <Link
            href='/'
            className={cn([
              integralCF.className,
              'text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10',
            ])}
          >
            {site_config.site_name}
          </Link>
        </div>
      </div>
      <div className='space-y-4'>
        <div>
          <h1 className='text-2xl font-semibold mb-2'>Create a new account</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormFieldInput<FormValues>
              form={form}
              name='name'
              label='Name'
              placeholder='Shofik Ahammed'
              type='text'
            />
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
              disabled={isLoading}
              type='submit'
              size={'lg'}
              className='w-full bg-black text-white hover:bg-gray-800'
            >
              Sign up
            </Button>
          </form>
        </Form>

        {/* <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div> */}

        {/* <div className='flex space-x-4'>
          <Button variant='outline' className='w-full'>
            <FaGoogle className='mr-2 h-4 w-4' />
            Google
          </Button>
        </div> */}
        <div className='text-center text-sm'>
          Already have account?{' '}
          <Link href='login' className='text-blue-600 hover:underline'>
            Sign-in
          </Link>
        </div>
      </div>
    </div>
  );
}
