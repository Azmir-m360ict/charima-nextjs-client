import { site_config } from '@/lib/site_config';
import { Metadata } from 'next';
import NewPasswordPage from './_components/NewPasswordPage';

export const metadata: Metadata = {
  title: `Provide new password  - ${site_config.seo_site_name}`,
  description: site_config.description,
};

const page = () => {
  return <NewPasswordPage />;
};

export default page;
