'use client';
import InputGroup from '@/components/ui/input-group';
import { useDebounce } from '@/hooks/use-debounce';
import { getImageLink } from '@/lib/utils';
import { useGetSearchProductListQuery } from '@/utils/api-call/commonApisEndpoint';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {};

const ProductSearch = (props: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const debounce_search = useDebounce(search, 1000);

  const { data, isLoading, isSuccess } = useGetSearchProductListQuery(
    { search: debounce_search },
    { skip: !debounce_search.length }
  );

  const results = data?.data || [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className='w-full relative'>
      <InputGroup className='hidden lg:flex bg-[#F0F0F0] mr-3 lg:mr-10'>
        <InputGroup.Text>
          {isLoading ? (
            <Loader className='animate-spin text-primary' />
          ) : (
            <Image
              priority
              src='/icons/search.svg'
              height={20}
              width={20}
              alt='search'
              className='min-w-5 min-h-5'
            />
          )}
        </InputGroup.Text>
        <InputGroup.Input
          onClick={() => setOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          type='search'
          name='search'
          placeholder='Search for products...'
          className='bg-transparent placeholder:text-black/40'
        />
      </InputGroup>
      <AnimatePresence>
        {open && search && isSuccess && (
          <motion.div
            initial='hidden'
            animate='show'
            exit='hidden'
            variants={container}
            className='absolute z-40 w-full p-2 bg-white rounded-md shadow-md border border-gray-100 max-h-64 overflow-y-auto
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 
            hover:scrollbar-thumb-gray-400 
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-track]:rounded-full
            [&:hover::-webkit-scrollbar-thumb]:bg-gray-400'
          >
            {results?.length > 0 ? (
              results?.map((product) => (
                <motion.div
                  key={product.id}
                  variants={item}
                  whileHover={{ scale: 1.01 }}
                  className='group cursor-pointer'
                  onClick={() => {
                    router.push(`/shop/product/${product.slug}`);
                    setOpen(false);
                  }}
                >
                  <motion.div className='flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 transition-colors duration-200'>
                    <Image
                      priority
                      src={getImageLink(product.images[0].image_name)}
                      height={40}
                      width={40}
                      alt={product.name}
                      className='rounded object-cover'
                    />
                    <div className='min-w-0 flex-1'>
                      <p className='font-medium text-sm text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200'>
                        {product.name}
                      </p>
                      <div className='flex gap-2'>
                        <p className='text-xs text-gray-600 line-through'>
                          {Number(product.price || 0).toLocaleString()} BDT
                        </p>
                        <p className='text-xs text-gray-600'>
                          {Number(product.sale_price || 0).toLocaleString()} BDT
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <div>No item found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductSearch;
