import Link from "next/link";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import React from "react";

type SessionCookie = {
    email: string;
    role: "ADMIN" | "ALUMNI";
};

async function getSession(): Promise<SessionCookie | null> {
    const cookieStore = await cookies();
    const raw = cookieStore.get("mock_session")?.value;
    if (!raw) return null;

    try {
        return JSON.parse(raw) as SessionCookie;
    } catch {
        return null;
    }
}

export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
        redirect("/login");
    }

    return (
        <div className="mx-auto flex max-w gap-6 px-4 py-8">
            <aside className="w-48 flex-shrink-0 space-y-1 text-sm">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-md bg-brand-50 px-3 py-2 font-medium text-brand-700"
                >
                    <span>📊</span> Dashboard
                </Link>
                <Link
                    href="/dashboard/registrations"
                    className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-zinc-600 hover:bg-brand-50 hover:text-brand-700"
                >
                    <span>📝</span> Registrations
                </Link>
                <Link
                    href="/dashboard/notices"
                    className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-zinc-600 hover:bg-brand-50 hover:text-brand-700"
                >
                    <span>📰</span> Notices
                </Link>
            </aside>
            <div className="flex-1">{children}</div>
        </div>
    );
}