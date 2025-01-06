import { site_config } from '@/lib/site_config';
import { Metadata } from 'next';
import SignupPage from './_components/SignupPage';

export const metadata: Metadata = {
  title: `Create a new account  - ${site_config.seo_site_name}`,
  description: site_config.description,
};

const page = () => {
  return <SignupPage />;
};

export default page;
