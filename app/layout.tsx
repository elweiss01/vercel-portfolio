import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./custom.css";

import BootStrapClient from "./components/bootstrapComponent/bootStrapClient";
import Navigation from "./components/navigation/navbar";
import Sidebar from "./components/navigation/sidebar";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { PageProvider } from "./components/globalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pegasus",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <UserProvider>

        <body className={inter.className}>


          <Navigation />
          <Sidebar />
          <PageProvider>
            {children}
          </PageProvider>
          <BootStrapClient />


        </body>

      </UserProvider>
    </html>
  );
}