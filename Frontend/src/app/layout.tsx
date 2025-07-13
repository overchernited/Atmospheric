import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head"; // <-- importar Head aquí
import "../styles/globals.css";
import PageTitle from "@/components/PageTitle";
import Navbar from "@/components/Navbar";
import LayoutClientWrapper from "../components/LayoutClientWrapper";
import PagWrapper from "@/components/PagWrapper";
import 'react-loading-skeleton/dist/skeleton.css';

import background from "../app/assets/background.webp"

import bg1 from '../app/assets/background.webp';
import bg2 from '../app/assets/raining.webp';
import bg3 from '../app/assets/sunny.webp';
import bg4 from '../app/assets/cloudy.webp';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atmospheric",
  description: "By Ecolabs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <Head>
          <link rel="preload" as="image" href={bg1.src} type="image/webp" crossOrigin="anonymous" />
          <link rel="preload" as="image" href={bg2.src} type="image/webp" crossOrigin="anonymous" />
          <link rel="preload" as="image" href={bg3.src} type="image/webp" crossOrigin="anonymous" />
          <link rel="preload" as="image" href={bg4.src} type="image/webp" crossOrigin="anonymous" />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <PagWrapper>
            <LayoutClientWrapper />
            {children}
          </PagWrapper>
        </body>
      </html>
    </>
  );
}
