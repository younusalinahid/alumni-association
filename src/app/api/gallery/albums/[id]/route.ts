import { NextResponse } from "next/server";
import { deleteAlbum } from "@/lib/mock-db";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await deleteAlbum(id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
}