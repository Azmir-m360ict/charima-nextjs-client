import { site_config } from '@/lib/site_config';
import { Metadata } from 'next';
import ForgotPasswordPage from './_components/ForgotPasswordPage';

type Props = {};

export const metadata: Metadata = {
  title: `Reset your password  - ${site_config.seo_site_name}`,
  description: site_config.description,
};

const page = (props: Props) => {
  return <ForgotPasswordPage />;
};

export default page;
