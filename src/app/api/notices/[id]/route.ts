import { NextResponse } from "next/server";
import { setNoticeStatus, deleteNotice } from "@/lib/mock-db";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { status } = await request.json();

    if (status !== "PUBLISHED" && status !== "DRAFT") {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    try {
        const updated = await setNoticeStatus(id, status);
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await deleteNotice(id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
}