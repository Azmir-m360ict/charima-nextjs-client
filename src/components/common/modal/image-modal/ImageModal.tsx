import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { VisuallyHidden } from '../../VisuallyHidden';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images?: string[];
  currentIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-5xl w-[90vw] h-[90vh] p-0 backdrop-blur-lg bg-primary/5 border-none'>
        <VisuallyHidden>
          <DialogTitle>Image Gallery</DialogTitle>
        </VisuallyHidden>
        {images ? (
          <div className='relative w-full h-full flex items-center justify-center'>
            <Image
              src={images[currentIndex]}
              alt='Full size image'
              fill
              className='object-contain p-2'
            />
            <div className='absolute inset-0 flex items-center justify-between p-4'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => onNavigate('prev')}
                disabled={currentIndex === 0}
                className='rounded-full bg-background/80 backdrop-blur-sm'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={() => onNavigate('next')}
                disabled={currentIndex === images?.length - 1}
                className='rounded-full bg-background/80 backdrop-blur-sm'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md'>
              {currentIndex + 1} / {images?.length}
            </div>
          </div>
        ) : undefined}
      </DialogContent>
    </Dialog>
  );
}
