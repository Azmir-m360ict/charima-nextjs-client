'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormFieldInput } from '@/components/ui/FormItem';
import {
  ImageUploader,
  imageUploadRules,
} from '@/components/ui/image-uploader';
import { createFormData, getImageLink } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  useGetProfileQuery,
  useUploadProfileDataMutation,
} from '../_components/ProfileApiEndpoints';
import Loading from '@/components/common/Loading';

// Zod schema (copied from your provided schema)
const formSchema = z.object({
  ec_name: z.string().min(1, {
    message: 'First name is required',
  }),

  ec_email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  ec_phone: z.string().min(11, {
    message: 'Mobile number is required',
  }),
  ec_image: imageUploadRules(),
});

type FormValues = z.infer<typeof formSchema>;
export default function UserRegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ec_name: '',
      ec_email: '',
      ec_phone: '',
      ec_image: [],
    },
  });

  const { data } = useGetProfileQuery();
  const res = data?.data;

  useEffect(() => {
    if (res) {
      form.reset({
        ec_email: res?.ec_email,
        ec_name: res?.ec_name,
        ec_phone: res?.ec_phone,
        ec_image: [{ dataURL: getImageLink(res?.ec_image) }],
      });
    }
  }, [res]);

  // UPDATE

  const [updateProfile, { isLoading }] = useUploadProfileDataMutation();

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    const { ec_image, ...rest } = values;

    createFormData(rest, formData);
    if (ec_image) {
      ec_image.forEach((item) => formData.append('ec_image', item.file));
    }

    updateProfile(formData);
  }

  return (
    <div>
      <h3 className='text-2xl font-medium mt-3'>My Account Information</h3>

      <div className=' mt-5'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex space-x-4'>
              <FormFieldInput<FormValues>
                form={form}
                name='ec_name'
                label='First Name'
                placeholder='Jhon'
                type='text'
              />

              <FormFieldInput<FormValues>
                form={form}
                name='ec_email'
                label='Email'
                placeholder='john.doe@example.com'
                type='email'
              />
            </div>

            <FormFieldInput<FormValues>
              form={form}
              name='ec_phone'
              label='Mobile Number'
              placeholder='01234567890'
              type='number'
            />
            <ImageUploader
              control={form.control}
              name='ec_image'
              label='Upload Profile Images'
              description='Upload up to 1 profile images'
              multiple={true}
              maxNumber={1}
            />

            <Button disabled={isLoading} type='submit' className='w-full'>
              {isLoading ? <Loading /> : 'Register'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
