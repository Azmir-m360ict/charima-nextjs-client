import { site_config } from '@/lib/site_config';
import { Metadata } from 'next';
import VerifyOtp from './_components/VerifyOtp';

type Props = {};

export const metadata: Metadata = {
  title: `Verify your otp  - ${site_config.seo_site_name}`,
  description: site_config.description,
};

const page = (props: Props) => {
  return <VerifyOtp />;
};

export default page;
