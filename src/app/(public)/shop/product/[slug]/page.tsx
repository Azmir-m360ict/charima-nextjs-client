import { auth } from '@/auth';
import ProductListSec from '@/components/common/ProductListSec';
import BreadcrumbProduct from '@/components/product-page/BreadcrumbProduct';
import SingleProductDetails from '@/components/product-page/Header';
import Tabs from '@/components/product-page/Tabs';
import { getFirst100WordsFromHTML } from '@/lib/utils';
import { IProducts } from '@/types/Product.type';
import { API_ENDPOINTS } from '@/utils/api-call/api-endpoints';
import { fetchRequest } from '@/utils/fetchApis';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const response = await fetchRequest<IProducts>(
    API_ENDPOINTS.PRODUCT_LIST + '/' + resolvedParams.slug
  );
  const productData = response.data;

  if (!productData?.name) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: productData.ep_seo_title || productData.name,
    description:
      productData.ep_seo_description ||
      `${productData.name} - ${getFirst100WordsFromHTML(productData.details)}`,
    openGraph: {
      images: [
        ...(productData.images?.[0]?.image_name
          ? [
              `${process.env.NEXT_PUBLIC_IMAGE_URL}/${productData.images[0].image_name}`,
            ]
          : []),
        ...previousImages,
      ],
    },
    keywords: productData.tags,
    alternates: {
      canonical: `/shop/product/${productData.slug}`,
    },
  };
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const auth_data = await auth();

  const response = await fetchRequest<IProducts>(
    API_ENDPOINTS.PRODUCT_LIST + '/' + params.slug
  );
  const productData = response.data;

  if (!productData?.name) {
    notFound();
  }

  return (
    <main>
      <div className='max-w-frame mx-auto px-4 xl:px-0'>
        <hr className='h-[1px] border-t-black/10 mb-5 sm:mb-6' />
        <BreadcrumbProduct title={productData?.name ?? 'product'} />
        <section className='mb-11'>
          <SingleProductDetails data={productData} />
        </section>
        <Tabs data={productData} auth_data={auth_data} />
      </div>
      <div className='mb-[50px] sm:mb-20'>
        <ProductListSec relatedTag={productData.tags} />
      </div>
    </main>
  );
}
