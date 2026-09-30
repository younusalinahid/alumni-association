import { verifyToken } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

type VerifyPageProps = {
    params: Promise<{ token: string }>;
};

export default async function VerifyPage({ params }: VerifyPageProps) {
    const { token } = await params;
    const alumnus = await verifyToken(token);

    return (
        <div className="mx-auto max-w-sm px-4 py-16 text-center">
            {alumnus ? (
                <>
                    <div className="text-4xl">✅</div>
                    <h1 className="mt-2 text-lg font-semibold text-green-700">Verification Successful</h1>
                    <p className="mt-1 text-sm text-zinc-600">{alumnus.name}</p>
                    <p className="text-xs text-zinc-400">{alumnus.regNo}</p>
                    <p className="text-xs text-zinc-400">
                        {alumnus.department?.name} · {alumnus.batch?.name}
                    </p>
                </>
            ) : (
                <>
                    <div className="text-4xl">❌</div>
                    <h1 className="mt-2 text-lg font-semibold text-red-700">Verification Failed</h1>
                    <p className="mt-1 text-sm text-zinc-600">This token is invalid or has been revoked.</p>
                </>
            )}
        </div>
    );
}