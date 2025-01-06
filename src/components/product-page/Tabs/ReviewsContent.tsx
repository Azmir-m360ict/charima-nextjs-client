import { useGetProductAllReviewQuery } from '@/app/(private)/user-profile/reviews/_component/reviewsApiEndpoints';
import ReviewCard from '@/components/common/ReviewCard';
import SpinnerbLoader from '@/components/ui/SpinnerbLoader';

interface Props {
  product_id: number;
}

const ReviewsContent = ({ product_id }: Props) => {
  const { data, isLoading } = useGetProductAllReviewQuery({
    product_id: product_id,
  });

  const reviewsData = data?.data;

  return (
    <section>
      <div className='flex items-center justify-between flex-col sm:flex-row mb-5 sm:mb-6'>
        <div className='flex items-center mb-4 sm:mb-0'>
          <h3 className='text-xl sm:text-2xl font-bold text-black mr-2'>
            All Reviews
          </h3>
          <span className='text-sm sm:text-base text-black/60'>
            ({reviewsData?.length ?? 0})
          </span>
        </div>
      </div>

      {isLoading && (
        <SpinnerbLoader className='w-10 border-2 border-gray-300 border-r-gray-600' />
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5 sm:mb-9'>
        {reviewsData?.map((review) => (
          <ReviewCard key={review.id} data={review} isDate />
        ))}
      </div>
    </section>
  );
};

export default ReviewsContent;
