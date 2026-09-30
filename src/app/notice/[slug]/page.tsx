import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoticeBySlug, getPublishedNotices } from "@/lib/mock-db";
import type { NoticeCategory } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

type NoticeDetailProps = {
    params: Promise<{ slug: string }>;
};

const categoryMeta: Record<NoticeCategory, { icon: string; color: string; label: string }> = {
    EVENT: { icon: "🎉", color: "bg-purple-100 text-purple-700", label: "Event" },
    ACADEMIC: { icon: "🎓", color: "bg-blue-100 text-blue-700", label: "Academic" },
    CAREER: { icon: "💼", color: "bg-green-100 text-green-700", label: "Career" },
    URGENT: { icon: "🚨", color: "bg-red-100 text-red-700", label: "Urgent" },
    GENERAL: { icon: "📢", color: "bg-slate-100 text-slate-700", label: "General" },
};

export default async function NoticeDetailPage({ params }: NoticeDetailProps) {
    const { slug } = await params;
    const notice = await getNoticeBySlug(slug);

    if (!notice) {
        notFound();
    }

    const meta = categoryMeta[notice.category] || categoryMeta.GENERAL;

    const allNotices = await getPublishedNotices();
    const related = allNotices
        .filter((n) => n.id !== notice.id)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 3);

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            {/* Back Link */}
            <Link
                href="/notice"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
                ← Back to Notices
            </Link>

            {/* Notice Card */}
            <article className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                {/* Category Badge + Date */}
                <div className="flex flex-wrap items-center gap-3">
                    <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.color}`}
                    >
                        <span>{meta.icon}</span>
                        {meta.label}
                    </span>
                    <span className="text-xs text-slate-400">
                        {new Date(notice.publishedAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>

                {/* Title */}
                <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-800">
                    {notice.title}
                </h1>

                {/* Divider */}
                <hr className="my-6 border-gray-100" />

                {/* Body */}
                <div className="prose prose-slate max-w-none">
                    <p className="whitespace-pre-line text-base leading-relaxed text-slate-600">
                        {notice.body}
                    </p>
                </div>

                {/* Footer Note */}
                <div className="mt-8 rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                    📌 This is an official notice from the Alumni Association. For any questions, please
                    contact the administration office.
                </div>
            </article>

            {/* Related Notices */}
            {related.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-lg font-bold text-slate-800">Other Notices</h2>
                    <div className="mt-4 space-y-3">
                        {related.map((n) => {
                            const m = categoryMeta[n.category] || categoryMeta.GENERAL;
                            return (
                                <Link
                                    key={n.id}
                                    href={`/notice/${n.slug}`}
                                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
                                >
                                    <span
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${m.color}`}
                                    >
                                        {m.icon}
                                    </span>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-800 hover:text-blue-600">
                                            {n.title}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {new Date(n.publishedAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <span className="text-slate-300">→</span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}