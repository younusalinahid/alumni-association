import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryImagesByAlbum } from "@/lib/mock-db";

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

    return (
        <div className="mx-auto max-w px-4 py-10">
            <Link href="/gallery" className="text-sm text-brand-600">
                ← Back to Gallery
            </Link>

            <h1 className="mt-2 text-2xl font-bold">{album.title}</h1>
            <p className="text-sm text-zinc-500">{images.length} photos</p>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                {images.map((img) => (
                    <div key={img.id} className="overflow-hidden rounded-xl border border-black/10 shadow-sm">
                        <div className="relative h-48 w-full">
                            <Image
                                src={img.imageUrl}
                                alt={img.caption}
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="p-2 text-center text-xs text-zinc-500">{img.caption}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}