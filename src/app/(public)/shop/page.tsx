import BreadcrumbShop from '@/components/shop-page/BreadcrumbShop';
import Filters from '@/components/shop-page/filters';
import MobileFilters from '@/components/shop-page/filters/MobileFilters';
import { FiSliders } from 'react-icons/fi';

import PaginationControl from '@/components/common/pagination/PaginationControl';
import ProductCard from '@/components/common/ProductCard';
import SortBy from '@/components/product-page/Tabs/SortBy';
import { formatQueryParams } from '@/lib/utils';
import { IProducts } from '@/types/Product.type';
import { API_ENDPOINTS } from '@/utils/api-call/api-endpoints';
import { fetchRequest } from '@/utils/fetchApis';

interface Props {
  searchParams: Promise<{
    category: string;
    page: string;
    sort_by: 'most-popular' | 'high-price' | 'low-price';
    minPrice: string;
    maxPrice: string;
    color?: string;
    size?: string;
  }>;
}

const PRODUCTS_PER_PAGE = 10;

export default async function ShopPage({ searchParams }: Props) {
  const query = await searchParams;
  const { sort_by, category, maxPrice, minPrice, color, size } = query;

  const attributeValues = [color, size]
    .filter(Boolean)
    .filter((item) => Number(item));
  const TOP_SELLING = sort_by === 'most-popular' ? true : undefined;

  const SORT_OPTIONS = {
    'high-price': { sortBy: 'ep_sale_price', order: 'desc' },
    'low-price': { sortBy: 'ep_sale_price', order: 'asc' },
    'most-popular': { sortBy: undefined, order: undefined },
  };

  const { sortBy: SORT_BY_PRICE, order: SERIAL_BY } =
    SORT_OPTIONS[sort_by] || {};

  const currentPage = Number(query.page || 1) || 1;
  const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const formate_query = formatQueryParams({
    category,
    skip,
    limit: PRODUCTS_PER_PAGE,
    serialBy: SERIAL_BY,
    shortBy: SORT_BY_PRICE,
    topSelling: TOP_SELLING,
    maxPrice,
    minPrice,
    attributeValues: String(attributeValues.join(',')),
  });

  const response = await fetchRequest<IProducts[]>(
    `${API_ENDPOINTS.PRODUCT_LIST}?${formate_query}`
  );
  const total = response?.total || 0;
  const products = response.data;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <main className='pb-20'>
      <div className='max-w-frame mx-auto px-4 xl:px-0'>
        <hr className='h-[1px] border-t-black/10 mb-5 sm:mb-6' />
        <BreadcrumbShop />
        <div className='flex md:space-x-5 items-start'>
          <div className='hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6'>
            <div className='flex items-center justify-between'>
              <span className='font-bold text-black text-xl'>Filters</span>
              <FiSliders className='text-2xl text-black/40' />
            </div>
            <Filters />
          </div>
          <div className='flex flex-col w-full space-y-5'>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
              <div className='flex items-center justify-between'>
                <h1 className='font-bold text-2xl md:text-[32px]'>Shop</h1>
                <MobileFilters />
              </div>
              <div className='flex flex-col sm:items-center sm:flex-row'>
                <span className='text-sm md:text-base text-black/60 mr-3'>
                  Showing 1-10 of {total} Products
                </span>
                <div className='flex items-center'>
                  Sort by: <SortBy />
                </div>
              </div>
            </div>
            <div className='w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'>
              {products?.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            <hr className='border-t-black/10' />

            <PaginationControl
              currentPage={currentPage}
              category={category}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
