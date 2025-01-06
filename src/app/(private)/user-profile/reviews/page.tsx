'use client';

import { DataTable } from '@/components/common/table/data-table';
import { Button } from '@/components/ui/button';
import { IProductReviewList } from '@/types/Product.type';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useGetCustomerAllReviewQuery } from './_component/reviewsApiEndpoints';

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const { data } = useGetCustomerAllReviewQuery();
  const result = data?.data || [];

  const columns: ColumnDef<IProductReviewList>[] = [
    {
      header: 'Product Name',
      accessorKey: 'product_name',
    },
    {
      header: 'Review Date',
      accessorKey: 'created_at',
      cell: ({ row }) => {
        return <div>{dayjs(row.original.created_at).format('DD-MM-YYYY')}</div>;
      },
    },
    {
      header: 'Comments',
      accessorKey: 'comment',
    },
    {
      header: () => <div>Rating</div>,
      accessorKey: 'rating',
    },
    {
      id: 'actions',
      header: () => <div>Action</div>,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className='flex gap-2'>
            <Button
              onClick={() => router.push(`/shop/product/${data.product_slug}`)}
              size={'sm'}
            >
              View Product
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div>
        <h3 className='text-2xl font-medium mt-3'>My Reviews List</h3>

        <div className=' mt-5'>
          <DataTable columns={columns} data={result} />
        </div>
      </div>
    </div>
  );
};

export default page;
