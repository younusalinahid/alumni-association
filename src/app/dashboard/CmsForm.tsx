"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
    label: string;
    contentKey: string;
    defaultValue: string;
    isTextarea?: boolean;
};

export default function CmsForm({ label, contentKey, defaultValue, isTextarea }: Props) {
    const [value, setValue] = useState(defaultValue);
    const [isPending, startTransition] = useTransition();
    const [saved, setSaved] = useState(false);
    const router = useRouter();

    async function handleSave() {
        const res = await fetch("/api/admin/cms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: contentKey, value }),
        });

        if (res.ok) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
            startTransition(() => router.refresh());
        } else {
            alert("Failed to save");
        }
    }

    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
            {isTextarea ? (
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            )}
            <button
                onClick={handleSave}
                disabled={isPending}
                className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
                {isPending ? "Saving..." : saved ? "✓ Saved" : "Save"}
            </button>
        </div>
    );
}