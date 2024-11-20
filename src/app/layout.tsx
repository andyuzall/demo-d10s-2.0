import "./globals.css";
import { Providers } from './Providers';
import Navbar from "../components/Navbar";
import type { Metadata } from 'next';
import Navbarr from "@/components/Navbar/Navbarr";
import { setFlagsFromString } from 'v8';
setFlagsFromString('--no-deprecation');


export const metadata: Metadata = {
  title: "D10S 2.0",
  description: "Software de Monitoreo",
};

export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-montserrat" >
        <Providers>
          <Navbarr />
          {children}
        </Providers>
      </body>
    </html>
  );
}

