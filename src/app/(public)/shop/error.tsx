'use client';

import PageError from '@/components/common/PageError';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  console.log({ my_error: error });

  return <PageError error={error} reset={reset} />;
}
