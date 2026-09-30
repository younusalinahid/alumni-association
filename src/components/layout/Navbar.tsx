"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    if (pathname.startsWith("/dashboard")) {
        return null;
    }

    return (
        <nav className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-xs font-bold text-white">
                    AA
                </div>
                <span className="font-semibold text-slate-800">Alumni Association</span>
            </div>

            {/* Nav Links */}
            <div className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <Link href="/about" className="hover:text-blue-600">About</Link>
                <Link href="/alumni" className="hover:text-blue-600">Alumni</Link>
                <Link href="/notice" className="hover:text-blue-600">Notice</Link>
                <Link href="/gallery" className="hover:text-blue-600">Gallery</Link>
                <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                    Login
                </Link>
                <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Register
                </Link>
            </div>
        </nav>
    );
}