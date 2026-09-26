import { notFound } from "next/navigation";
import { getAlumniBySlug } from "@/lib/mock-db";
import Avatar from "@/components/ui/Avatar";
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

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <div className="flex gap-6 rounded-xl border border-black/10 p-6 shadow-sm">
                <Avatar name={alumnus.name} photoUrl={alumnus.photoUrl} size={112} />
                <div>
                    <h1 className="text-xl font-bold">{alumnus.name}</h1>
                    <div className="text-sm text-zinc-500">{alumnus.regNo}</div>
                    <div className="mt-1 text-sm text-zinc-600">
                        {alumnus.department?.name} · {alumnus.batch?.name}
                    </div>
                    <div className="mt-1 text-sm text-zinc-600">{alumnus.email}</div>
                    {alumnus.address && (
                        <div className="text-sm text-zinc-500">{alumnus.address}</div>
                    )}
                </div>
            </div>

            {alumnus.bio && (
                <div className="mt-6">
                    <h2 className="font-semibold">About Me</h2>
                    <p className="mt-1 text-sm text-zinc-600">{alumnus.bio}</p>
                </div>
            )}
        </div>
    );
}