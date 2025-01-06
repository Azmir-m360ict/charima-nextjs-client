import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn, formatQueryParams } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { API_ENDPOINTS } from '@/utils/api-call/api-endpoints';
import { fetchRequest } from '@/utils/fetchApis';
import Link from 'next/link';
import { IProducts } from '../../types/Product.type';
import ProductCard from './ProductCard';

type ProductListSecProps = {
  title?: 'TOP SELLING' | 'NEW ARRIVALS';
  viewAllLink?: string;
  relatedTag?: string;
};

const ProductListSec = async ({
  title,
  viewAllLink,
  relatedTag,
}: ProductListSecProps) => {
  const formate_query = formatQueryParams({
    topSelling: title === 'TOP SELLING' ? true : undefined,
    tag: relatedTag ? relatedTag : undefined,
    skip: 0,
    limit: 6,
  });

  const response = await fetchRequest<IProducts[]>(
    `${API_ENDPOINTS.PRODUCT_LIST}?${formate_query}`
  );
  const products = response.data;

  return (
    <section className='max-w-frame mx-auto text-center'>
      <h2
        className={cn([
          integralCF.className,
          'text-[32px] md:text-5xl mb-8 md:mb-14 capitalize',
        ])}
      >
        {title}
      </h2>
      <div>
        <Carousel
          opts={{
            align: 'start',
          }}
          className='w-full mb-6 md:mb-9'
        >
          <CarouselContent className='mx-4 xl:mx-0 space-x-4 sm:space-x-5'>
            {products?.map((product) => (
              <CarouselItem
                key={product.id}
                className='w-full max-w-[198px] sm:max-w-[295px] pl-0'
              >
                <ProductCard data={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {viewAllLink && (
          <div className='w-full px-4 sm:px-0 text-center'>
            <Link
              href={viewAllLink}
              className='w-full inline-block sm:w-[218px] px-[54px] py-4 border rounded-full hover:bg-primary hover:text-white text-black transition-all font-medium text-sm sm:text-base border-black/10'
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListSec;
