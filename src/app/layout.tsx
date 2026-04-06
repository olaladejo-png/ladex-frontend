import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getGlobalSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: {
    template: "%s | Ladex Group",
    default: "Ladex Group – Quality Without Compromise. Europe to Africa.",
  },
  description:
    "Germany-based procurement and export company supplying high-quality European equipment and industrial solutions to Nigeria and West Africa.",
  keywords: [
    "European equipment supply Nigeria",
    "industrial equipment West Africa",
    "Germany procurement Africa",
    "electrical equipment Nigeria",
    "PLC automation Nigeria",
    "Ladex Group",
    "equipment sourcing Nigeria",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Ladex Group",
    url: "https://ladexgroup.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getGlobalSettings();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <Header siteName={settings?.site_name || "Ladex Group"} />
        <main>{children}</main>
        <Footer settings={settings} />
        <WhatsAppButton />
      </body>
    </html>
  );
}
