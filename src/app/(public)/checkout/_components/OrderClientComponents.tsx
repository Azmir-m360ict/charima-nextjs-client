'use client';
import OrderSummary from '@/components/cart-page/OrderSummary';
import { AuthUser } from 'next-auth';
import CheckoutForm from './CheckoutForm';
import { useState } from 'react';

type Props = {
  user:
    | (AuthUser & {
        name?: string;
        token?: string;
        ec_id?: number;
        ec_phone?: string;
        ec_image?: string | null;
        ec_status?: number;
        ec_is_deleted?: number;
      })
    | undefined;
};

const OrderClientComponents = ({ user }: Props) => {
  const [selectAddress, setSelectAddress] = useState<number | string>('');

  return (
    <div className='flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start'>
      <div className='w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10'>
        <CheckoutForm
          user={user}
          selectAddress={selectAddress}
          setSelectAddress={setSelectAddress}
        />
      </div>
      <OrderSummary address_id={selectAddress} />
    </div>
  );
};

export default OrderClientComponents;
