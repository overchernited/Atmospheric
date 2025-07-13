import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import PageTitle from "@/components/PageTitle";
import Navbar from "@/components/Navbar";
import LayoutClientWrapper from "../components/LayoutClientWrapper";
import PagWrapper from "@/components/PagWrapper";
import 'react-loading-skeleton/dist/skeleton.css';

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
  return (<>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PagWrapper>
          <LayoutClientWrapper />
          {children}
        </PagWrapper>
      </body>
    </html>
  </>
  );
}
