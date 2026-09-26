import Link from "next/link";
import { getStats, getPendingRegistrations } from "@/lib/mock-db";
import StatCard from "@/components/ui/StatCard";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const stats = await getStats();
    const pending = await getPendingRegistrations();

    return (
        <div>
            <h1 className="text-xl font-bold">Dashboard</h1>

            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatCard
                    label="Total Alumni"
                    value={stats.totalAlumni}
                    color="blue"
                    icon={<span className="text-lg">👥</span>}
                />
                <StatCard
                    label="Pending Review"
                    value={stats.pending}
                    color="amber"
                    icon={<span className="text-lg">⏳</span>}
                />
                <StatCard
                    label="Batches"
                    value={stats.batches}
                    color="purple"
                    icon={<span className="text-lg">🎓</span>}
                />
                <StatCard
                    label="Registered Members"
                    value={stats.registeredMembers}
                    color="green"
                    icon={<span className="text-lg">✅</span>}
                />
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-zinc-800">Recent Registrations</h2>
                    <Link href="/dashboard/registrations" className="text-sm text-brand-600">
                        View All →
                    </Link>
                </div>

                <div className="mt-3 overflow-x-auto rounded-lg border border-black/10">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 text-zinc-500">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Department</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pending.slice(0, 5).map((a) => (
                            <tr key={a.id} className="border-t border-black/5">
                                <td className="px-4 py-2">{a.name}</td>
                                <td className="px-4 py-2">{a.department?.name}</td>
                                <td className="px-4 py-2">
                    <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
                      {a.status}
                    </span>
                                </td>
                            </tr>
                        ))}
                        {pending.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-4 py-6 text-center text-zinc-400">
                                    Nothing pending
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}