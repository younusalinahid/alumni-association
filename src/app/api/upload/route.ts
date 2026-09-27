import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueName);

    await writeFile(uploadPath, buffer);

    return NextResponse.json({ url: `/uploads/${uniqueName}` });
}