'use client';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/lib/features/carts/cartsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { IProducts } from '@/types/Product.type';
import { useState } from 'react';
import { toast } from 'sonner';

const AddToCartBtn = ({ data }: { data: IProducts & { quantity: number } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { variationSection } = useAppSelector((state) => state.variation);

  const discount = data.price - data.sale_price;
  const percentage = (discount / data.price) * 100 || 0;

  const addItemToCart = async () => {
    setIsLoading(true);

    // Simulate loading with setTimeout
    await new Promise((resolve) => setTimeout(resolve, 500));

    dispatch(
      addToCart({
        id: data.id,
        name: data.name,
        srcUrl: data.images[0].image_name,
        price: data.price,
        sale_price: data.sale_price,
        attributes: variationSection,
        discount: {
          amount: discount,
          percentage: Number(percentage.toFixed(0)),
        },
        quantity: data.quantity,
        slug: data.slug,
      })
    );

    // Show success toast
    toast('Product Added', {
      description: `${data.name} has been added to your cart.`,
      duration: 2000,
      position: 'top-right',
    });

    setIsLoading(false);
  };

  return (
    <Button
      type='button'
      className='bg-primary w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-primary/80 transition-all'
      onClick={addItemToCart}
      disabled={isLoading}
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
};

export default AddToCartBtn;
