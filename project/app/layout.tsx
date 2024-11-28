import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import ConvexClientProvider from './convex-client-provider';
import React from "react";
import {Providers} from "@/app/providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Library',
  description: 'Your digital library for books, videos, journals, and audio content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Providers attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-background">
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
          </Providers>
        </ConvexClientProvider>
      </body>
    </html>
  );
}