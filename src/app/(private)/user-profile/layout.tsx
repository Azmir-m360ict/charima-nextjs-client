'use client';

import { Button } from '@/components/ui/button'; // Ensure you have a Button component in your ShadCN setup
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'; // Ensure you import Sheet components
import { cn } from '@/lib/utils';
import { doLogout } from '@/utils/action';
import {
  CircleHelp,
  CircleUser,
  KeySquare,
  LogOut,
  MapPinHouse,
  Menu,
  ShoppingCart,
  Star,
} from 'lucide-react';
import Head from 'next/head';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sideMenu = [
    { name: 'Account Setting', icon: CircleUser, href: 'my-account' },
    { name: 'Order', icon: ShoppingCart, href: 'orders' },
    { name: 'Reviews', icon: Star, href: 'reviews' },
    { name: 'Question & Answer', icon: CircleHelp, href: 'question' },
    { name: 'Addresses', icon: MapPinHouse, href: 'addresses' },
    { name: 'Password Change', icon: KeySquare, href: 'password' },
  ];

  const SideMenuContent = () => (
    <>
      {sideMenu.map((item, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center gap-3 cursor-pointer px-2 py-1 pr-14',
            pathname.split('/').includes(item.href) &&
              'bg-gray-100 font-semibold w-full'
          )}
          onClick={() => {
            router.push(`/user-profile/${item.href}`);
            setIsMenuOpen(false); // Close menu on mobile after navigation
          }}
        >
          <span>
            <item.icon className='w-5 h-5' />
          </span>
          <span>{item.name}</span>
        </div>
      ))}

      <div
        className={cn('flex items-center gap-3 cursor-pointer px-2 py-1 pr-14')}
        onClick={() => {
          doLogout();
          setIsMenuOpen(false); // Close menu on logout
        }}
      >
        <span>
          <LogOut className='w-5 h-5' />
        </span>
        <span>{'Logout'}</span>
      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>{'User profile setting'}</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div>
        <div className='flex flex-col min-h-screen  lg:w-frame mx-auto '>
          {/* Header */}
          <header className='flex items-center justify-between h-16 px-4 border-b'>
            <h1 className='text-2xl font-bold ml-2'>Manage your account</h1>
            <Button
              className='lg:hidden'
              onClick={() => setIsMenuOpen(true)}
              variant={'secondary'}
            >
              <div className='flex items-center gap-2'>
                <Menu />
                <span>Setting</span>
              </div>
            </Button>
          </header>

          <div className='flex h-full'>
            {/* Desktop Side Menu */}
            <nav className='hidden lg:block mt-4 space-y-3 pr-2 w-1/4'>
              <SideMenuContent />
            </nav>

            {/* Mobile Side Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <div />
              </SheetTrigger>
              <SheetContent className='p-0'>
                <div className='px-4 py-1'>
                  <SheetTitle className='mt-1'>Manage Your Profile</SheetTitle>
                </div>
                <Separator className='mb-2' />
                <div className='px-4'>
                  <SideMenuContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className='border-l w-full'>
              <main className='overflow-y-auto p-4 '>{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
