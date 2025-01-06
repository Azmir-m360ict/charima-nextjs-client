import { site_config } from '@/lib/site_config';
import { Metadata } from 'next';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: `User profile details- ${site_config.seo_site_name}`,
  description: site_config.description,
};

const layout = ({ children }: Props) => {
  return children;
};

export default layout;
