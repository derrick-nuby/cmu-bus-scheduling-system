import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bus-tracker.rw";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Live Bus Tracker - Real-time Public Transport Monitoring",
      template: "%s | Live Bus Tracker",
    },
    description:
      "Live Bus Tracker provides real-time tracking of public buses in Rwanda, helping commuters know bus locations, estimated arrival times, and optimize their travel routes.",
    keywords: [
      "bus tracking Rwanda",
      "real-time bus locations",
      "public transport tracking",
      "live bus updates",
      "commuter tracking",
      "bus arrival times",
      "transport monitoring",
      "GPS bus tracking",
      "smart transit system",
    ],
    authors: [{ name: "Bus Tracker Team" }],
    creator: "Bus Tracker Project",
    publisher: "Bus Tracker Inc.",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: "Live Bus Tracker",
      title: "Live Bus Tracker - Real-time Public Transport Monitoring",
      description:
        "Live Bus Tracker provides real-time tracking of public buses in Rwanda, helping commuters know bus locations, estimated arrival times, and optimize their travel routes.",
      images: [
        {
          url: `${siteUrl}/images/site-main.png`,
          width: 1200,
          height: 630,
          alt: "Live Bus Tracker - Real-time Public Transport Monitoring",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Live Bus Tracker - Real-time Public Transport Monitoring",
      description:
        "Live Bus Tracker provides real-time tracking of public buses in Rwanda, helping commuters know bus locations, estimated arrival times, and optimize their travel routes.",
      images: [`${siteUrl}/images/site-main.png`],
      creator: "@BusTrackerRW",
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
    icons: {
      icon: [
        { url: "/images/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/images/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      other: [{ rel: "mask-icon", url: "/images/favicons/safari-pinned-tab.svg", color: "#5bbad5" }],
    },
    manifest: "/images/favicons/site.webmanifest",
  };
}