import { AnimatedButton } from '@/components/common/AnimatedViewButton';
import { cn, getImageLink } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { ICategories } from '@/types/Category.type';
import { API_ENDPOINTS } from '@/utils/api-call/api-endpoints';
import { fetchRequest } from '@/utils/fetchApis';
import CategoriesStyleCard from './CategoriesStyleCard';

const CategoryStyle = async () => {
  const response = await fetchRequest<ICategories[]>(
    API_ENDPOINTS.PRODUCT_CATEGORIES
  );

  const categories = response?.data?.slice(0, 6);

  return (
    <div className='px-4 xl:px-0'>
      <section className='max-w-frame mx-auto bg-[#F0F0F0] px-6 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center'>
        <div className='flex justify-between items-center  mb-8 md:mb-14'>
          <h2
            className={cn([
              integralCF.className,
              'text-[32px] leading-[36px] md:text-5xl capitalize',
            ])}
          >
            BROWSE BY CATEGORIES
          </h2>

          <AnimatedButton
            href='/categories'
            className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 '
          >
            ALL CATEGORIES
          </AnimatedButton>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5'>
          {categories?.map((category: ICategories, index: number) => {
            return (
              <CategoriesStyleCard
                key={index}
                title={category.cate_name_en}
                url={`/shop?category=${category.cate_slug}`}
                index={index}
                className={cn(
                  'md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] !h-[350px] object-cover'
                )}
                style={{
                  backgroundImage: `url(${getImageLink(category.cate_image)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CategoryStyle;
