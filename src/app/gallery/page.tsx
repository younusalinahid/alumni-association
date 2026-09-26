import Link from "next/link";
import Image from "next/image";
import { getGalleryAlbums } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
    const albums = await getGalleryAlbums();

    return (
        <div className="mx-auto max-w px-4 py-10">
            <h1 className="text-2xl font-bold">Gallery</h1>
            <p className="text-sm text-zinc-500">Moments from our alumni events</p>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                {albums.map((album) => (
                    <Link
                        key={album.id}
                        href={`/gallery/${album.id}`}
                        className="group overflow-hidden rounded-xl border border-black/10 shadow-sm"
                    >
                        <div className="relative h-40 w-full">
                            <Image
                                src={album.coverImage}
                                alt={album.title}
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-cover transition group-hover:scale-105"
                            />
                        </div>
                        <div className="p-3">
                            <div className="font-medium text-zinc-800">{album.title}</div>
                            <div className="text-xs text-zinc-500">{album.imageCount} photos</div>
                        </div>
                    </Link>
                ))}

                {albums.length === 0 && (
                    <p className="col-span-full text-sm text-zinc-400">No albums yet.</p>
                )}
            </div>
        </div>
    );
}