'use client';
import { Button } from '@/components/ui/button';
import { MapPinIcon, PhoneIcon, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGetAddressQuery } from '../_components/ProfileApiEndpoints';
import Link from 'next/link';

type Props = {};

const page = (props: Props) => {
  const router = useRouter();

  const { data } = useGetAddressQuery();
  const address_list = data?.data;

  return (
    <div>
      <div>
        <h3 className='text-2xl font-medium mt-3'>My Address List</h3>

        <div className=' mt-5'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {address_list?.map((address) => (
              <Link
                key={address.id}
                href={`/user-profile/addresses/${address.id}`}
                className='shadow-md rounded-lg p-6 mb-4 border'
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
              </Link>
            ))}

            <div className='shadow-md rounded-lg p-6 mb-4 border flex justify-center items-center'>
              <div className='flex gap-2 p-2 rounded'>
                <Button
                  onClick={() => router.push('/user-profile/addresses/add-new')}
                >
                  <Plus />
                  <span>Add New Address</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
