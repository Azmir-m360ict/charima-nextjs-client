'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDeleteQueryParam } from '@/hooks/useDeleteQueryParams';
import { useRouter, useSearchParams } from 'next/navigation';

const SortBy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { deleteQueryParam } = useDeleteQueryParam();

  const handleClick = (e: string) => {
    if (e === 'new-product') {
      deleteQueryParam('sort_by');
      return;
    }

    router.replace(`/shop?sort_by=${e}`);
  };

  return (
    <Select
      defaultValue={searchParams.get('sort_by') || 'new-product'}
      onValueChange={handleClick}
    >
      <SelectTrigger className='font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='new-product'>New Product</SelectItem>
        <SelectItem value='most-popular'>Most Popular</SelectItem>
        <SelectItem value='low-price'>Low Price</SelectItem>
        <SelectItem value='high-price'>High Price</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortBy;
