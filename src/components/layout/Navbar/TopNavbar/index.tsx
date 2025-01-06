import { auth } from '@/auth';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { site_config } from '@/lib/site_config';
import { cn, getImageLink } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import { ICategories } from '@/types/Category.type';
import { API_ENDPOINTS } from '@/utils/api-call/api-endpoints';
import { fetchRequest } from '@/utils/fetchApis';
import Image from 'next/image';
import Link from 'next/link';
import { NavMenu } from '../navbar.types';
import CartBtn from './CartBtn';
import { MenuItem } from './MenuItem';
import { MenuList } from './MenuList';
import ProductSearch from './ProductSearch';
import ResTopNavbar from './ResTopNavbar';
import MobileProductSearch from './MobileProductSearch';

const data: NavMenu = [
  {
    id: 1,
    type: 'MenuItem',
    label: 'On Sale',
    url: '/shop?sort_by=most-popular',
  },
  {
    id: 2,
    type: 'MenuItem',
    label: 'New Arrivals',
    url: '/shop?sort_by=',
  },
];

const TopNavbar = async () => {
  const auth_res = await auth();
  const is_login = auth_res?.user?.name;
  const profile_logo = auth_res?.user?.ec_image
    ? getImageLink(auth_res?.user?.ec_image)
    : undefined;

  const response = await fetchRequest<ICategories[]>(
    API_ENDPOINTS.PRODUCT_CATEGORIES
  );
  const categories = response?.data;

  return (
    <nav className='top-0 bg-white z-20'>
      <div className='flex relative max-w-frame mx-auto items-center justify-between lg:justify-start py-5 lg:py-6 px-4 xl:px-0'>
        <div className='flex items-center'>
          <div className='block lg:hidden mr-4'>
            <ResTopNavbar
              data={data}
              categories={categories}
              is_login={is_login}
            />
          </div>
          <Link href='/'>
            <Image
              src={site_config.site_logo}
              width={250}
              height={200}
              alt='profile image'
              className='w-full h-full'
            />
          </Link>
        </div>
        <NavigationMenu className='hidden lg:flex mr-2 lg:mr-7'>
          <NavigationMenuList>
            <>
              <MenuItem categories={categories} />

              {data?.map((item) => (
                <MenuList label={item.label} key={item.id} href={item.url} />
              ))}
            </>
          </NavigationMenuList>
        </NavigationMenu>
        <ProductSearch />
        <div className='flex items-center'>
          <MobileProductSearch />
          <CartBtn />
          <Link
            href={is_login ? '/user-profile/my-account' : '/login'}
            className='p-1 flex gap-1.5 items-center group '
          >
            {profile_logo ? (
              <Image
                src={profile_logo}
                width={100}
                height={100}
                alt='profile image'
                className='max-w-[22px] max-h-[22px] rounded-full'
              />
            ) : (
              <Image
                priority
                src='/icons/user.svg'
                height={100}
                width={100}
                alt='user'
                className='max-w-[22px] max-h-[22px]'
              />
            )}

            <span className='group-hover:underline'>
              {is_login ? 'Profile' : 'Login'}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
