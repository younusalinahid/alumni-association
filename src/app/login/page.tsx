"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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

    function fillDemo(type: "admin" | "alumni") {
        if (type === "admin") {
            setEmail("admin@alumni.test");
            setPassword("admin123");
        } else {
            setEmail("rahman@example.com");
            setPassword("alumni123");
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                    <div className="text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
                            🎓
                        </div>
                        <h1 className="mt-4 text-2xl font-bold text-slate-800">
                            Welcome Back
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Log in to your Alumni Association account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? "Logging in..." : "Login →"}
                        </button>
                    </form>

                    <div className="mt-6 rounded-lg border border-dashed border-blue-200 bg-blue-50 p-4">
                        <p className="text-center text-xs font-medium text-blue-700">
                            Demo Accounts (Click to fill)
                        </p>
                        <div className="mt-3 flex gap-2">
                            <button
                                type="button"
                                onClick={() => fillDemo("admin")}
                                className="flex-1 rounded-lg bg-white px-3 py-2 text-xs font-medium text-blue-700 shadow-sm transition hover:bg-blue-100"
                            >
                                👑 Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemo("alumni")}
                                className="flex-1 rounded-lg bg-white px-3 py-2 text-xs font-medium text-blue-700 shadow-sm transition hover:bg-blue-100"
                            >
                                🎓 Alumni
                            </button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}