import { site_config } from '@/lib/site_config';
import React from 'react';

type Props = {};

const page = (props: Props) => {
  return (
    <div className='max-w-frame mx-auto'>
      <div
        className='prose lg:prose-xl'
        dangerouslySetInnerHTML={{
          __html: site_config.page_content.contact_us,
        }}
      ></div>
    </div>
  );
};

export default page;
