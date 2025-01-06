import { getImageLink } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '../ui/Rating';
import { IProducts } from '../../types/Product.type';
import { site_config } from '@/lib/site_config';

type ProductCardProps = {
  data: IProducts;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const discount = data.price - data.sale_price;
  const percentage = (discount / data.price) * 100;

  const avg_rating = Number(data.avg_rating || 0).toFixed(0);
  const total_sold = Number(data.total_sold || 0);

  return (
    <Link
      href={`/shop/product/${data.slug}`}
      className='flex flex-col items-start aspect-auto'
    >
      <div className='bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden'>
        <Image
          src={getImageLink(data.images[0].image_name)}
          width={295}
          height={298}
          className='rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500'
          alt={data.name}
          priority
        />
      </div>
      <strong className='text-black xl:text-xl'>{data.name}</strong>
      <div className='flex justify-between items-end mb-1 xl:mb-2'>
        <Rating
          initialValue={Number(avg_rating || 0)}
          allowFraction
          SVGclassName='inline-block'
          emptyClassName='fill-gray-50'
          size={19}
          readonly
        />
        <span className='text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5 xl:pb-0'>
          {avg_rating}
          <span className='text-black/60'>/5</span>
        </span>
        {total_sold ? (
          <span className='font-medium text-[10px] xl:text-xs py-0.5 px-2 rounded-full bg-primary/10 text-primary ml-3'>
            {total_sold} Sold
          </span>
        ) : undefined}
      </div>
      <div className='flex items-center space-x-[5px] xl:space-x-2.5'>
        <span className='font-bold text-black text-xl xl:text-2xl'>
          {`${site_config.currency}${data.sale_price.toLocaleString()}`}
        </span>

        {discount > 0 && (
          <span className='font-bold text-black/40 line-through text-xl xl:text-2xl'>
            {site_config.currency}
            {data.price}
          </span>
        )}
        {percentage > 0 ? (
          <span className='font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]'>
            {`-${percentage.toFixed(0)}%`}
          </span>
        ) : (
          discount > 0 && (
            <span className='font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]'>
              {`-${site_config.currency}${discount}`}
            </span>
          )
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
