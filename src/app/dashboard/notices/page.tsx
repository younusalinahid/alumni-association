"use client";

import { useEffect, useState } from "react";

type NoticeRow = {
    id: string;
    title: string;
    body: string;
    status: "DRAFT" | "PUBLISHED";
    publishedAt: string;
};

const initialForm = { title: "", body: "" };

export default function AdminNoticesPage() {
    const [notices, setNotices] = useState<NoticeRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [actingId, setActingId] = useState<string | null>(null);

    async function load() {
        setLoading(true);
        const res = await fetch("/api/notices");
        setNotices(await res.json());
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        await fetch("/api/notices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setForm(initialForm);
        setSubmitting(false);
        await load();
    }

    async function toggleStatus(notice: NoticeRow) {
        setActingId(notice.id);
        const newStatus = notice.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
        await fetch(`/api/notices/${notice.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });
        await load();
        setActingId(null);
    }

    async function handleDelete(id: string) {
        setActingId(id);
        await fetch(`/api/notices/${id}`, { method: "DELETE" });
        await load();
        setActingId(null);
    }

    return (
        <div>
            <h1 className="text-xl font-bold">Manage Notices</h1>

            <form onSubmit={handleCreate} className="mt-4 space-y-3 rounded-lg border border-black/10 bg-white p-4">
                <input
                    required
                    placeholder="Notice title"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                />
                <textarea
                    required
                    rows={3}
                    placeholder="Notice body"
                    value={form.body}
                    onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="cursor-pointer rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? "Creating..." : "Create Notice (as Draft)"}
                </button>
            </form>

            {loading && <p className="mt-4 text-sm text-zinc-400">Loading...</p>}

            <div className="mt-6 space-y-3">
                {notices.map((n) => (
                    <div key={n.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-black/10 bg-white p-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-zinc-800">{n.title}</span>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                        n.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-600"
                                    }`}
                                >
                  {n.status}
                </span>
                            </div>
                            <p className="mt-1 text-xs text-zinc-500">{n.body}</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleStatus(n)}
                                disabled={actingId === n.id}
                                className="cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {n.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                            </button>
                            <button
                                onClick={() => handleDelete(n.id)}
                                disabled={actingId === n.id}
                                className="cursor-pointer rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {!loading && notices.length === 0 && (
                    <p className="text-sm text-zinc-400">No notices yet.</p>
                )}
            </div>
        </div>
    );
}