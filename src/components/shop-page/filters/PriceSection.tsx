'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { createQueryString } from '@/hooks/useCustomQueryParams';
import { useDeleteQueryParam } from '@/hooks/useDeleteQueryParams';
import { site_config } from '@/lib/site_config';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';

const PriceSection = () => {
  const { maxPrice, minPrice } = site_config;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const min_price = Number(searchParams.get('minPrice'));
  const max_price = Number(searchParams.get('maxPrice'));

  const { deleteQueryParam } = useDeleteQueryParam();

  const [priceRange, setPriceRange] = useState<any>([minPrice, maxPrice]);

  const handleSliderChange = (value: number | number[]) => {
    setPriceRange(value);
  };

  const handleAfterChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      if (minPrice === value[0] && maxPrice === value[1]) {
        deleteQueryParam('minPrice');
        deleteQueryParam('maxPrice');
      } else {
        router.replace(
          pathname +
            '?' +
            createQueryString(params, 'minPrice', value[0].toString())
        );
        router.replace(
          pathname +
            '?' +
            createQueryString(params, 'maxPrice', value[1].toString())
        );
      }
    }
  };

  useEffect(() => {
    if (min_price && max_price) setPriceRange([min_price, max_price]);
    else if (max_price) setPriceRange([site_config.minPrice, max_price]);
    else if (min_price) setPriceRange([min_price, site_config.maxPrice]);
  }, [max_price, min_price]);

  return (
    <Accordion type='single' collapsible defaultValue='filter-price'>
      <AccordionItem value='filter-price' className='border-none'>
        <AccordionTrigger className='text-black font-bold text-xl hover:no-underline p-0 py-0.5'>
          Price
        </AccordionTrigger>
        <AccordionContent className='pt-4' contentClassName='overflow-visible'>
          <Slider
            range
            min={0}
            max={100000}
            value={priceRange}
            onChange={handleSliderChange}
            onAfterChange={(e) => handleAfterChange(e)}
          />
          <div className='flex justify-between mt-2 text-sm'>
            <span>Min: {priceRange[0].toLocaleString()}</span>
            <span>Max:{priceRange[1].toLocaleString()}</span>
          </div>
          <div className='mb-3' />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
