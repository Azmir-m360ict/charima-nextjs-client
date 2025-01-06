import { auth } from '@/auth';
import BreadcrumbCart from '@/components/cart-page/BreadcrumbCart';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import OrderClientComponents from './_components/OrderClientComponents';

type Props = {};

const page = async (props: Props) => {
  const data = await auth();
  const user = data?.user;

  return (
    <main className='pb-20'>
      <div className='max-w-frame mx-auto px-4 xl:px-0'>
        <>
          <BreadcrumbCart />
          <h2
            className={cn([
              integralCF.className,
              'font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6',
            ])}
          >
            Checkout
          </h2>
          <OrderClientComponents user={user} />
        </>
      </div>
    </main>
  );
};

export default page;
