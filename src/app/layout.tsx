import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "./SocketProvider";
import WalletProvider from "./WalletProvider";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Boop",
  description:
    "Boop is a social commerce platform that enables simple social commerce: sell products via links, accept USDC on any chain, and receive funds on your preferred chain using CCTP V2.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased bg-[#000] text-white`}>
        <SocketProvider>
          <WalletProvider>{children}</WalletProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
