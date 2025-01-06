'use client';
import Loading from '@/components/common/Loading';
import { FormFieldInput } from '@/components/ui/FormItem';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { site_config } from '@/lib/site_config';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { useMatchOtpMutation } from '@/utils/api-call/commonApisEndpoint';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  otp: z
    .string({
      required_error: 'Please enter a valid otp.',
    })
    .min(6, { message: 'OTP must be at least 6 characters long.' }),
});

type FormValues = z.infer<typeof formSchema>;

const VerifyOtp = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get('email');
  const [matchOTP, { isLoading, isError, isSuccess, data }] =
    useMatchOtpMutation();
  const token = data?.token;
  let error = isError;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  async function onSubmit(values: FormValues) {
    matchOTP({ email: email!, type: 'forget_customer', otp: values.otp });
    error = false;
  }

  useEffect(() => {
    if (isSuccess) {
      toast({ title: 'Success', description: 'OTP has been matched' });
      router.push(`/new-password?email=${email}&token=${token}`);
    }
  }, [isSuccess]);

  return (
    <div className='w-full max-w-sm relative'>
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
          <h1 className='text-2xl font-semibold mb-2'>
            Check your email to get OTP
          </h1>
          {error ? (
            <span className='text-sm text-destructive'>OTP does not match</span>
          ) : (
            ''
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormFieldInput<FormValues>
              form={form}
              name='otp'
              label='Provide OTP'
              placeholder='365...'
              type='text'
            />

            <Button
              type='submit'
              disabled={isLoading}
              size={'lg'}
              className='w-full bg-black text-white hover:bg-gray-800'
            >
              {isLoading ? <Loading /> : 'Submit'}
            </Button>
          </form>
        </Form>

        <div className='text-center text-sm'>
          Login your account?{' '}
          <Link href='/login' className='text-blue-600 hover:underline'>
            Sign-in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
