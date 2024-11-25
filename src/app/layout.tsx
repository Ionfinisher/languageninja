import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

const NotoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Language Ninja",
    template: "%s | Language Ninja",
  },
  icons: {
    icon: "/ninja-logo.png",
    shortcut: "/ninja-logo.png",
    apple: "/ninja-logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/ninja-logo.png",
    },
  },
  authors: [
    {
      name: "Teddy ASSIH",
      url: "https://www.linkedin.com/in/teddy-assih-b4204b254/",
    },
  ],
  description:
    "AI powered language learning assistant that helps you learn any langage books in no time. Just tell him what you need to learn for.",
  keywords:
    "SambaNova, Language Ninja, AI, Language, Learn, Assistant, Next.js",
  openGraph: {
    title: "Language Ninja",
    description:
      "AI powered language learning assistant that helps you learn any langage books in no time. Just tell him what you need to learn for.",
    url: "https://askiq.vercel.app",
    siteName: "Language Ninja",
    images: [
      {
        url: "/og.png",
        width: 2530,
        height: 1148,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Language Ninja",
    card: "summary_large_image",
    description:
      "AI powered language learning assistant that helps you learn any langage books in no time. Just tell him what you need to learn for.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NotoSansJP.className} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
