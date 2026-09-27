import { NextResponse } from "next/server";
import { addImageToAlbum } from "@/lib/mock-db";

export async function POST(request: Request) {
    const body = await request.json();

    if (!body.albumId || !body.imageUrl) {
        return NextResponse.json(
            { error: "Album and image URL are required" },
            { status: 400 }
        );
    }

    try {
        const image = await addImageToAlbum(body);
        return NextResponse.json(image, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }
}