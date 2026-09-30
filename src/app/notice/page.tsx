import Link from "next/link";
import { getPublishedNotices } from "@/lib/mock-db";
import type { NoticeCategory } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

// ক্যাটাগরি অনুযায়ী আইকন, রঙ এবং লেবেল
const categoryMeta: Record<NoticeCategory, { icon: string; color: string; label: string }> = {
    EVENT: { icon: "🎉", color: "bg-purple-100 text-purple-700", label: "Event" },
    ACADEMIC: { icon: "🎓", color: "bg-blue-100 text-blue-700", label: "Academic" },
    CAREER: { icon: "💼", color: "bg-green-100 text-green-700", label: "Career" },
    URGENT: { icon: "🚨", color: "bg-red-100 text-red-700", label: "Urgent" },
    GENERAL: { icon: "📢", color: "bg-slate-100 text-slate-700", label: "General" },
};

type PageProps = {
    searchParams: Promise<{ search?: string; category?: string }>;
};

export default async function NoticePage({ searchParams }: PageProps) {
    const params = await searchParams;
    const search = params.search || "";
    const categoryFilter = params.category || "ALL";

    let notices = await getPublishedNotices();

    // সর্বশেষ আগে দেখাও
    notices = notices.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // ক্যাটাগরি ফিল্টার
    if (categoryFilter !== "ALL") {
        notices = notices.filter((n) => n.category === categoryFilter);
    }

    // সার্চ ফিল্টার
    if (search) {
        const s = search.toLowerCase();
        notices = notices.filter(
            (n) => n.title.toLowerCase().includes(s) || n.body.toLowerCase().includes(s)
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-800">Notices & Announcements</h1>
                <p className="mt-2 text-sm text-slate-500">
                    Stay updated with the latest news from our alumni community
                </p>
            </div>

            {/* Search Bar */}
            <form className="mx-auto mt-8 flex max-w-2xl gap-2">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                        🔍
                    </span>
                    <input
                        type="text"
                        name="search"
                        defaultValue={search}
                        placeholder="Search notices..."
                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            {/* Category Filter */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link
                    href={`/notice${search ? `?search=${search}` : ""}`}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                        categoryFilter === "ALL"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                    All
                </Link>
                {(Object.keys(categoryMeta) as NoticeCategory[]).map((key) => (
                    <Link
                        key={key}
                        href={`/notice?category=${key}${search ? `&search=${search}` : ""}`}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                            categoryFilter === key
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        {categoryMeta[key].icon} {categoryMeta[key].label}
                    </Link>
                ))}
            </div>

            {/* Notice List */}
            <div className="mt-8 space-y-4">
                {notices.length === 0 && (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                        <p className="text-4xl">📭</p>
                        <p className="mt-3 text-lg font-medium text-slate-600">No notices found</p>
                        <p className="mt-1 text-sm text-slate-400">
                            Try adjusting your search or filter criteria.
                        </p>
                    </div>
                )}

                {notices.map((n) => {
                    const meta = categoryMeta[n.category] || categoryMeta.GENERAL;
                    return (
                        <Link
                            key={n.id}
                            href={`/notice/${n.slug}`}
                            className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl ${meta.color}`}
                                >
                                    {meta.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span
                                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.color}`}
                                        >
                                            {meta.label}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {new Date(n.publishedAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="mt-2 text-lg font-bold text-slate-800 group-hover:text-blue-600">
                                        {n.title}
                                    </h3>
                                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                                        {n.body}
                                    </p>
                                </div>
                                <div className="hidden self-center text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500 sm:block">
                                    →
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}