import { ReviewImages } from '@/components/common/modal/image-modal/ReviewImages';
import { IProductDetailsReviews } from '@/types/Product.type';
import { Star } from 'lucide-react';

type Props = {
  data: IProductDetailsReviews[];
};

const ViewReviewDetails = ({ data }: Props) => {
  return (
    <div className='w-full pt-6 '>
      <span className='text-primary'>Reviews:</span>
      {data?.map((review) => (
        <div className='w-full mx-auto shadow-none border-none '>
          <div>
            <p className='text-gray-700 mb-1'>{review.epr_comment}</p>
            <div className='flex items-center mb-4'>
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < review.epr_rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className='ml-2 text-sm text-gray-600'>
                (Rating: {review.epr_rating}/5)
              </span>
            </div>
          </div>

          <ReviewImages
            images={review?.epri_image?.map((item) => ({
              image: item.epri_image,
              image_id: item.epri_image_id,
            }))}
          />
        </div>
      ))}
    </div>
  );
};

export default ViewReviewDetails;
