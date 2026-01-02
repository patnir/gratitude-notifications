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
    images: [
      {
        url: "https://grateful.so/icon.png",
        width: 1024,
        height: 1024,
        alt: "Grateful App Icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Grateful - Daily Gratitude Journal",
    description:
      "A beautiful gratitude journaling app. Write daily entries, share with circles of friends and family, and build a lasting habit of gratitude.",
    images: ["https://grateful.so/icon.png"],
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
