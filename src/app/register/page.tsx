"use client";

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
            <div className="mx-auto max-w-md px-4 py-16 text-center">
                <h1 className="text-xl font-semibold text-green-700">
                    Registration submitted
                </h1>
                <p className="mt-2 text-sm text-zinc-600">
                    Your registration is now PENDING. An admin will review it soon.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-10">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Alumni Registration</h1>
                <p className="mt-1 text-sm text-zinc-500">
                    Fill up the form to become a member of our alumni community
                </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm">
                            <span className="mb-1 block font-medium text-zinc-700">Full Name</span>
                            <input
                                required
                                value={form.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                            />
                        </label>

                        <label className="block text-sm">
                            <span className="mb-1 block font-medium text-zinc-700">Registration No</span>
                            <input
                                required
                                value={form.regNo}
                                onChange={(e) => updateField("regNo", e.target.value)}
                                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                            />
                        </label>

                        <label className="block text-sm">
                            <span className="mb-1 block font-medium text-zinc-700">Email Address</span>
                            <input
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => updateField("email", e.target.value)}
                                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                            />
                        </label>

                        <label className="block text-sm">
                            <span className="mb-1 block font-medium text-zinc-700">Phone Number</span>
                            <input
                                value={form.phone}
                                onChange={(e) => updateField("phone", e.target.value)}
                                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                            />
                        </label>

                        <label className="block text-sm">
                            <span className="mb-1 block font-medium text-zinc-700">Batch</span>
                            <select
                                required
                                value={form.batchId}
                                onChange={(e) => updateField("batchId", e.target.value)}
                                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                            >
                                <option value="">Select batch</option>
                                {BATCHES.map((b) => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                        </label>

                        <label className="block text-sm">
                            <span className="mb-1 block font-medium text-zinc-700">Department</span>
                            <select
                                required
                                value={form.departmentId}
                                onChange={(e) => updateField("departmentId", e.target.value)}
                                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                            >
                                <option value="">Select department</option>
                                {DEPARTMENTS.map((d) => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </label>

                        <label className="block text-sm">
                            <span className="mb-1 block font-medium text-zinc-700">Current Address</span>
                            <input
                                value={form.address}
                                onChange={(e) => updateField("address", e.target.value)}
                                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                            />
                        </label>

                        <label className="block text-sm">
              <span className="mb-1 block font-medium text-zinc-700">
                Profile Photo URL <span className="text-zinc-400">(optional)</span>
              </span>
                            <input
                                value={form.photoUrl}
                                onChange={(e) => updateField("photoUrl", e.target.value)}
                                placeholder="https://..."
                                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                            />
                        </label>
                    </div>

                    {error && <p className="text-center text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-brand-600 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Register Now"}
                    </button>

                    <p className="text-center text-sm text-zinc-500">
                        Already have an account?{" "}
                        <a href="/login" className="font-medium text-brand-600">
                            Login here
                        </a>
                    </p>
                </form>

                <RegisterInfoCard />
            </div>
        </div>
    );
}