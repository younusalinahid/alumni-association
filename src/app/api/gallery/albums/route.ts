import { NextResponse } from "next/server";
import { getGalleryAlbums, createAlbum } from "@/lib/mock-db";

export async function GET() {
    const albums = await getGalleryAlbums();
    return NextResponse.json(albums);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!body.title || !body.coverImage) {
        return NextResponse.json(
            { error: "Title and cover image are required" },
            { status: 400 }
        );
    }

    const album = await createAlbum(body);
    return NextResponse.json(album, { status: 201 });
}