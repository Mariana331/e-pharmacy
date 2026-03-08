import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'E-PHARMACY',
  description: 'E-PHARMACY',
  icons: {
    icon: '/favicon.cvg.png',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <TanStackProvider>
          <Header />
          <div className="container"> {children}</div>
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
