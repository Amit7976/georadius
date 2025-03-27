"use client";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./globals.css";
import BottomNavigation from "../components/BottomNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allowedRoutes = ["/", "/profile", "/home", "/post", "/rapid", "/search"];

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [clientPath, setClientPath] = useState<string | null>(null);

  useEffect(() => {
    setClientPath(pathname);
  }, [pathname]);

  const showBottomNav = clientPath !== null && allowedRoutes.includes(clientPath);
  const showMain = !showBottomNav;

  return (
    <html lang="en">
      <head>
        <title>{String(metadata.title ?? "Default Title")}</title>
        <meta name="description" content={String(metadata.description ?? "Default Description")} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>


        {showMain && <main className="flex-grow">{children}</main>}


        {showBottomNav && <BottomNavigation />}

      </body>
    </html>
  );
}
