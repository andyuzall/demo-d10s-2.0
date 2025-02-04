import "./globals.css";
import { Providers } from './Providers';
import type { Metadata } from 'next';
import Navbarr from "@/components/Navbar/Navbarr";

export const metadata: Metadata = {
  title: "D10S 2.0",
  description: "Software de Monitoreo",
};

export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='font-poppins'>
          <Providers>
            <Navbarr />
            {children}
          </Providers>
      </body>
    </html>
  );
}

