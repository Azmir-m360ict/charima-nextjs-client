import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useDeleteQueryParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const deleteQueryParam = useCallback(
    (name: string) => {
      params.delete(name);
      const updatedQueryString = params.toString();
      router.replace(updatedQueryString ? `?${updatedQueryString}` : '?');
    },
    [params, router]
  );

  return { deleteQueryParam };
};
