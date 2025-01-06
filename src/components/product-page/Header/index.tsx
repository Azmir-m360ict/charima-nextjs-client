import Rating from '@/components/ui/Rating';
import { site_config } from '@/lib/site_config';
import { cn, separateAttribute } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { IProducts } from '@/types/Product.type';
import AddToCardSection from './AddToCardSection';
import AttributeSelection from './AttributeSelection';
import PhotoSection from './PhotoSection';

const SingleProductDetails = ({ data }: { data: IProducts }) => {
  const discount = data.price - data.sale_price;
  const percentage = (discount / data.price) * 100;
  const attribute = data.attribute;

  const sizeAttributes = separateAttribute(attribute, 'Size');
  const colorAttributes = separateAttribute(attribute, 'Color');

  const avg_rating = Number(data.avg_rating || 0).toFixed(0);
  const total_sold = Number(data.total_sold || 0);

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <PhotoSection data={data} />
        </div>
        <div>
          <h1
            className={cn([
              integralCF.className,
              'text-2xl md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5 capitalize',
            ])}
          >
            {data.name}
          </h1>
          <div className='flex items-center mb-3 sm:mb-3.5'>
            <Rating
              initialValue={Number(avg_rating || 0)}
              allowFraction
              SVGclassName='inline-block'
              emptyClassName='fill-gray-50'
              size={25}
              readonly
            />
            <span className='text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px] pb-0.5 sm:pb-0'>
              {avg_rating}
              <span className='text-black/60'>/5</span>
            </span>
            {total_sold ? (
              <span className='font-medium text-[10px] xl:text-xs py-0.5 px-2 rounded-full bg-primary/10 text-primary ml-3'>
                {total_sold} Sold
              </span>
            ) : undefined}
          </div>
          <div className='flex items-center space-x-2.5 sm:space-x-3 mb-5'>
            <span className='font-bold text-black text-2xl sm:text-[32px]'>
              {site_config.currency} {data.sale_price.toLocaleString()}
            </span>

            {discount > 0 && (
              <span className='font-bold text-black/40 line-through text-2xl sm:text-[32px]'>
                {site_config.currency}
                {data.price.toLocaleString()}
              </span>
            )}
            {percentage > 0 ? (
              <span className='font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]'>
                {`-${percentage.toFixed(0)}%`}
              </span>
            ) : undefined}
          </div>
          {data?.available_stock < 11 ? (
            <span className='font-bold text-xs py-1.5 px-3.5 rounded-full bg-orange-500/10 text-orange-500'>
              Available stock: {data?.available_stock}
            </span>
          ) : undefined}

          <p className='text-sm sm:text-base text-black/60 mb-5'>
            {data?.ep_short_details}
          </p>
          {colorAttributes?.length ? (
            <>
              <hr className='h-[1px] border-t-black/10 mb-5' />
              <AttributeSelection
                data={colorAttributes}
                name='Color'
                title='Select Colors'
              />
            </>
          ) : undefined}
          {sizeAttributes.length ? (
            <>
              <hr className='h-[1px] border-t-black/10 my-5' />

              <AttributeSelection
                data={sizeAttributes}
                name='Size'
                title='Select Size'
              />
            </>
          ) : undefined}
          <hr className='hidden md:block h-[1px] border-t-black/10 my-5' />
          <AddToCardSection data={data} />
        </div>
      </div>
    </>
  );
};

export default SingleProductDetails;
