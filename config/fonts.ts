import { Fira_Code as FontMono, Inter as FontSans, Poppins } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontPoppins = Poppins({
  subsets: ["latin"], weight: ['400', '500', '600', '700'],
  variable: "--font-poppins",
});