import Link from "next/link";
import Avatar from "@/components/ui/Avatar";

type AlumniCardProps = {
    alumnus: {
        id: string;
        name: string;
        regNo: string;
        slug: string;
        photoUrl: string | null;
        batch: { name: string } | null;
        department: { name: string } | null;
    };
};

export default function AlumniCard({ alumnus }: AlumniCardProps) {
    return (
        <div className="rounded-xl border border-black/10 p-4 text-center shadow-sm">
            <div className="flex justify-center">
                <Avatar name={alumnus.name} photoUrl={alumnus.photoUrl} size={64} />
            </div>
            <div className="mt-2 font-medium">{alumnus.name}</div>
            <div className="text-xs text-zinc-500">{alumnus.regNo}</div>
            <div className="text-xs text-zinc-400">
                {alumnus.department?.name} · {alumnus.batch?.name}
            </div>
            <Link
                href={`/alumni/${alumnus.slug}`}
                className="mt-3 inline-block rounded-md bg-brand-600 px-3 py-1 text-xs font-medium text-white"
            >
                View Profile
            </Link>
        </div>
    );
}