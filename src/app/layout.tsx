import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const siteUrl = "https://alumni-association-zeta.vercel.app";
const siteDescription =
    "Alumni Association Management Platform — connect, verify and manage alumni in one place. Built with Next.js, React and TypeScript.";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: "Alumni Association",
    description: siteDescription,
    openGraph: {
        type: "website",
        url: siteUrl,
        siteName: "Alumni Association",
        title: "Alumni Association Management Platform",
        description: siteDescription,
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Alumni Association Management Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Alumni Association Management Platform",
        description: siteDescription,
        images: ["/og-image.png"],
    },
};

export default function RootLayout({children}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">
        <Navbar/>
        <main className="flex-1">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
