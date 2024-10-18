import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MIA SWE Challenge",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed flex flex-row items-center px-6 h-16 border border-border inset-x-3 top-3 rounded-xl text-xl font-semibold bg-background shadow bg-gradient-to-b from-[#41748D] to-[#00A3E0] p-4 flex justify-between">
          <Link href="https://www.mlb.com/marlins">
            <img
              src="https://www.mlbstatic.com/team-logos/team-cap-on-dark/146.svg"
              style={{ height: "32px" }}
            />
          </Link>
        </nav>
        <main className="pt-24 px-8">{children}</main>
      </body>
    </html>
  );
}
