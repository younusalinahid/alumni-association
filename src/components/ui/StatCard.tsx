type StatCardProps = {
    label: string;
    value: number;
};

export default function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
            <div className="text-2xl font-bold text-brand-700">{value}</div>
            <div className="text-sm text-zinc-500">{label}</div>
        </div>
    );
}