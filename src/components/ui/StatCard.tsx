import { ReactNode } from "react";

type StatCardProps = {
    label: string;
    value: number | string;
    icon: ReactNode;
    color: "blue" | "green" | "purple" | "amber";
};

const colorStyles: Record<StatCardProps["color"], string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
};

export default function StatCard({ label, value, icon, color }: StatCardProps) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm">
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${colorStyles[color]}`}>
                {icon}
            </div>
            <div>
                <div className="text-2xl font-bold text-zinc-800">{value}</div>
                <div className="text-sm text-zinc-500">{label}</div>
            </div>
        </div>
    );
}