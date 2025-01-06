'use client';
import Loading from '@/components/common/Loading';
import { FormFieldInput } from '@/components/ui/FormItem';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { site_config } from '@/lib/site_config';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { useChangeForgotPasswordMutation } from '@/utils/api-call/commonApisEndpoint';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type Props = {};

const formSchema = z.object({
  password: z.string().min(1, {
    message: 'Please enter a name.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const NewPasswordPage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [changeNewPassword, { isLoading, isError, isSuccess }] =
    useChangeForgotPasswordMutation();

  const email = searchParams.get('email');
  const token = searchParams.get('token');
  let error = isError;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(values: FormValues) {
    changeNewPassword({ password: values.password, token: token! });
    error = false;
  }

  useEffect(() => {
    if (isSuccess) {
      toast({ title: 'Success', description: 'OTP sent to your email' });
      router.push(`/login`);
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
          <h1 className='text-2xl font-semibold mb-2'>Change your password</h1>
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
              name='password'
              label='Provide a new password '
              placeholder='provide a strong password'
              type='password'
            />

            <Button
              type='submit'
              disabled={isLoading}
              size={'lg'}
              className='w-full bg-black text-white hover:bg-gray-800'
            >
              {isLoading ? <Loading /> : 'Changed password'}
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

export default NewPasswordPage;
