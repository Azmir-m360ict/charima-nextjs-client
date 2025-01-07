import { auth } from '@/auth';
import Footer from '@/components/layout/Footer';
import TopNavbar from '@/components/layout/Navbar/TopNavbar';
import { Toaster as ThemeToaster, Toaster } from '@/components/ui/toaster';
import { site_config } from '@/lib/site_config';
import { satoshi } from '@/styles/fonts';
import '@/styles/globals.css';
import HolyLoader from 'holy-loader';
import type { Metadata, Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import Providers from './providers';

export const metadata: Metadata = {
  title: site_config.seo_site_name,
  description: site_config.description,
};

export const viewport: Viewport = {
  themeColor: site_config.primary_color,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='en'>
      <body className={satoshi.className}>
        <Providers>
          <HolyLoader color={site_config.primary_color} />
          {/* <TopBanner /> */}
          <SessionProvider basePath={'/'} session={session}>
            <TopNavbar />
            <div className='min-h-screen'>{children}</div>
            <Toaster />
            <ThemeToaster />
          </SessionProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
