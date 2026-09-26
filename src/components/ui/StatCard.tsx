import { ReactNode } from "react";

type StatCardProps = {
    label: string;
    value: number | string;
    icon: ReactNode;
    color: "blue" | "green" | "purple" | "amber";
};

const colorStyles: Record<StatCardProps["color"], { bg: string; text: string }> = {
    blue: { bg: "bg-blue-50 text-blue-600", text: "text-blue-700" },
    green: { bg: "bg-green-50 text-green-600", text: "text-green-700" },
    purple: { bg: "bg-purple-50 text-purple-600", text: "text-purple-700" },
    amber: { bg: "bg-amber-50 text-amber-600", text: "text-amber-700" },
};

export default function StatCard({ label, value, icon, color }: StatCardProps) {
    const styles = colorStyles[color];

    return (
        <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm">
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${styles.bg}`}>
                {icon}
            </div>
            <div>
                <div className={`text-2xl font-bold ${styles.text}`}>{value}</div>
                <div className="text-sm font-medium text-zinc-500">{label}</div>
            </div>
        </div>
    );
}