"use client";

import { useEffect, useState } from "react";

type PendingAlumnus = {
    id: string;
    name: string;
    regNo: string;
    email: string;
    status: string;
    batch: { name: string } | null;
    department: { name: string } | null;
};

export default function RegistrationsPage() {
    const [rows, setRows] = useState<PendingAlumnus[]>([]);
    const [loading, setLoading] = useState(true);
    const [actingId, setActingId] = useState<string | null>(null);

    async function load() {
        setLoading(true);
        const res = await fetch("/api/registrations");
        const data = await res.json();
        setRows(data);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    async function act(id: string, status: "APPROVED" | "REJECTED") {
        setActingId(id);
        await fetch(`/api/registrations/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        await load();
        setActingId(null);
    }

    return (
        <div>
            <h1 className="text-xl font-bold">Pending Registrations</h1>

            {loading && <p className="mt-4 text-sm text-zinc-400">Loading...</p>}

            <div className="mt-4 space-y-3">
                {rows.map((a) => (
                    <div
                        key={a.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-black/10 bg-white p-4 shadow-sm"
                    >
                        <div>
                            <div className="font-medium text-zinc-800">
                                {a.name} <span className="text-xs text-zinc-400">({a.regNo})</span>
                            </div>
                            <div className="text-xs text-zinc-500">
                                {a.department?.name} · {a.batch?.name} · {a.email}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => act(a.id, "APPROVED")}
                                disabled={actingId === a.id}
                                className="cursor-pointer rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => act(a.id, "REJECTED")}
                                disabled={actingId === a.id}
                                className="cursor-pointer rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}

                {!loading && rows.length === 0 && (
                    <p className="text-sm text-zinc-400">No pending registrations.</p>
                )}
            </div>
        </div>
    );
}