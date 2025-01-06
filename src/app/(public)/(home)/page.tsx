import ProductListSec from '@/components/common/ProductListSec';
import CategoryStyle from '@/components/homepage/CategoriesStyle';
import Hero from '@/components/homepage/Hero/Hero';
import Reviews from '@/components/homepage/Reviews';
import { site_config } from '@/lib/site_config';

export default async function Home() {
  return (
    <>
      <Hero />

      <main className='my-[50px] sm:my-[72px]'>
        <ProductListSec title='NEW ARRIVALS' viewAllLink='/shop' />
        <div className='max-w-frame mx-auto px-4 xl:px-0'>
          <hr className='h-[1px] border-t-black/10 my-10 sm:my-16' />
        </div>
        <div className='mb-[50px] sm:mb-20'>
          <ProductListSec
            title='TOP SELLING'
            viewAllLink='/shop?sort_by=most-popular'
          />
        </div>
        <div className='mb-[50px] sm:mb-20'>
          <CategoryStyle />
        </div>
        <Reviews data={site_config.reviewsData} />
      </main>
    </>
  );
}
