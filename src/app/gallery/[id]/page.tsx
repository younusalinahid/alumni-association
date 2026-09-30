import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryImagesByAlbum, getGalleryAlbums } from "@/lib/mock-db";
import PhotoGrid from "@/app/gallery/PhotoGrid";

export const dynamic = "force-dynamic";

type AlbumPageProps = {
    params: Promise<{ id: string }>;
};

export default async function GalleryAlbumPage({ params }: AlbumPageProps) {
    const { id } = await params;
    const result = await getGalleryImagesByAlbum(id);

    if (!result) {
        notFound();
    }

    const { album, images } = result;
    const allAlbums = await getGalleryAlbums();
    const otherAlbums = allAlbums.filter((a) => a.id !== album.id).slice(0, 3);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-8">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        ← Back to Gallery
                    </Link>
                    <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">{album.title}</h1>
                            <p className="mt-1 text-sm text-slate-500">
                                {images.length} {images.length === 1 ? "photo" : "photos"} in this album
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-10">
                {images.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                        <p className="text-4xl">📷</p>
                        <p className="mt-3 text-lg font-medium text-slate-600">No photos yet</p>
                    </div>
                ) : (
                    <PhotoGrid photos={images} />
                )}
            </div>

            {otherAlbums.length > 0 && (
                <div className="mx-auto max-w-7xl px-4 pb-16">
                    <h2 className="text-xl font-bold text-slate-800">Other Albums</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        {otherAlbums.map((a) => (
                            <Link
                                key={a.id}
                                href={`/gallery/${a.id}`}
                                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="relative h-32 w-full">
                                    <img
                                        src={a.coverImage}
                                        alt={a.title}
                                        className="h-full w-full object-cover transition group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-3">
                                    <p className="font-medium text-slate-800 group-hover:text-blue-600">
                                        {a.title}
                                    </p>
                                    <p className="text-xs text-slate-500">{a.imageCount} photos</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}