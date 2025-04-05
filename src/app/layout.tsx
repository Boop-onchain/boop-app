import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import WalletProvider from "./WalletProvider";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Boop",
  description: "Boop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased bg-[#000] text-white`}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
