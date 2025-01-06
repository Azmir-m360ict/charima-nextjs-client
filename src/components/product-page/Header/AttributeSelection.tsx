'use client';

import { Button } from '@/components/ui/button';
import { setVariation } from '@/lib/features/variation/variationSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { cn } from '@/lib/utils';
import { IAtributeType } from '@/types/common.type';
import { IProductAttribute } from '@/types/Product.type';
import { useEffect } from 'react';

interface IProps {
  data: IProductAttribute[];
  name: IAtributeType;
  title: string;
}

const AttributeSelection = ({ data, name, title }: IProps) => {
  const { variationSection } = useAppSelector((state) => state.variation);
  const dispatch = useAppDispatch();

  const selected = variationSection.find((item) => item.a_name === name);

  useEffect(() => {
    if (data?.length)
      dispatch(
        setVariation({
          av_id: data[0].av_id,
          av_value: data[0].av_value,
          a_name: name,
        })
      );
  }, []);

  return (
    <div className='flex flex-col'>
      <span className='text-sm sm:text-base text-black/60 mb-4'>{title}</span>
      <div className='flex items-center flex-wrap space-x-3 sm:space-x-2'>
        {data?.map((item, index) => (
          <Button
            size={'default'}
            variant={'outline'}
            key={index}
            type='button'
            className={cn(
              'bg-[#F0F0F0] flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-full m-1 lg:m-0 max-h-[46px] border-0 hover:bg-primary hover:text-white',
              selected?.av_id === item.av_id &&
                selected?.a_name === name &&
                'bg-primary text-white ring-2 ring-offset-2'
            )}
            onClick={() =>
              dispatch(
                setVariation({
                  av_id: item.av_id,
                  av_value: item.av_value,
                  a_name: name,
                })
              )
            }
          >
            {item.av_value}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AttributeSelection;
