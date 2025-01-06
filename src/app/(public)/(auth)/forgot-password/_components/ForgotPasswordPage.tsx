'use client';
import Loading from '@/components/common/Loading';
import { FormFieldInput } from '@/components/ui/FormItem';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { site_config } from '@/lib/site_config';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { useSendOtpMutation } from '@/utils/api-call/commonApisEndpoint';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type Props = {};

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordPage = (props: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [setOtp, { isLoading, isError, isSuccess }] = useSendOtpMutation();
  let error = isError;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setEmail(values.email);
    setOtp({ email: values.email, type: 'forget_customer' });
    error = false;
  }

  useEffect(() => {
    if (isSuccess) {
      toast({ title: 'Success', description: 'OTP sent to your email' });
      router.push(`/verify-otp?email=${email}`);
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
      {/* <span className='absolute top-10 right-0 text-red-600'>{error}</span> */}
      <div className='space-y-4'>
        <div>
          <h1 className='text-2xl font-semibold mb-2'>Forgot Password ?</h1>
          {error ? (
            <span className='text-sm text-destructive'>
              Something happened wrong, try again letter
            </span>
          ) : (
            ''
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormFieldInput<FormValues>
              form={form}
              name='email'
              label='Provide your email'
              placeholder='mail@example.com'
              type='email'
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

export default ForgotPasswordPage;
