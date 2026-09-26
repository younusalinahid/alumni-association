import Link from "next/link";
import Image from "next/image";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/alumni", label: "Alumni" },
    { href: "/notice", label: "Notice" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-10 border-b border-black/10 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/logo.png"
                        alt="Alumni Association logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="font-bold text-brand-700">Alumni Association</span>
                </Link>

                <nav className="hidden gap-6 text-sm font-medium text-zinc-600 md:flex">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="hover:text-brand-600">
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex gap-2">
                    <Link
                        href="/login"
                        className="rounded-md px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
}