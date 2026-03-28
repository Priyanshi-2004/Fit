import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FitTransform - Transform Your Body, Transform Your Life',
  description: 'Professional fitness coaching platform with personalized training programs, nutrition guidance, and expert support. Start your transformation journey today.',
  openGraph: {
    title: 'FitTransform - Professional Fitness Coaching',
    description: 'Transform your body with expert guidance and proven training programs',
    images: [
      {
        url: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitTransform - Professional Fitness Coaching',
    description: 'Transform your body with expert guidance and proven training programs',
    images: [
      {
        url: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
