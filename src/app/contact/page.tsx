"use client";

import { useState } from "react";

type FormState = {
    name: string;
    email: string;
    message: string;
};

const initialForm: FormState = { name: "", email: "", message: "" };

export default function ContactPage() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function updateField(field: keyof FormState, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            setSuccess(true);
            setForm(initialForm);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="text-2xl font-bold">Contact Us</h1>
            <p className="mt-1 text-sm text-zinc-500">
                Have a question? Send us a message and we&apos;ll get back to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block text-sm">
                    <span className="mb-1 block font-medium text-zinc-700">Name</span>
                    <input
                        required
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                    />
                </label>

                <label className="block text-sm">
                    <span className="mb-1 block font-medium text-zinc-700">Email</span>
                    <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                    />
                </label>

                <label className="block text-sm">
                    <span className="mb-1 block font-medium text-zinc-700">Message</span>
                    <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                    />
                </label>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-green-600">Message sent! We&apos;ll reply soon.</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer rounded-md bg-brand-600 px-5 py-2 font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
}