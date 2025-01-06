'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageModal } from './ImageModal';
import { getImageLink } from '@/lib/utils';

interface ReviewImage {
  image_id: string | number;
  image: string;
}

interface ReviewImagesProps {
  images?: ReviewImage[];
}

export function ReviewImages({ images }: ReviewImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const imageUrls = images?.map((item) => getImageLink(item.image));

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (selectedIndex === null) return;
    if (direction === 'prev' && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (
      direction === 'next' &&
      selectedIndex < (images?.length || 0) - 1
    ) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 w-full'>
        {images?.map((item, index) => (
          <div
            className='aspect-square rounded-md overflow-hidden cursor-pointer'
            key={item.image_id}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={getImageLink(item.image)}
              alt='Review image'
              className='w-full h-full object-cover'
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>
      <ImageModal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        images={imageUrls}
        currentIndex={selectedIndex ?? 0}
        onNavigate={handleNavigate}
      />
    </>
  );
}
