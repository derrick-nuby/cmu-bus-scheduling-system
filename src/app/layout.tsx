import { Work_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { generateMetadata, viewport } from "./metadata";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export { generateMetadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${workSans.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

