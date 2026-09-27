import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/ui/StatCard";
import { getStats, getPublishedNotices, getPageContent } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const stats = await getStats();
    const notices = await getPublishedNotices();
    const content = await getPageContent();

    return (
        <div>
            <section
                className="relative flex min-h-[420px] items-center overflow-hidden text-center text-white sm:min-h-[500px]">
                <Image
                    src="/images/campus-hero.jpg"
                    alt="University campus"
                    fill
                    priority
                    className="object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-black/60"/>

                <div className="relative z-10 w-full px-4">
                    <h1 className="text-3xl font-bold md:text-4xl">
                        {content["homepage.hero.title"]}
                    </h1>
                    <p className="mx-auto mt-3 max-w-xl text-zinc-100">
                        {content["homepage.hero.subtitle"]}
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        <Link href="/register" className="rounded-md bg-white px-5 py-2 font-medium text-brand-700">
                            Join Now
                        </Link>
                        <Link href="/alumni" className="rounded-md border border-white px-5 py-2 font-medium">
                            Explore Alumni
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto mt-8 grid max-w grid-cols-2 gap-4 px-4 md:grid-cols-4">
                <StatCard
                    label="Members"
                    value={`${stats.totalAlumni}+`}
                    color="blue"
                    icon={
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    }
                />
                <StatCard
                    label="Registered Members"
                    value={`${stats.registeredMembers}+`}
                    color="green"
                    icon={
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8l-3 3-1.5-1.5" />
                        </svg>
                    }
                />
                <StatCard
                    label="Batch"
                    value={`${stats.batches}+`}
                    color="purple"
                    icon={
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                            <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
                        </svg>
                    }
                />
                <StatCard
                    label="Together Forever"
                    value="100%"
                    color="amber"
                    icon={
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
                        </svg>
                    }
                />
            </section>

            <section className="mx-auto mt-12 max-w px-4 pb-16">
                <h2 className="mb-4 text-lg font-bold text-zinc-800">Latest Notice</h2>
                {notices.length === 0 && (
                    <p className="text-sm text-zinc-500">No notices yet.</p>
                )}
                <div className="space-y-3">
                    {notices.map((n) => (
                        <div
                            key={n.id}
                            className="flex items-start gap-4 rounded-lg border border-black/10 bg-white p-4 shadow-sm"
                        >
                            <div
                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2">
                                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h3 className="font-bold text-zinc-800">
                                        <Link href={`/notice/${n.slug}`} className="hover:text-brand-600">
                                            {n.title}
                                        </Link>
                                    </h3>
                                    <span className="text-xs text-zinc-400">
              {new Date(n.publishedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })}
            </span>
                                </div>
                                <p className="mt-1 text-sm text-zinc-500">{n.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}