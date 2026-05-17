import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'RentalCar',
  description: 'A car rental web application',
  openGraph: {
    title: 'RentalCar',
    description: 'A car rental web application',
    url: '',
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
      className={`${manrope.variable} data-scroll-behavior="smooth"`}
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
