'use client';

import { Button } from '@/components/ui/button';
import { addToCart } from '@/lib/features/carts/cartsSlice';
import { clearVariation } from '@/lib/features/variation/variationSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { IProducts } from '@/types/Product.type';

const AddToCartBtn = ({ data }: { data: IProducts & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  const { variationSection } = useAppSelector((state) => state.variation);

  const discount = data.price - data.sale_price;
  const percentage = (discount / data.price) * 100 || 0;

  const addItemToCart = () => {
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
  };

  return (
    <Button
      type='button'
      className='bg-primary w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-primary/80 transition-all'
      onClick={() => {
        addItemToCart();

        // dispatch(clearVariation());
      }}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartBtn;
