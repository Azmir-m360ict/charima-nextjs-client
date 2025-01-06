import { site_config } from '@/lib/site_config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AiOutlineMail } from 'react-icons/ai';
import { FaPhoneAlt } from 'react-icons/fa';

const footerLinksData = [
  {
    id: 2,
    title: 'company',
    children: [
      {
        id: 11,
        label: 'about us',
        url: '/about-us',
      },

      {
        id: 13,
        label: 'contact us',
        url: 'contact-us',
      },
      {
        id: 14,
        label: 'privacy policy',
        url: 'privacy-policy',
      },
      {
        id: 15,
        label: 'terms conditions',
        url: 'terms-conditions',
      },
    ],
  },

  {
    id: 3,
    title: 'faq',
    children: [
      {
        id: 31,
        label: 'account',
        url: 'my-account',
      },
      {
        id: 32,
        label: 'Return Policy',
        url: 'return-policy',
      },
      {
        id: 33,
        label: 'orders',
        url: '#',
      },
      {
        id: 34,
        label: 'track order',
        url: 'track-order',
      },
    ],
  },

  {
    id: 1,
    title: 'Need Help',
    children: [
      {
        id: 21,
        label: (
          <div className='flex gap-1 '>
            <FaPhoneAlt className='w-5 mt-1.5' />

            <span className=''>{site_config.phone_no}</span>
          </div>
        ),
        url: '',
      },
      {
        id: 22,
        label: (
          <div className='flex gap-1 items-center'>
            <AiOutlineMail className='w-5 mt-1' />

            <span>{site_config.email}</span>
          </div>
        ),
        url: '',
      },
    ],
  },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className='flex flex-col mt-5' key={item.id}>
          <h3 className='font-medium text-sm md:text-base uppercase tracking-widest mb-6'>
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={cn([
                link.id !== 22 && link.id !== 43 && 'capitalize',
                'text-black/60 text-sm md:text-base mb-4 w-fit',
              ])}
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
