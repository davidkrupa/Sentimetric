import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sentimetric",
  description: "App for measure customers sentiments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* disabling warning caused by shadcn theme provider in html */}
      <html lang="en" suppressHydrationWarning={true}>
        <body className={poppins.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
