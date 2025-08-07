import { Anta } from 'next/font/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const anta = Anta({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anta'
});
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MemoGameApp - Juego de Memoria',
  description: 'Un divertido juego de memoria con cartas animadas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${anta.variable}`}> 
      <body className={`${inter.className} bg-black min-h-screen`}>
        {children}
      </body>
    </html>
  );
}