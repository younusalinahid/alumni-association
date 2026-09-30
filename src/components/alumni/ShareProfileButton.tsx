"use client";

import { useState } from "react";

export default function ShareProfileButton({ url }: { url: string }) {
    const [copied, setCopied] = useState(false);

    async function handleShare() {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
        }
    }

    return (
        <button
            onClick={handleShare}
            className="w-full cursor-pointer rounded-md bg-green-600 py-2 text-sm font-medium text-white transition hover:bg-green-700"
        >
            {copied ? "Link Copied!" : "Share Profile"}
        </button>
    );
}