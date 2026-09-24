import { NextResponse } from "next/server";
import { verifyLogin } from "@/lib/mock-db";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const user = await verifyLogin(email, password);

    if (!user) {
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        );
    }

    const res = NextResponse.json({ email: user.email, role: user.role });

    res.cookies.set(
        "mock_session",
        JSON.stringify({ email: user.email, role: user.role }),
        {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 8,
        }
    );

    return res;
}