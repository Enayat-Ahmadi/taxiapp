import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "EidsvollTaxi - Premium Taxi Booking",
  description:
    "Premium taxi booking service for the discerning traveler. Professional drivers, luxury vehicles, and seamless booking experience.",
  keywords: [
    "taxi",
    "booking",
    "ride",
    "transportation",
    "luxury",
    "airport transfer",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="bg-sky text-foreground antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
          <Toaster richColors position="top-right" />
        </div>
      </body>
    </html>
  );
}
