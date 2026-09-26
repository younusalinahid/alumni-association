import { NextResponse } from "next/server";
import { getAllNotices, createNotice } from "@/lib/mock-db";

export async function GET() {
    const notices = await getAllNotices();
    return NextResponse.json(notices);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!body.title || !body.body) {
        return NextResponse.json({ error: "Title and body are required" }, { status: 400 });
    }

    const notice = await createNotice(body);
    return NextResponse.json(notice, { status: 201 });
}