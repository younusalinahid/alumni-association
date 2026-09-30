"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/alumni", label: "Alumni Management", icon: "👥" },
    { href: "/dashboard/notices", label: "Notices Manager", icon: "📰" },
    { href: "/dashboard/gallery", label: "Gallery", icon: "🖼️" },
    { href: "/dashboard/cms", label: "Website Content", icon: "📝" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 border-r border-gray-800 bg-slate-900 text-white">
            <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold">
                    AA
                </div>
                <span className="font-semibold">Alumni Association</span>
            </div>

            <nav className="mt-4 flex flex-col gap-1 px-3">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}