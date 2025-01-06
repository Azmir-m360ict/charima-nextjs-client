'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useCustomQueryParams } from '@/hooks/useCustomQueryParams';
import { cn, separateAttribute } from '@/lib/utils';
import { useGetAllAttributesQuery } from '@/utils/api-call/commonApisEndpoint';
import { useEffect, useState } from 'react';

const SizeSection = () => {
  const [selected, setSelected] = useState<number | string>('');

  const { handleCheckboxChange, queryParam, deleteQueryParam } =
    useCustomQueryParams(null, 'size');

  const { data } = useGetAllAttributesQuery();
  const attribute = data?.data?.attributes;

  const sizeAttributes = separateAttribute(attribute, 'Size');

  const handleSelect = (data: number) => {
    handleCheckboxChange(String(data));
    if (data === selected) return setSelected('');
    setSelected(data);
  };

  useEffect(() => {
    if (queryParam) {
      setSelected(Number(queryParam));
    }
  }, [queryParam]);

  return (
    <Accordion type='single' collapsible defaultValue='filter-size'>
      <AccordionItem value='filter-size' className='border-none'>
        <AccordionTrigger className='text-black font-bold text-xl hover:no-underline p-0 py-0.5'>
          Size
        </AccordionTrigger>
        <AccordionContent className='pt-4 pb-0'>
          <div className='flex items-center flex-wrap'>
            {sizeAttributes?.map((item, index) => (
              <Button
                key={index}
                type='button'
                className={cn([
                  'bg-[#F0F0F0] m-1 flex items-center justify-center px-5 py-2.5 text-sm rounded-full max-h-[39px] text-black hover:text-white',
                  selected === item.av_id &&
                    'bg-primary font-medium text-white ring-2 ring-offset-2',
                ])}
                onClick={() => handleSelect(item.av_id)}
              >
                {item.av_value}
              </Button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
