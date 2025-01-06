import CategoriesSection from '@/components/shop-page/filters/CategoriesSection';
import ColorsSection from '@/components/shop-page/filters/ColorsSection';
import PriceSection from '@/components/shop-page/filters/PriceSection';
import SizeSection from '@/components/shop-page/filters/SizeSection';

const Filters = () => {
  return (
    <>
      <hr className='border-t-black/10' />
      <CategoriesSection />
      <hr className='border-t-black/10' />
      <PriceSection />
      <hr className='border-t-black/10' />
      <ColorsSection />
      <hr className='border-t-black/10' />
      <SizeSection />
      <hr className='border-t-black/10' />
    </>
  );
};

export default Filters;
