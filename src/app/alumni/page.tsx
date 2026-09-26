import { getApprovedAlumni } from "@/lib/mock-db";
import AlumniCard from "@/components/alumni/AlumniCard";
export const dynamic = "force-dynamic";

export default async function AlumniDirectoryPage() {
    const alumniList = await getApprovedAlumni();

    return (
        <div className="mx-auto max-w px-4 py-10">
            <h1 className="text-2xl font-bold">Alumni Directory</h1>
            <p className="text-sm text-zinc-500">Find and connect with fellow alumni</p>

            {alumniList.length === 0 && (
                <p className="mt-8 text-sm text-zinc-400">No alumni found.</p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                {alumniList.map((a) => (
                    <AlumniCard key={a.id} alumnus={a} />
                ))}
            </div>
        </div>
    );
}