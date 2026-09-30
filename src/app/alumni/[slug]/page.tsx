import { notFound } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import Accordion from "@/components/ui/Accordion";
import ShareProfileButton from "@/components/alumni/ShareProfileButton";
import { getAlumniBySlug, generateVerificationQr } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

type ProfilePageProps = {
    params: Promise<{ slug: string }>;
};

export default async function AlumniProfilePage({ params }: ProfilePageProps) {
    const { slug } = await params;
    const alumnus = await getAlumniBySlug(slug);

    if (!alumnus) {
        notFound();
    }

    const qrCode = await generateVerificationQr(alumnus.id);
    const profileUrl = `http://localhost:3000/alumni/${alumnus.slug}`;

    return (
        <div className="min-h-screen bg-slate-50/50">

            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid gap-6 lg:grid-cols-[280px_1fr_320px]">

                    {/* LEFT COLUMN */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                            <div className="flex justify-center">
                                <Avatar name={alumnus.name} photoUrl={alumnus.photoUrl} size={110} />
                            </div>

                            <div className="mt-4 flex flex-col items-center justify-center gap-1">
                                <h1 className="text-xl font-bold text-slate-800">{alumnus.name}</h1>
                                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                                    Verified
                                </span>
                            </div>

                            <div className="mt-6 flex flex-col gap-1 text-left text-sm font-medium">
                                <button className="flex items-center gap-3 rounded-lg bg-blue-600 px-4 py-2.5 text-white transition">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    Home
                                </button>
                                <button className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-slate-600 transition hover:bg-slate-50">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    Community
                                </button>
                                <button className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-slate-600 transition hover:bg-slate-50">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                    Socials
                                </button>
                                <button className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-slate-600 transition hover:bg-slate-50">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    Gallery
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE COLUMN */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-6 md:flex-row md:items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-3xl font-bold text-slate-800">{alumnus.name}</h1>
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            Verified
                                        </span>
                                    </div>

                                    <div className="mt-4 grid gap-x-8 gap-y-3 text-sm text-slate-600 md:grid-cols-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-400">🆔</span>
                                            <span>Registration No</span>
                                            <span className="font-medium text-slate-800">: {alumnus.regNo}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-400">🎓</span>
                                            <span>Batch</span>
                                            <span className="font-medium text-slate-800">: {alumnus.batch?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-400">🏛️</span>
                                            <span>Department</span>
                                            <span className="font-medium text-slate-800">: {alumnus.department?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-400">✉️</span>
                                            <span>Email</span>
                                            <span className="font-medium text-slate-800">: {alumnus.email}</span>
                                        </div>
                                        {alumnus.phone && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-400">📞</span>
                                                <span>Mobile</span>
                                                <span className="font-medium text-slate-800">: {alumnus.phone}</span>
                                            </div>
                                        )}
                                        {alumnus.address && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-400">📍</span>
                                                <span>Address</span>
                                                <span className="font-medium text-slate-800">: {alumnus.address}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* এখানে || [] যোগ করা হয়েছে */}
                            <Accordion title="Education" icon={<span>🎓</span>} defaultOpen>
                                {(alumnus.education || []).length === 0 ? (
                                    <p className="text-zinc-400 p-2">No education added yet.</p>
                                ) : (
                                    <ul className="space-y-2 p-2">
                                        {(alumnus.education || []).map((e) => (
                                            <li key={e.id} className="text-sm text-slate-700">
                                                <span className="font-medium">{e.degree}</span> — {e.institution} ({e.year})
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Accordion>

                            <Accordion title="Work Experience" icon={<span>💼</span>}>
                                {(alumnus.experience || []).length === 0 ? (
                                    <p className="text-zinc-400 p-2">No experience added yet.</p>
                                ) : (
                                    <ul className="space-y-2 p-2">
                                        {(alumnus.experience || []).map((x) => (
                                            <li key={x.id} className="text-sm text-slate-700">
                                                <span className="font-medium">{x.role}</span> at {x.company} ({x.start} – {x.end})
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Accordion>

                            <Accordion title="Address Info" icon={<span>📍</span>}>
                                <div className="p-2 text-sm text-slate-700">
                                    {alumnus.address || <span className="text-zinc-400">No address provided.</span>}
                                </div>
                            </Accordion>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-slate-800">Verification Verified</h2>

                            <div className="space-y-3">
                                <a
                                    href={`/api/pdf/alumni/${alumnus.id}`}
                                    className="block w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    Download PDF
                                </a>
                                <ShareProfileButton url={profileUrl} />
                            </div>

                            <div className="mt-8 flex flex-col items-center">
                                <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={qrCode} alt="Verification QR Code" width={140} height={140} />
                                </div>
                                <p className="mt-3 text-xs font-medium text-slate-500">Scan to Verify</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}