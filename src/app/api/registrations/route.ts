import { NextResponse } from "next/server";
import { createRegistration } from "@/lib/mock-db";

export async function POST(request: Request) {
    const body = await request.json();

    if (!body.name || !body.regNo || !body.email || !body.batchId || !body.departmentId) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        const record = await createRegistration(body);
        return NextResponse.json(record, { status: 201 });
    } catch (err) {
        if (err instanceof Error && err.message === "EMAIL_TAKEN") {
            return NextResponse.json(
                { error: "This email is already registered" },
                { status: 409 }
            );
        }
        if (err instanceof Error && err.message === "REGNO_TAKEN") {
            return NextResponse.json(
                { error: "This registration number already exists" },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: "Registration failed" },
            { status: 500 }
        );
    }
}