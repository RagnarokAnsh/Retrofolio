import type { Metadata } from "next";
import "./globals.css";
import { SoundProvider } from "@/context/SoundContext";
import { BackgroundProvider } from "@/context/BackgroundContext";

export const metadata: Metadata = {
  title: "Retrofolio95 - Windows 95 Portfolio",
  description: "A nostalgic Windows 95-style portfolio with modern animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden select-none">
        <SoundProvider>
          <BackgroundProvider>
            {children}
          </BackgroundProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
