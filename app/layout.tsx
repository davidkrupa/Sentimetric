import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import PlausibleProvider from "next-plausible";

import "./globals.css";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sentimetric",
  description:
    "Unlock your career potential with our AI-powered job application presentation builder designed to help you stand out in the competitive job market. Our app goes beyond traditional cover letters and resumes by creating personalized presentations that show recruiters how your skills and experience align with company goals and values. Plus, we provide project ideas with SWOT analyses that will impress every recruiter.",
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
        <head>
          <PlausibleProvider domain="sentimetric.net" />
        </head>
        <body className={`${inter.className} bg-slate-950`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
