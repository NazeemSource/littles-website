import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://littlesclothing.com"),
  title: { default: "Little's | Big Love for Little Moments", template: "%s | Little's" },
  description: "Shop newborn essentials, baby clothing, diapers, skincare, grooming, feeding products, toys, and nursery essentials at Little's.",
  keywords: ["baby shop", "baby clothing", "newborn essentials", "diapers and wipes", "baby skincare", "baby grooming", "feeding essentials", "baby toys", "nursery essentials", "Little's"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Little's | Big Love for Little Moments",
    description: "Baby clothing, diapering, skincare, feeding, toys, grooming, and nursery essentials for happy little days.",
    url: "/",
    siteName: "Little's",
    images: [{ url: "/littles-hero.png", width: 1536, height: 1024, alt: "Little's baby boy and baby girl boutique collection" }],
  },
  twitter: { card: "summary_large_image", title: "Little's | Big Love for Little Moments", description: "Beautiful little essentials for life's biggest love.", images: ["/littles-hero.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7fbff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
