import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grateful - Daily Gratitude Journal",
  description:
    "A beautiful gratitude journaling app. Write daily entries, share with circles of friends and family, track your streak, and build a lasting habit of gratitude.",
  openGraph: {
    title: "Grateful - Daily Gratitude Journal",
    description:
      "A beautiful gratitude journaling app. Write daily entries, share with circles of friends and family, and build a lasting habit of gratitude.",
    url: "https://grateful.so",
    siteName: "Grateful",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grateful - Daily Gratitude Journal",
    description:
      "A beautiful gratitude journaling app. Write daily entries, share with circles of friends and family, and build a lasting habit of gratitude.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
