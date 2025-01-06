'use client';

import ClientPagination from '@/components/common/pagination/ClientPagination';
import { DataTable } from '@/components/common/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IOrderList } from '@/types/Product.type';
import { useGetAllOrderQuery } from '@/utils/api-call/OrderApisEndpoints';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetAllOrderQuery({
    limit: 10,
    skip: (currentPage - 1) * itemsPerPage,
  });

  const result = data?.data || [];

  const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);

  const columns: ColumnDef<IOrderList>[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
    },
    {
      accessorKey: 'order_date',
      header: 'Order Date',
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className='font-medium'>
            {dayjs(data.order_date).format('DD/MM/YYYY')}
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'order_status',
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className='font-medium capitalize'>{data.order_status}</div>
        );
      },
    },
    {
      accessorKey: 'grand_total',
      header: () => <div>Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('grand_total'));
        return <div className='font-medium'>{amount.toLocaleString()}</div>;
      },
    },
    {
      header: 'Payment Status',
      accessorKey: 'payment_status',
      cell: ({ row }) => {
        const status = parseFloat(row.getValue('payment_status'));
        return status ? (
          <Badge
            variant={'outline'}
            className='border-green-500 text-green-500'
          >
            Paid
          </Badge>
        ) : (
          <Badge variant={'outline'} className='border-red-500 text-red-500'>
            Unpaid
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div>Action</div>,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className='flex gap-2'>
            <Button
              onClick={() => router.push(`/user-profile/orders/${data.id}`)}
              size={'sm'}
            >
              View
            </Button>
          </div>
        );
      },
    },
  ];

  console.log(data?.total);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div>
        <h3 className='text-2xl font-medium mt-3'>My Order List</h3>

        <div className=' mt-5'>
          <DataTable columns={columns} data={result} />
        </div>

        <div className='mt-4'>
          <ClientPagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
