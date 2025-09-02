import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

import "../styles/globals.css";


//Components
import ScrollToTop from "@/hooks/ScrollHook";
import { NotificationProvider } from "@/components/Notifications/NotificationProvider";
import NotificationList from "@/components/Notifications";
import PagWrapper from "@/hooks/AnimationWrapper";
import Modal from "@/hooks/Modal";
import LayoutClientWrapper from "../hooks/NotFoundWrapper";

//Libraries
import 'react-loading-skeleton/dist/skeleton.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

//Preload
import bg1 from '../app/assets/background.webp';
import bg2 from '../app/assets/raining.webp';
import bg3 from '../app/assets/sunny.webp';
import bg4 from '../app/assets/cloudy.webp';
import { ModalProvider } from "@/hooks/Modal/modalProvider";



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
          <link rel="manifest" href="/manifest.json" />
          <link rel="preload" as="image" href={bg1.src} type="image/webp" crossOrigin="anonymous" />
          <link rel="preload" as="image" href={bg2.src} type="image/webp" crossOrigin="anonymous" />
          <link rel="preload" as="image" href={bg3.src} type="image/webp" crossOrigin="anonymous" />
          <link rel="preload" as="image" href={bg4.src} type="image/webp" crossOrigin="anonymous" />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ModalProvider>
            <NotificationProvider>
              <NotificationList />
              <Modal />
              <PagWrapper>
                <LayoutClientWrapper />
                {children}
              </PagWrapper>
              <ScrollToTop />
            </NotificationProvider>
          </ModalProvider>
        </body>
      </html >
    </>
  );
}
