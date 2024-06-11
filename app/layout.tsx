import "@/styles/globals.css";
import type { Metadata } from 'next';
import { Providers } from "./providers";
import { fontRoboto } from '@/shared/config/fonts';
import clsx from "clsx";

export const metadata: Metadata = {
  title: 'Hệ thống quản lý hoá chất',
  description: 'Hệ thống quản lý hoá chất',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo_flash.png" />
      <body className={clsx("font-roboto antialiased", fontRoboto.className)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
