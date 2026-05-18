import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import { Toaster } from 'react-hot-toast';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RentalCar — Find Your Perfect Rental Car',
  description:
    'Reliable and budget-friendly car rentals for any journey. Browse our catalog and rent the perfect car in Ukraine.',
  keywords: [
    'car rental',
    'rental cars',
    'SUV rental',
    'luxury car rental',
    'Ukraine car rental',
    'RentalCar',
  ],
  openGraph: {
    title: 'RentalCar — Find Your Perfect Rental Car',
    description: 'Reliable and budget-friendly car rentals for any journey.',
    type: 'website',
    url: 'https://my-domain.com',
    siteName: 'RentalCar',
    images: [
      {
        url: 'https://my-domain.com/open_graph.jpg',
        width: 1200,
        height: 630,
        alt: 'RentalCar homepage',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} data-scroll-behavior="smooth"`}
    >
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Toaster position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
