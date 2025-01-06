import { auth } from '@/auth';
import { site_config } from '@/lib/site_config';
import { Metadata } from 'next';
import LoginPage from './_components/LoginPage';

export const metadata: Metadata = {
  title: `Login to your account  - ${site_config.seo_site_name}`,
  description: site_config.description,
};

const page = async () => {
  const session = await auth();

  return <LoginPage session={session} />;
};

export default page;
