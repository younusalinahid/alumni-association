const benefits = [
    "Get Latest Updates",
    "Connect with Alumni",
    "Career Opportunities",
    "Exclusive Event Access",
];

export default function RegisterInfoCard() {
    return (
        <div className="rounded-xl border border-black/10 bg-brand-50 p-6">
            <h2 className="font-semibold text-brand-700">Join Our Alumni Network</h2>
            <p className="mt-1 text-sm text-zinc-600">
                Stay connected with your alma mater and fellow graduates.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                        <span className="text-brand-600">✓</span>
                        {b}
                    </li>
                ))}
            </ul>
        </div>
    );
}