import { NextResponse } from "next/server";
import { submitContactMessage } from "@/lib/mock-db";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const result = await submitContactMessage(body);
        return NextResponse.json(result, { status: 201 });
    } catch (err) {
        if (err instanceof Error && err.message === "MISSING_FIELDS") {
            return NextResponse.json({ error: "Please fill in all fields" }, { status: 400 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}