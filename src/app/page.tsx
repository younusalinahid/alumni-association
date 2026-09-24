import Link from "next/link";
import { getStats, getPublishedNotices } from "@/lib/mock-db";
import StatCard from "@/components/ui/StatCard";

export default async function HomePage() {
    const stats = await getStats();
    const notices = await getPublishedNotices();

    return (
        <div>
            <section className="bg-brand-700 py-16 text-center text-white">
                <h1 className="text-3xl font-bold md:text-4xl">
                    Welcome to Our Alumni Community
                </h1>
                <p className="mx-auto mt-3 max-w-xl text-brand-100">
                    Reconnecting Friends · Building Networks · Shaping the Future
                </p>
                <div className="mt-6 flex justify-center gap-3">
                    <Link
                        href="/register"
                        className="rounded-md bg-white px-5 py-2 font-medium text-brand-700"
                    >
                        Join Now
                    </Link>
                    <Link
                        href="/alumni"
                        className="rounded-md border border-white px-5 py-2 font-medium"
                    >
                        Explore Alumni
                    </Link>
                </div>
            </section>

            <section className="mx-auto -mt-8 grid max-w-5xl grid-cols-2 gap-4 px-4 md:grid-cols-3">
                <StatCard label="Total Alumni" value={stats.totalAlumni} />
                <StatCard label="Pending Review" value={stats.pending} />
                <StatCard label="Batches" value={stats.batches} />
            </section>

            <section className="mx-auto mt-12 max-w-3xl px-4 pb-16">
                <h2 className="mb-3 text-lg font-semibold">Latest Notice</h2>
                {notices.length === 0 && (
                    <p className="text-sm text-zinc-500">No notices yet.</p>
                )}
                {notices.map((n) => (
                    <div key={n.id} className="rounded-lg border border-black/10 p-4">
                        <div className="font-medium">{n.title}</div>
                        <div className="text-sm text-zinc-500">{n.body}</div>
                    </div>
                ))}
            </section>
        </div>
    );
}