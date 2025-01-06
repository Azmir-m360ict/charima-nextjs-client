'use client';

import Loading from '@/components/common/Loading';
import { Modal } from '@/components/common/modal/Modal';
import { StarRating } from '@/components/common/StarRating';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormFieldInputTextArea } from '@/components/ui/FormItem';
import {
  ImageUploader,
  imageUploadRules,
} from '@/components/ui/image-uploader';
import { toast } from '@/hooks/use-toast';
import { createFormData } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAddReviewMutation } from './reviewsApiEndpoints';

type Props = {
  order_id: number;
  product_id: number;
  name: string;
};

const formSchema = z.object({
  rating: z
    .number()
    .min(1, {
      message: 'Please select a rating.',
    })
    .max(5),
  comment: z.string().min(10, {
    message: 'Comment must be at least 10 characters.',
  }),
  image: imageUploadRules(2),
});

const AddReview = ({ order_id, product_id, name }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addReview, { isSuccess, isError, isLoading }] = useAddReviewMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      order_id: order_id,
      rating: values.rating,
      product_id: product_id,
      comment: values.comment,
    };

    const formData = new FormData();
    createFormData(body, formData);
    values?.image?.forEach((item) => formData.append('image', item.file));

    await addReview(formData);
  }

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error',
        description: 'Failed to add review',
      });
    } else if (isSuccess) {
      setIsModalOpen(false);
      toast({
        title: 'Success',
        description: 'Review added successfully',
      });
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        children={
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='rating'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Controller
                        name='rating'
                        control={form.control}
                        render={({ field }) => (
                          <StarRating
                            rating={field.value}
                            onRatingChange={(rating) => field.onChange(rating)}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormFieldInputTextArea
                form={form}
                label='Your Review'
                name='comment'
                placeholder='Write your review here...'
                description='Your review helps others make better decisions about products.'
                rows={4}
              />

              <ImageUploader
                control={form.control}
                name='image'
                label='Upload Product Images'
                description='Upload up to 2 product images'
                multiple={true}
                maxNumber={2}
              />

              <div className='flex justify-end'>
                <Button type='submit' disabled={isLoading}>
                  {isLoading ? (
                    <div className='flex gap-1 items-center'>
                      <Loading />
                      Submitting
                    </div>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        }
        description=''
        onSubmit={() => {}}
        title={`Review for ${name}`}
        trigger={<Button size={'sm'}>Add Review </Button>}
      />
    </div>
  );
};

export default AddReview;
