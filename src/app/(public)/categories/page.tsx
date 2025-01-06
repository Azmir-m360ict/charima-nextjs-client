import { ICategories } from '@/types/Category.type';
import { API_ENDPOINTS } from '@/utils/api-call/api-endpoints';
import { fetchRequest } from '@/utils/fetchApis';
import CategoriesList from './_components/CategoriesList';

type Props = {};

const page = async (props: Props) => {
  const response = await fetchRequest<ICategories[]>(
    API_ENDPOINTS.PRODUCT_CATEGORIES
  );

  const categories = response?.data;

  return (
    <div className='max-w-frame mx-auto px-4 py-12'>
      <div className='space-y-4 mb-16 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
          ALL CATEGORIES
        </h2>
        <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
          Explore our carefully curated collection of premium home decor and
          furniture pieces
        </p>
      </div>

      <CategoriesList categories={categories} />
    </div>
  );
};

export default page;
