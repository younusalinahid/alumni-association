import { getPublishedNotices } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export default async function NoticePage() {
    const notices = await getPublishedNotices();

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-2xl font-bold">Notices</h1>
            <p className="text-sm text-zinc-500">Stay updated with the latest announcements</p>

            {notices.length === 0 && (
                <p className="mt-8 text-sm text-zinc-400">No notices yet.</p>
            )}

            <div className="mt-6 space-y-3">
                {notices.map((n) => (
                    <div
                        key={n.id}
                        className="flex items-start gap-4 rounded-lg border border-black/10 bg-white p-4 shadow-sm"
                    >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <h3 className="font-bold text-zinc-800">{n.title}</h3>
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
        </div>
    );
}