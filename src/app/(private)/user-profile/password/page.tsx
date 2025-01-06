'use client';

import Loading from '@/components/common/Loading';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormFieldInput } from '@/components/ui/FormItem';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useChangePasswordMutation } from '../_components/ProfileApiEndpoints';

type Props = {};

const formSchema = z.object({
  old_password: z.string().min(1, {
    message: 'Please enter old password.',
  }),
  new_password: z.string().min(8, {
    message: 'New password must be minimum 8 character',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const page = (props: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: '',
      old_password: '',
    },
  });

  const [changePassword, { isSuccess, isLoading, isError }] =
    useChangePasswordMutation();

  async function onSubmit(values: FormValues) {
    await changePassword({
      new_password: values.new_password,
      old_password: values.old_password,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: (<span className='text-green-500'>Success</span>) as any,
        description: 'Your password has been successfully changed',
      });
      router.push('/');
    } else if (isError) {
      toast({
        title: (<span className='text-red-500'>Failed</span>) as any,
        description: 'Your old password does not match',
      });
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <h3 className='text-2xl font-medium mt-3'>Change Password</h3>

      <div className='mt-5'>
        <div className='mt-5 max-w-xl'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormFieldInput<FormValues>
                form={form}
                name='old_password'
                label='Old Password'
                placeholder='Provide your old password'
                type='password'
              />

              <FormFieldInput<FormValues>
                form={form}
                name='new_password'
                label='New Password'
                placeholder='Provide your new password'
                type='password'
              />

              <Button disabled={isLoading} type='submit' className='w-full'>
                {isLoading ? <Loading /> : 'Change Password'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default page;
