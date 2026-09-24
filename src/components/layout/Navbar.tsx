import Link from "next/link";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/alumni", label: "Directory" },
    { href: "/notice", label: "Notice" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-10 border-b border-black/10 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="font-semibold text-brand-700">
                    Alumni Association
                </Link>

                <nav className="hidden gap-6 text-sm text-zinc-600 md:flex">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="hover:text-brand-600">
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex gap-2">
                    <Link
                        href="/login"
                        className="rounded-md px-3 py-1.5 text-sm text-brand-700 hover:bg-brand-50"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-md bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
}