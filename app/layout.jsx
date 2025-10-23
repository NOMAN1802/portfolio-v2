import {Inter ,Bebas_Neue} from 'next/font/google'
import "./globals.css";
import { Providers } from '@/Providers';

const inter = Inter({
  weight:["100","200","300","400","500","600","700","800","900"],
  subsets: ['latin'],
  variable: "--font-inter",
});


const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ['latin'],
  variable: "--font-bebas",
});

export const metadata = {
  title: "Noman | Portfolio",
  description: "This is portfolio of a mern stack developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} antialiased`}>
      <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
