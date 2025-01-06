'use client';

import Loading from '@/components/common/Loading';
import { Alert } from '@/components/common/modal/Alert';
import { DataTable } from '@/components/common/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SpinnerbLoader from '@/components/ui/SpinnerbLoader';
import { IProductQuestionForCustomer } from '@/types/Product.type';
import {
  useDeleteQuestionMutation,
  useGetAllQuestionForCustomerQuery,
} from '@/utils/api-call/QuestionApisEndpoints';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Link from 'next/link';

const page = () => {
  const { data, isLoading } = useGetAllQuestionForCustomerQuery();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const result = data?.data || [];

  const columns: ColumnDef<IProductQuestionForCustomer>[] = [
    {
      accessorKey: 'question_date',
      header: 'Question Date',
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className='font-medium'>
            {dayjs(data.question_date).format('DD/MM/YYYY')}
          </div>
        );
      },
    },

    {
      header: 'Product Name',
      accessorKey: 'product_name',
      cell: ({ row }) => {
        const data = row.original;
        return (
          <Link href={`/shop/product/${data.slug}`}>
            <span className='text-blue-500 underline'>{data.product_name}</span>
          </Link>
        );
      },
    },

    {
      header: 'Question',
      accessorKey: 'question',
    },
    {
      header: 'Answer',
      accessorKey: 'answer',
      cell: ({ row }) => {
        const data = row.original;
        if (data.answer) {
          return <span>{data.answer}</span>;
        } else {
          return (
            <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
              Awaiting Answer
            </Badge>
          );
        }
      },
    },

    {
      header: 'Action',
      cell: ({ row }) => {
        const data = row.original;
        return (
          <Alert
            trigger={
              <Button size='sm' variant='destructive'>
                Delete
              </Button>
            }
            title='Are you sure you want to delete this question?'
            description='This action cannot be undone. Once deleted, the question will be permanently removed.'
            confirmLabel='Yes, Cancel'
            cancelLabel='No, Go Back'
            onConfirm={() => handleConfirm(data.id)}
          />
        );
      },
    },
  ];

  const handleConfirm = (id: number) => {
    deleteQuestion({ product_id: id });
  };
  return (
    <div>
      <div>
        <h3 className='text-2xl font-medium mt-3'>My Question List</h3>
        {isLoading ? <Loading /> : ''}
        <div className=' mt-5'>
          <DataTable columns={columns} data={result} />
        </div>
      </div>
    </div>
  );
};

export default page;
