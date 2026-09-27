import { NextResponse } from "next/server";
import { getPageContent, updatePageContent } from "@/lib/mock-db";

export async function GET() {
    const content = await getPageContent();
    return NextResponse.json(content);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!body.key || typeof body.value !== "string") {
        return NextResponse.json({ error: "key and value are required" }, { status: 400 });
    }

    const result = await updatePageContent(body.key, body.value);
    return NextResponse.json(result);
}