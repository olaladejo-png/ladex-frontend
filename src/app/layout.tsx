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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
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

  const siteName = settings?.site_name || "Ladex Group";
  const email = settings?.contact_email || "sales@ladexgroup.com";
  const rawWa = settings?.contact_phone || "+49 1521 816 2816";
  const whatsappUrl = `https://wa.me/${rawWa.replace(/\D/g, '')}`;
  const linkedinUrl = settings?.linkedin_url || "https://linkedin.com/in/iyiola-ladejo";

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <Header siteName={siteName} email={email} whatsappUrl={whatsappUrl} />
        <main>{children}</main>
        <Footer settings={settings} />
        <WhatsAppButton linkedinUrl={linkedinUrl} whatsappUrl={whatsappUrl} />
      </body>
    </html>
  );
}
