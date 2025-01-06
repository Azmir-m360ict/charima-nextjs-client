'use client';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const slides = ['/slider/slider_2.jpg'];

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on('select', onSelect);
    // Start autoplay
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Change slide every 5 seconds

    return () => {
      api.off('select', onSelect);
      clearInterval(autoplayInterval);
    };
  }, [api, onSelect]);

  return (
    <header className='relative'>
      <Carousel
        setApi={setApi}
        className='w-full'
        opts={{
          loop: true,
          align: 'start',
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className='relative'>
                <div
                  className='relative md:px-4 min-h-[448px] md:h-[428px] bg-cover bg-top bg-no-repeat'
                  style={{ backgroundImage: `url(${slide})` }}
                />
                {/* Centered Shop Now Button */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Link
                    href='/shop'
                    className='w-md md:w-52 mb-5 md:mb-12 inline-block text-center bg-primary hover:bg-primary/80 transition-all text-white px-14 py-4 rounded-full hover:animate-pulse'
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Pagination Dots */}
        <div className='absolute bottom-10 left-0 right-0 z-20 '>
          <div className='flex gap-2 justify-center'>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index ? 'w-10 bg-primary' : 'w-8 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </header>
  );
};

export default Hero;
