import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';

export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body>
            <Header />
            <SessionProvider>{children}</SessionProvider>
            <Footer />
          </body>
        </html>
      );
}

export const metadata: Metadata = {
  title: {
    default: 'Student Name | Project Portfolio',
    template: '%s | Project Portfolio',
  },
  description: 
     'A portfolio of web developments projects.',
  metadataBase: new URL('https://vercel.com/wdd-442/wdd430-portfolio'),
};

