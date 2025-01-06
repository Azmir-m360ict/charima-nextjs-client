import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/user-profile*', '/verify-otp', '/new-password', '/404'],
      },
    ],
    sitemap: 'https://traveltripbd.com/sitemap.xml',
    host: 'https://traveltripbd.com',
  };
}
