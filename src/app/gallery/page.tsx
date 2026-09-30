import Link from "next/link";
import { getGalleryAlbums } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
    const albums = await getGalleryAlbums();
    const totalPhotos = albums.reduce((sum, a) => sum + a.imageCount, 0);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
                <div className="relative mx-auto max-w-6xl px-4 text-center text-white">
                    <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wider backdrop-blur-sm">
                        📸 PHOTO GALLERY
                    </span>
                    <h1 className="mt-4 text-4xl font-bold md:text-5xl">Our Memories</h1>
                    <p className="mx-auto mt-3 max-w-2xl text-blue-100">
                        Explore moments from our reunions, events, and celebrations
                    </p>
                    <div className="mt-6 flex justify-center gap-4 text-sm">
                        <span className="rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                            {albums.length} Albums
                        </span>
                        <span className="rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                            {totalPhotos} Photos
                        </span>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w px-4 py-12">
                {albums.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                        <p className="text-4xl">📷</p>
                        <p className="mt-3 text-lg font-medium text-slate-600">No albums yet</p>
                        <p className="mt-1 text-sm text-slate-400">
                            Check back later for new photos.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {albums.map((album) => (
                            <Link
                                key={album.id}
                                href={`/gallery/${album.id}`}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative h-56 w-full overflow-hidden">
                                    <img
                                        src={album.coverImage}
                                        alt={album.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                            {album.imageCount} photos
                                        </span>
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs backdrop-blur-sm transition group-hover:bg-blue-600">
                                            →
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h2 className="text-lg font-bold text-slate-800 transition group-hover:text-blue-600">
                                        {album.title}
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Click to view full album
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}