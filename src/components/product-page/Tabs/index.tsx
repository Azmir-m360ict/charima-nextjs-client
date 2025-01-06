'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IProducts } from '@/types/Product.type';
import { useState } from 'react';
import ProductDetailsContent from './ProductDetailsContent';
import QuestionAndAnswer from './QuestionAndAnswer';
import ReviewsContent from './ReviewsContent';
import { Session } from 'next-auth';

type TabBtn = {
  id: number;
  label: string;
};

const tabBtnData: TabBtn[] = [
  {
    id: 1,
    label: 'Product Details',
  },
  {
    id: 2,
    label: 'Rating & Reviews',
  },
  {
    id: 3,
    label: 'Question & Answer',
  },
];

interface Props {
  data: IProducts;
  auth_data: Session | null;
}

const Tabs = ({ data, auth_data }: Props) => {
  const [active, setActive] = useState<number>(1);

  return (
    <div>
      <div className='flex items-center mb-6 sm:mb-8 overflow-x-auto'>
        {tabBtnData.map((tab) => (
          <Button
            key={tab.id}
            variant='ghost'
            type='button'
            className={cn([
              active === tab.id
                ? 'border-black border-b-2 font-medium'
                : 'border-b border-black/10 text-black/60 font-normal',
              'p-5 sm:p-6 rounded-none flex-1',
            ])}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className='mb-12 sm:mb-16'>
        {active === 1 && <ProductDetailsContent details={data.details} />}
        {active === 2 && <ReviewsContent product_id={data.id} />}
        {active === 3 && (
          <QuestionAndAnswer product_id={data.id} auth_data={auth_data} />
        )}
      </div>
    </div>
  );
};

export default Tabs;
