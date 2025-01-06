'use client';

import { useGetAddressQuery } from '@/app/(private)/user-profile/_components/ProfileApiEndpoints';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AlertCircle, MapPinIcon, PhoneIcon } from 'lucide-react';
import { AuthUser } from 'next-auth';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AddNewAddress from '@/app/(private)/user-profile/addresses/add-new/_components/AddNewAddress';

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
  selectAddress: string | number;
  setSelectAddress: Dispatch<SetStateAction<string | number>>;
};

const CheckoutForm = ({ user, selectAddress, setSelectAddress }: Props) => {
  const { data } = useGetAddressQuery();
  const address_list = data?.data;

  useEffect(() => {
    if (address_list?.length) {
      setSelectAddress(address_list[0].id as number);
    }
  }, [address_list]);

  if (!user) {
    return (
      <Card className='h-full min-h-[40vh] border-none shadow-none bg-transparent flex justify-center items-center'>
        <CardContent className='flex items-center justify-center h-40'>
          <div className='text-center space-y-2'>
            <AlertCircle className='mx-auto h-12 w-12 text-yellow-500' />
            <p className='text-lg font-semibold'>
              You must login before checkout
            </p>
            <Link href={'/login?redirect=checkout'}>
              <Button variant='outline' className='m-2'>
                Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='h-full min-h-[20vh]'>
      <h3 className='text-2xl font-medium mt-3'>
        Select your delivery address
      </h3>

      <div className='mt-5'>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-2'>
          {address_list?.map((address) => (
            <div
              key={address.id}
              onClick={() => setSelectAddress(address.id!)}
              className={cn(
                'shadow-md rounded-lg p-6 mb-4 border cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-primary duration-200',
                selectAddress === address.id &&
                  'ring-2 ring-offset-2 ring-primary'
              )}
            >
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <h4 className='text-lg font-semibold'>{address.label}</h4>
                  <p className='text-gray-600'>{address.name}</p>
                </div>
                <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>
                  {address.provinance}
                </span>
              </div>
              <div className='flex items-center mb-2'>
                <MapPinIcon className='h-5 w-5 text-gray-400 mr-2' />
                <p className='text-gray-700'>{address.address}</p>
              </div>
              <div className='flex items-center mb-2'>
                <PhoneIcon className='h-5 w-5 text-gray-400 mr-2' />
                <p className='text-gray-700'>{address.phone}</p>
              </div>
              <div className='text-sm text-gray-500'>
                {address.area_name}, {address.sub_city_name},{' '}
                {address.city_name}
              </div>
            </div>
          ))}
        </div>

        <Separator className='my-4' />

        <Accordion type='single' collapsible>
          <AccordionItem value='item-1' className='border-none'>
            <AccordionTrigger>Add new address ?</AccordionTrigger>
            <AccordionContent>
              <AddNewAddress redirectURL={false} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CheckoutForm;
