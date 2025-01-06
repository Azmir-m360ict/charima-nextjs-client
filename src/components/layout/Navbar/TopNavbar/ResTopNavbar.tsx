import CategoriesSectionItem from '@/components/shop-page/filters/CategoriesSectionItem';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { ICategories } from '@/types/Category.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NavMenu } from '../navbar.types';
import { site_config } from '@/lib/site_config';

interface Props {
  categories: ICategories[] | undefined;
  data: NavMenu;
  is_login: string | undefined;
}

const ResTopNavbar = ({ data, categories, is_login }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild className='cursor-pointer'>
        <Image
          priority
          src='/icons/menu.svg'
          height={100}
          width={100}
          alt='menu'
          className='max-w-[22px] max-h-[22px]'
        />
      </SheetTrigger>
      <SheetContent side='left' className='overflow-y-auto'>
        <SheetHeader className='mb-10'>
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link
                href='/'
                className={cn([integralCF.className, 'text-2xl text-primary'])}
              >
                {site_config.site_name}
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className='flex flex-col items-start'>
          {data?.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'MenuItem' && (
                <SheetClose asChild>
                  <Link href={item.url ?? '/'} className='mb-4'>
                    {item.label}
                  </Link>
                </SheetClose>
              )}
            </React.Fragment>
          ))}
        </div>

        <span className='text-gray-400 text-sm'>All Categories</span>
        <Separator className='mb-1' />

        <CategoriesSectionItem categories={categories} />
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
