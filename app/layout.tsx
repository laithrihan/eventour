import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/utils/cn";
import LightRays from "@/components/ui/LightRays";
import Navbar from "@/components/layout/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const SchibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventour",
  description: "The Hub for all Dev Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "min-h-screen",
        "h-full",
        "antialiased",
        SchibstedGrotesk.variable,
        MartianMono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="absolute inset-0 z-[-1] top-0 min-h-screen">
          <LightRays />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
