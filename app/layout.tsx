import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://littlesclothing.com"),
  title: { default: "Little's | Big Love for Little Moments", template: "%s | Little's" },
  description: "Discover thoughtful baby essentials, soft clothing, playful toys, and gentle care picks at Little's—made for happy little days.",
  keywords: ["baby shop", "baby clothing", "newborn essentials", "baby toys", "baby gifts", "Little's"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Little's | Big Love for Little Moments",
    description: "Thoughtful baby essentials, playful finds, and cuddly comforts for your little one's happiest days.",
    url: "/",
    siteName: "Little's",
    images: [{ url: "/littles-hero.png", width: 1536, height: 1024, alt: "Little's baby boutique collection" }],
  },
  twitter: { card: "summary_large_image", title: "Little's | Big Love for Little Moments", description: "Beautiful little essentials for life's biggest love.", images: ["/littles-hero.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fffaf2" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
