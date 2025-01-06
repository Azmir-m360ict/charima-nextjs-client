import { cn } from '@/lib/utils';
import { IProductReviewList } from '@/types/Product.type';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { Button } from '../ui/button';
import Rating from '../ui/Rating';
import { ReviewImages } from './modal/image-modal/ReviewImages';
dayjs.extend(relativeTime);

type ReviewCardProps = {
  blurChild?: React.ReactNode;
  isAction?: boolean;
  isDate?: boolean;
  data: IProductReviewList;
  className?: string;
};

const ReviewCard = ({
  blurChild,
  isAction = false,
  isDate = false,
  data,
  className,
}: ReviewCardProps) => {
  return (
    <div
      className={cn([
        'relative bg-white flex flex-col items-start aspect-auto border border-black/10 rounded-[20px] p-6 sm:px-8 sm:py-7 overflow-hidden',
        className,
      ])}
    >
      {blurChild && blurChild}
      <div className='w-full flex items-center justify-between mb-3 sm:mb-4'>
        <Rating
          initialValue={data.rating}
          allowFraction
          SVGclassName='inline-block'
          size={23}
          readonly
        />
        {isAction && (
          <Button variant='ghost' size='icon'>
            <IoEllipsisHorizontal className='text-black/40 text-2xl' />
          </Button>
        )}
      </div>
      <div className='flex w-full justify-between items-center mb-3'>
        <div>
          <div className='flex items-center'>
            <strong className='text-black text-base mr-1 capitalize'>
              {data.customer_name}
            </strong>
            <IoIosCheckmarkCircle className='text-[#01AB31] text-base' />
          </div>
          <p className='text-sm sm:text-base text-black/60'>{data.comment}</p>
        </div>
        {isDate && (
          <p className='text-black/60 text-sm font-medium mt-4 sm:mt-6'>
            Posted on {dayjs(data.created_at).fromNow()}
          </p>
        )}
      </div>

      <ReviewImages
        images={data?.review_images?.map((item) => ({
          image: item.image_name,
          image_id: item.image_id,
        }))}
      />
    </div>
  );
};

export default ReviewCard;
