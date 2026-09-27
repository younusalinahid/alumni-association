import { notFound } from "next/navigation";
import { getNoticeBySlug } from "@/lib/mock-db";


export const dynamic = "force-dynamic";

type NoticeDetailProps = {
    params: Promise<{ slug: string }>;
};

export default async function NoticeDetailPage({ params }: NoticeDetailProps) {
    const { slug } = await params;
    const notice = await getNoticeBySlug(slug);

    if (!notice) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <a href="/notice" className="text-sm text-brand-600">
                ← Back to Notices
            </a>

            <div className="mt-4 rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="text-xs text-zinc-400">
                    {new Date(notice.publishedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </div>
                <h1 className="mt-1 text-2xl font-bold text-zinc-800">{notice.title}</h1>
                <p className="mt-3 text-zinc-600">{notice.body}</p>
            </div>
        </div>
    );
}