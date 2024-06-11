import { Roboto as FontRoboto, Inter as FontSans, Montserrat as FontMontserrat } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontRoboto = FontRoboto({
  subsets: ['vietnamese'],
  display: 'swap',
  weight: ['400', '500', '700', '300', '900'],
  variable: "--font-roboto",
});

export const fontMontserrat = FontMontserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})