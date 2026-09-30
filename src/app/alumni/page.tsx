import Link from "next/link";
import { getApprovedAlumni } from "@/lib/mock-db";
import { batches, departments } from "@/lib/mock-data";
import Avatar from "@/components/ui/Avatar";

type AlumniDirectoryPageProps = {
    searchParams: Promise<{
        search?: string;
        batchId?: string;
        departmentId?: string;
    }>;
};

export default async function AlumniDirectoryPage({ searchParams }: AlumniDirectoryPageProps) {
    const params = await searchParams;
    const search = params.search || "";
    const batchId = params.batchId || "";
    const departmentId = params.departmentId || "";

    const alumniList = await getApprovedAlumni({ search, batchId, departmentId });

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative bg-blue-900 py-12 px-6 text-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                ></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold md:text-4xl">Alumni Directory</h1>
                    <p className="mt-2 text-blue-200">Find and connect with fellow alumni</p>
                </div>
            </div>

            <div className="mx-auto max-w px-4 py-8">
                {/* Search and Filter Section */}
                <form className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_auto]">
                        {/* Search Input */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">🔍</span>
                            <input
                                type="text"
                                name="search"
                                defaultValue={search}
                                placeholder="Search by Name, registration no, or department"
                                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Batch Filter */}
                        <select
                            name="batchId"
                            defaultValue={batchId}
                            className="rounded-lg border border-gray-300 py-2.5 px-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">All Batches</option>
                            {batches.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>

                        {/* Department Filter */}
                        <select
                            name="departmentId"
                            defaultValue={departmentId}
                            className="rounded-lg border border-gray-300 py-2.5 px-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">All Departments</option>
                            {departments.map((d) => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Results Count */}
                <div className="mb-4 text-sm text-slate-500">
                    Showing <span className="font-semibold text-slate-700">{alumniList.length}</span> alumni
                    {search && <span> for "<span className="font-medium text-slate-700">{search}</span>"</span>}
                </div>

                {/* Alumni Grid */}
                {alumniList.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                        <p className="text-lg font-medium text-slate-600">No alumni found</p>
                        <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filter criteria.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {alumniList.map((alumnus) => (
                            <div
                                key={alumnus.id}
                                className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
                            >
                                <Avatar name={alumnus.name} photoUrl={alumnus.photoUrl} size={96} />

                                <h2 className="mt-4 text-lg font-bold text-slate-800">{alumnus.name}</h2>
                                <p className="text-xs text-slate-500">{alumnus.regNo}</p>

                                <div className="mt-2 flex flex-wrap items-center justify-center gap-1 text-xs text-slate-500">
                                    <span>{alumnus.department?.name}</span>
                                    <span>•</span>
                                    <span>{alumnus.batch?.name}</span>
                                </div>

                                <Link
                                    href={`/alumni/${alumnus.slug}`}
                                    className="mt-5 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    View Profile
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}