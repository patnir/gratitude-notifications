import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grateful - Build a gratitude habit with friends and family",
  description:
    "A simple, beautiful gratitude journal. Write what you are thankful for, share with the people you love, and watch your perspective shift. Build a daily habit of gratitude together.",
  openGraph: {
    title: "Grateful - Build a gratitude habit with friends and family",
    description:
      "A simple, beautiful gratitude journal. Write what you are thankful for, share with the people you love, and watch your perspective shift. Create private circles for family or close friends and build a daily habit together.",
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
    title: "Grateful - Build a gratitude habit with friends and family",
    description:
      "A simple, beautiful gratitude journal. Write what you are thankful for, share with the people you love, and watch your perspective shift. Create private circles for family or close friends and build a daily habit together.",
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
