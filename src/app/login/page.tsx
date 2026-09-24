"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            if (data.role === "ADMIN") {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-sm px-4 py-16">
            <h1 className="text-2xl font-bold">Login</h1>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block text-sm">
                    <span className="mb-1 block font-medium text-zinc-700">Email</span>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                    />
                </label>

                <label className="block text-sm">
                    <span className="mb-1 block font-medium text-zinc-700">Password</span>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                    />
                </label>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-brand-600 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-xs text-zinc-400">
                    Demo admin: admin@alumni.test / admin123
                    <br />
                    Demo alumni: rahman@example.com / alumni123
                </p>
            </form>
        </div>
    );
}