import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import "./globals.css";
import PageTransition from "@/components/shared/PageTransition";
import Providers from "@/lib/Providers";
import { TooltipProvider } from "@/components/ui/tooltip";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={jetbrainsMono.variable}>
          <PageTransition>
            <TooltipProvider>
              {" "}
              {/* ✅ Wrap your app with TooltipProvider */}
              {children}
            </TooltipProvider>
          </PageTransition>
        </body>
      </html>
    </Providers>
  );
}
