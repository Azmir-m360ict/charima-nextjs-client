'use client';

import { useCustomQueryParams } from '@/hooks/useCustomQueryParams';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '../../ui/pagination';

type Props = {
  currentPage: number;
  category: string;
  totalPages: number;
};

const PaginationControl = ({ currentPage, category, totalPages }: Props) => {
  const { queryParam, handleCheckboxChange } = useCustomQueryParams(
    null,
    'page'
  );

  const handlePageChange = (no: number) => {
    handleCheckboxChange(String(no));
  };

  return (
    <Pagination className='justify-end'>
      <PaginationContent>
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/shop?page=${pageNumber}&category=${category}`}
                  className={`text-black/50 font-medium text-sm rounded-full ${
                    pageNumber === currentPage ? 'bg-primary text-white' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNumber);
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (
            (pageNumber === currentPage - 2 && currentPage > 3) ||
            (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
          ) {
            return (
              <PaginationEllipsis
                key={pageNumber}
                className='text-black/50 font-medium text-sm'
              />
            );
          }
          return null;
        })}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControl;
