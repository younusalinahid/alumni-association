import { NextResponse } from "next/server";
import { updatePageContent } from "@/lib/mock-db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const raw = cookieStore.get("mock_session" as any)?.value;
    if (!raw) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const session = JSON.parse(raw);
        if (session.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
    } catch {
        return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await updatePageContent(key, value);
    return NextResponse.json({ success: true });
}