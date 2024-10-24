import type { Metadata } from "next";
import { AuthContextProvider } from "./context";
import { Navigation } from "./components/Navigation";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "BtcBit Front End test",
  description: "Github repo: https://github.com/shadyjuggler/btcbittest",
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-white h-screen overflow-x-hidden ">
        <AuthContextProvider>
          <Navigation />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
