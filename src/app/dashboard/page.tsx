import Link from "next/link";
import { getStats, getPendingRegistrations } from "@/lib/mock-db";
import StatCard from "@/components/ui/StatCard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const stats = await getStats();
    const pending = await getPendingRegistrations();

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Total Alumni"
                    value={stats.totalAlumni}
                    color="blue"
                    icon={<span className="text-xl">👥</span>}
                />
                <StatCard
                    label="Pending Approval"
                    value={stats.pending}
                    color="amber"
                    icon={<span className="text-xl">⏳</span>}
                />
                <StatCard
                    label="Total Batches"
                    value={stats.batches}
                    color="purple"
                    icon={<span className="text-xl">🎓</span>}
                />
                <StatCard
                    label="Registered Members"
                    value={stats.registeredMembers}
                    color="green"
                    icon={<span className="text-xl">✅</span>}
                />
            </div>

            {/* Recent Registrations Table */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-slate-800">Recent Registrations</h2>
                    <Link
                        href="/dashboard/registrations"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        View All →
                    </Link>
                </div>

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Department</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pending.slice(0, 5).map((a) => (
                            <tr key={a.id} className="border-t border-gray-100">
                                <td className="px-4 py-3 font-medium text-slate-700">{a.name}</td>
                                <td className="px-4 py-3 text-slate-500">{a.department?.name}</td>
                                <td className="px-4 py-3">
                                        <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
                                            {a.status}
                                        </span>
                                </td>
                            </tr>
                        ))}
                        {pending.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-4 py-6 text-center text-slate-400">
                                    Nothing pending
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-800">Quick Actions</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                        href="/dashboard/registrations"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        View Registrations
                    </Link>
                    <Link
                        href="/dashboard/notices"
                        className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                        Manage Notices
                    </Link>
                    <Link
                        href="/dashboard/gallery"
                        className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
                    >
                        Manage Gallery
                    </Link>
                    <Link
                        href="/dashboard/cms"
                        className="rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                        Edit Content
                    </Link>
                </div>
            </div>
        </div>
    );
}