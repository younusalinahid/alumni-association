import Link from "next/link";
import { getAllAlumni } from "@/lib/mock-db";
import Avatar from "@/components/ui/Avatar";
import AlumniStatusButton from "@/app/dashboard/AlumniStatusButton";

export const dynamic = "force-dynamic";

type PageProps = {
    searchParams: Promise<{
        status?: string;
        search?: string;
    }>;
};

export default async function AlumniManagementPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const statusFilter = params.status || "ALL";
    const search = params.search || "";

    const allAlumni = await getAllAlumni();

    const statusCounts = {
        ALL: allAlumni.length,
        PENDING: allAlumni.filter((a) => a.status === "PENDING").length,
        APPROVED: allAlumni.filter((a) => a.status === "APPROVED").length,
        REJECTED: allAlumni.filter((a) => a.status === "REJECTED").length,
    };

    let alumniList = allAlumni;

    if (statusFilter !== "ALL") {
        alumniList = alumniList.filter((a) => a.status === statusFilter);
    }

    if (search) {
        const s = search.toLowerCase();
        alumniList = alumniList.filter(
            (a) =>
                a.name.toLowerCase().includes(s) ||
                a.regNo.toLowerCase().includes(s) ||
                a.email.toLowerCase().includes(s)
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Alumni Management</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage all registered alumni members, approve or reject their profiles.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                        Total: {statusCounts.ALL}
                    </span>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-1">
                {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((status) => {
                    const isActive = statusFilter === status;
                    return (
                        <Link
                            key={status}
                            href={`/dashboard/alumni?status=${status}${search ? `&search=${search}` : ""}`}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            {status === "ALL"
                                ? "All"
                                : status.charAt(0) + status.slice(1).toLowerCase()}
                            <span
                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                    isActive
                                        ? "bg-blue-500 text-white"
                                        : "bg-slate-200 text-slate-700"
                                }`}
                            >
                                {statusCounts[status]}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* Search Bar */}
            <form className="flex gap-2">
                <input type="hidden" name="status" value={statusFilter} />
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                        🔍
                    </span>
                    <input
                        type="text"
                        name="search"
                        defaultValue={search}
                        placeholder="Search by name, registration no or email..."
                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="rounded-lg bg-slate-800 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900"
                >
                    Search
                </button>
                {search && (
                    <Link
                        href={`/dashboard/alumni?status=${statusFilter}`}
                        className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                    >
                        Clear
                    </Link>
                )}
            </form>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Alumni</th>
                            <th className="px-6 py-4">Registration</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Batch</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {alumniList.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-16 text-center text-slate-400"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-4xl">📭</span>
                                        <p className="text-lg font-medium text-slate-500">
                                            No alumni found
                                        </p>
                                        <p className="text-sm">
                                            Try adjusting your search or filter criteria.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            alumniList.map((alumnus) => (
                                <tr
                                    key={alumnus.id}
                                    className="border-t border-gray-100 transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                name={alumnus.name}
                                                photoUrl={alumnus.photoUrl}
                                                size={40}
                                            />
                                            <div>
                                                <p className="font-medium text-slate-800">
                                                    {alumnus.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {alumnus.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-600">
                                        {alumnus.regNo}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {alumnus.department?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {alumnus.batch?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    alumnus.status === "APPROVED"
                                                        ? "bg-green-100 text-green-700"
                                                        : alumnus.status === "REJECTED"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {alumnus.status}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <AlumniStatusButton
                                                alumniId={alumnus.id}
                                                currentStatus={alumnus.status}
                                            />
                                            <Link
                                                href={`/alumni/${alumnus.slug}`}
                                                target="_blank"
                                                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}