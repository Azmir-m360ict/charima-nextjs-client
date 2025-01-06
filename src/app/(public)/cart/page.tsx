'use client';

import BreadcrumbCart from '@/components/cart-page/BreadcrumbCart';
import OrderSummary from '@/components/cart-page/OrderSummary';
import ProductCard from '@/components/cart-page/ProductCard';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks/redux';
import { site_config } from '@/lib/site_config';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { TbBasketExclamation } from 'react-icons/tb';

export default function CartPage() {
  const { cart, totalPrice, totalSalesPrice } = useAppSelector(
    (state) => state.carts
  );

  return (
    <main className='pb-20'>
      <div className='max-w-frame mx-auto px-4 xl:px-0'>
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                'font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6',
              ])}
            >
              your cart
            </h2>
            <div className='flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start'>
              <div className='w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10'>
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && (
                      <hr className='border-t-black/10' />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <OrderSummary />
            </div>
          </>
        ) : (
          <div className='flex items-center flex-col text-gray-300 mt-32'>
            <TbBasketExclamation strokeWidth={1} className='text-6xl' />
            <span className='block mb-4'>Your shopping cart is empty.</span>
            <Button className='rounded-full w-24' asChild>
              <Link href='/shop'>Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
