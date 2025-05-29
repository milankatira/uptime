export const API_BACKEND_URL = "http://localhost:8080";

import { Metadata } from 'next';
import { generateFavicon } from '@/lib/generate-favicon';

const siteConfig = {
  name: 'Uptime.com',
  url: 'https://uptime.com',
  ogImage: '/images/og-image.png',
  description: "Professional website monitoring & performance tracking platform. Real-time uptime statistics, outage alerts, and performance metrics.",
  keywords: 'website monitoring, uptime tracking, performance metrics, outage alerts, server status'
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const favicon = generateFavicon();

  return {
    title,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: 'FeedSpark Team' }],
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
      other: {
        rel: 'mask-icon',
        url: favicon,
      },
    },
    openGraph: {
      title: title,
      description: description,
      images: [image],
      type: 'website',
      siteName: siteConfig.name,
      url: siteConfig.url,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
      creator: '@feedspark',
      site: '@feedspark',
    },
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
  };
}
