"use client";

import { useEffect, useState } from "react";

const fields: { key: string; label: string; multiline?: boolean }[] = [
    { key: "homepage.hero.title", label: "Homepage Hero Title" },
    { key: "homepage.hero.subtitle", label: "Homepage Hero Subtitle" },
    { key: "about.title", label: "About Page Title" },
    { key: "about.description", label: "About Page Description", multiline: true },
];

export default function AdminCmsPage() {
    const [content, setContent] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [savingKey, setSavingKey] = useState<string | null>(null);
    const [savedKey, setSavedKey] = useState<string | null>(null);

    async function load() {
        setLoading(true);
        const res = await fetch("/api/cms");
        setContent(await res.json());
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    function updateField(key: string, value: string) {
        setContent((prev) => ({ ...prev, [key]: value }));
    }

    async function handleSave(key: string) {
        setSavingKey(key);
        setSavedKey(null);

        await fetch("/api/cms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, value: content[key] }),
        });

        setSavingKey(null);
        setSavedKey(key);
        setTimeout(() => setSavedKey(null), 2000);
    }

    if (loading) {
        return <p className="text-sm text-zinc-400">Loading...</p>;
    }

    return (
        <div>
            <h1 className="text-xl font-bold">Website Content</h1>
            <p className="mt-1 text-sm text-zinc-500">Edit text shown on the public homepage and about page.</p>

            <div className="mt-6 space-y-5">
                {fields.map((field) => (
                    <div key={field.key} className="rounded-lg border border-black/10 bg-white p-4">
                        <label className="block text-sm">
                            <span className="mb-1 block font-medium text-zinc-700">{field.label}</span>
                            {field.multiline ? (
                                <textarea
                                    rows={4}
                                    value={content[field.key] ?? ""}
                                    onChange={(e) => updateField(field.key, e.target.value)}
                                    className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                                />
                            ) : (
                                <input
                                    value={content[field.key] ?? ""}
                                    onChange={(e) => updateField(field.key, e.target.value)}
                                    className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                                />
                            )}
                        </label>

                        <div className="mt-2 flex items-center gap-3">
                            <button
                                onClick={() => handleSave(field.key)}
                                disabled={savingKey === field.key}
                                className="cursor-pointer rounded-md bg-brand-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {savingKey === field.key ? "Saving..." : "Save"}
                            </button>
                            {savedKey === field.key && (
                                <span className="text-xs text-green-600">Saved!</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}