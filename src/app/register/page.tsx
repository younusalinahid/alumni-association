"use client";

import Link from "next/link";
import { useState } from "react";
import RegisterInfoCard from "@/components/forms/RegisterInfoCard";

const BATCHES = [
    { id: "b2018", name: "Batch 2018" },
    { id: "b2019", name: "Batch 2019" },
    { id: "b2020", name: "Batch 2020" },
];

const DEPARTMENTS = [
    { id: "cse", name: "Computer Science & Engineering" },
    { id: "bba", name: "Business Administration" },
    { id: "eee", name: "Electrical & Electronic Engineering" },
];

type FormState = {
    name: string;
    regNo: string;
    email: string;
    phone: string;
    batchId: string;
    departmentId: string;
    address: string;
    photoUrl: string;
};

const initialForm: FormState = {
    name: "",
    regNo: "",
    email: "",
    phone: "",
    batchId: "",
    departmentId: "",
    address: "",
    photoUrl: "",
};

export default function RegisterPage() {
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
            const res = await fetch("/api/registrations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            setSuccess(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-12">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                        ✓
                    </div>
                    <h1 className="mt-5 text-2xl font-bold text-slate-800">
                        Registration Submitted!
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Your registration is now <strong className="text-yellow-600">PENDING</strong>.
                        An admin will review your application soon.
                    </p>
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                        <Link
                            href="/"
                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                            Go Home
                        </Link>
                        <Link
                            href="/login"
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <div className="mx-auto max-w-6xl px-4">
                <div className="text-center">
                    <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-medium tracking-wider text-blue-700">
                        ✨ JOIN OUR COMMUNITY
                    </span>
                    <h1 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
                        Alumni Registration
                    </h1>
                    <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
                        Fill out the form below to become a member of our alumni community.
                        Your application will be reviewed by our admin team.
                    </p>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
                    >
                        <h2 className="text-lg font-semibold text-slate-800">
                            Personal Information
                        </h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                    Full Name *
                                </label>
                                <input
                                    required
                                    value={form.name}
                                    onChange={(e) => updateField("name", e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                    Registration No *
                                </label>
                                <input
                                    required
                                    value={form.regNo}
                                    onChange={(e) => updateField("regNo", e.target.value)}
                                    placeholder="CSE-2018-014"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                    Phone Number
                                </label>
                                <input
                                    value={form.phone}
                                    onChange={(e) => updateField("phone", e.target.value)}
                                    placeholder="+880 1700-000000"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <h2 className="mt-8 text-lg font-semibold text-slate-800">
                            Academic Information
                        </h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                    Batch *
                                </label>
                                <select
                                    required
                                    value={form.batchId}
                                    onChange={(e) => updateField("batchId", e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select batch</option>
                                    {BATCHES.map((b) => (
                                        <option key={b.id} value={b.id}>
                                            {b.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                    Department *
                                </label>
                                <select
                                    required
                                    value={form.departmentId}
                                    onChange={(e) => updateField("departmentId", e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select department</option>
                                    {DEPARTMENTS.map((d) => (
                                        <option key={d.id} value={d.id}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <h2 className="mt-8 text-lg font-semibold text-slate-800">
                            Additional Information
                        </h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                    Current Address
                                </label>
                                <input
                                    value={form.address}
                                    onChange={(e) => updateField("address", e.target.value)}
                                    placeholder="Dhaka, Bangladesh"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                    Profile Photo URL{" "}
                                    <span className="text-slate-400">(optional)</span>
                                </label>
                                <input
                                    value={form.photoUrl}
                                    onChange={(e) => updateField("photoUrl", e.target.value)}
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                                <p className="mt-1 text-xs text-slate-400">
                                    Provide a direct image URL for your profile picture
                                </p>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-8 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Submitting..." : "Submit Registration →"}
                        </button>

                        <p className="mt-4 text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-medium text-blue-600 hover:text-blue-700"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>

                    <RegisterInfoCard />
                </div>
            </div>
        </div>
    );
}