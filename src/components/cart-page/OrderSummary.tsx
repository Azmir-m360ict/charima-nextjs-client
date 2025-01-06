'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { reset_cart } from '@/lib/features/carts/cartsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { site_config } from '@/lib/site_config';
import { IPurchase } from '@/types/Product.type';
import { useOrderConfirmMutation } from '@/utils/api-call/OrderApisEndpoints';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Loading from '../common/Loading';
type Props = {
  address_id?: string | number;
};

const OrderSummary = ({ address_id }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [createOrder, { isLoading, isSuccess, isError }] =
    useOrderConfirmMutation();

  const { cart, totalPrice, totalSalesPrice } = useAppSelector(
    (state) => state.carts
  );

  const handleCheckOut = () => {
    if (address_id) {
      const body: IPurchase = {
        address_id: address_id,
        delivery_charge: 0,
        products: cart!.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          av_id:
            item.attributes.length > 0
              ? item.attributes.map((item) => item.av_id)
              : [],
        })),
      };
      createOrder(body);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({ title: 'Success', description: 'Your order has been placed' });
      dispatch(reset_cart());
      router.push('/user-profile/orders');
    }
  }, [isSuccess, isError]);

  return (
    <div className='w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10'>
      <h6 className='text-xl md:text-2xl font-bold text-black'>
        Order Summary
      </h6>
      <div className='flex flex-col space-y-5'>
        <div className='flex items-center justify-between'>
          <span className='md:text-xl text-black/60'>Subtotal</span>
          <span className='md:text-xl font-bold'>
            {site_config.currency} {totalPrice.toLocaleString()}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='md:text-xl text-black/60'>
            Discount (-
            {Math.round(((totalPrice - totalSalesPrice) / totalPrice) * 100)}
            %)
          </span>
          <span className='md:text-xl font-bold text-red-600'>
            -{site_config.currency}{' '}
            {Math.round(totalPrice - totalSalesPrice).toLocaleString()}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='md:text-xl text-black/60'>Delivery Fee</span>
          <span className='md:text-xl font-bold'>Free</span>
        </div>
        <hr className='border-t-black/10' />
        <div className='flex items-center justify-between'>
          <span className='md:text-xl text-black'>Total</span>
          <span className='text-xl md:text-2xl font-bold'>
            {site_config.currency}{' '}
            {Math.round(totalSalesPrice).toLocaleString()}
          </span>
        </div>
      </div>
      {/* <div className='flex space-x-3'>
        <InputGroup className='bg-[#F0F0F0]'>
          <InputGroup.Text>
            <MdOutlineLocalOffer className='text-black/40 text-2xl' />
          </InputGroup.Text>
          <InputGroup.Input
            type='text'
            name='code'
            placeholder='Add promo code'
            className='bg-transparent placeholder:text-black/40'
          />
        </InputGroup>
        <Button
          type='button'
          className='bg-black rounded-full w-full max-w-[119px] h-[48px]'
        >
          Apply
        </Button>
      </div> */}
      <Button
        disabled={isLoading}
        type='button'
        className='text-sm md:text-base font-medium bg-primary rounded-full w-full py-4 h-[54px] md:h-[60px] group'
        onClick={() =>
          address_id ? handleCheckOut() : router.push('/checkout')
        }
      >
        {isLoading ? (
          <Loading />
        ) : address_id ? (
          'Confirm purchase'
        ) : (
          'Go to Checkout'
        )}

        <FaArrowRight className='text-xl ml-2 group-hover:translate-x-1 transition-all' />
      </Button>
    </div>
  );
};

export default OrderSummary;
