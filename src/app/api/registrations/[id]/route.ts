import {NextResponse} from "next/server";
import {setAlumniStatus} from "@/lib/mock-db";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{id: string}> }
){
    const {id} = await params;
    const {status} = await request.json();

    if (status !== "APPROVED" && status !== "REJECTED") {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    try {
        const updated = await setAlumniStatus(id, status);
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
}