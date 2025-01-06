import React from 'react';

interface Props {
  details: string | undefined;
}
const ProductDetailsContent = ({ details }: Props) => {
  return (
    <section className='prose lg:prose-xl'>
      <h3 className='text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6 '>
        Product Details
      </h3>

      <div dangerouslySetInnerHTML={{ __html: details || '' }}></div>
    </section>
  );
};

export default ProductDetailsContent;
