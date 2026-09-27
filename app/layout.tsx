import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';

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