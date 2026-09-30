"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
    alumniId: string;
    currentStatus: "PENDING" | "APPROVED" | "REJECTED";
};

export default function AlumniStatusButton({ alumniId, currentStatus }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    async function updateStatus(newStatus: "APPROVED" | "REJECTED") {
        setLoading(true);

        const res = await fetch("/api/admin/alumni/status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: alumniId, status: newStatus }),
        });

        if (res.ok) {
            startTransition(() => {
                router.refresh();
            });
        } else {
            alert("Failed to update status");
        }

        setLoading(false);
    }

    if (currentStatus === "APPROVED") {
        return (
            <div className="flex gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Approved
                </span>
                <button
                    onClick={() => updateStatus("REJECTED")}
                    disabled={loading || isPending}
                    className="rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200 disabled:opacity-50"
                >
                    Reject
                </button>
            </div>
        );
    }

    if (currentStatus === "REJECTED") {
        return (
            <div className="flex gap-2">
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Rejected
                </span>
                <button
                    onClick={() => updateStatus("APPROVED")}
                    disabled={loading || isPending}
                    className="rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700 transition hover:bg-green-200 disabled:opacity-50"
                >
                    Approve
                </button>
            </div>
        );
    }

    // PENDING
    return (
        <div className="flex gap-2">
            <button
                onClick={() => updateStatus("APPROVED")}
                disabled={loading || isPending}
                className="rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
            >
                {loading ? "..." : "Approve"}
            </button>
            <button
                onClick={() => updateStatus("REJECTED")}
                disabled={loading || isPending}
                className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
            >
                {loading ? "..." : "Reject"}
            </button>
        </div>
    );
}