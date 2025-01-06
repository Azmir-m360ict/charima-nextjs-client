import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useCustomQueryParams = (
  initialValue: string | null,
  paramsName: string
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const [queryParam, setQueryParam] = useState<string | null>(initialValue);
  const getParamsName = searchParams.get(paramsName);

  useEffect(() => {
    if (getParamsName) {
      setQueryParam(getParamsName);
    }
  }, [searchParams]);

  const handleCheckboxChange = (value: string) => {
    if (queryParam === value) {
      setQueryParam(null);
      router.replace(pathname + '?' + createQueryString(paramsName, null));
    } else {
      setQueryParam(value);
      router.replace(pathname + '?' + createQueryString(paramsName, value));
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const deleteQueryParam = useCallback(
    (name: string) => {
      params.delete(name);
      const updatedQueryString = params.toString();
      router.replace(updatedQueryString ? `?${updatedQueryString}` : pathname);
    },
    [params, router, pathname]
  );

  const createQueryString = (name: string, value: string | null) => {
    if (value === null) {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    return params.toString();
  };
  return { queryParam, handleCheckboxChange, deleteQueryParam };
};

export const createQueryString = (
  params: URLSearchParams,
  name: string,
  value: string
) => {
  params.set(name, value);
  return params.toString();
};
