import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "@/app/dashboard/Sidebar";

type SessionCookie = {
    email: string;
    role: "ADMIN" | "ALUMNI";
};

async function getSession(): Promise<SessionCookie | null> {
    const cookieStore = await cookies();
    const raw = cookieStore.get("mock_session" as any)?.value;
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
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
                    <h1 className="text-lg font-semibold text-slate-800">
                        Admin Panel
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">
                            Welcome, {session.email}
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                            A
                        </div>
                    </div>
                </header>
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
}