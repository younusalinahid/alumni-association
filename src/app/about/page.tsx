import { getPageContent } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
    const content = await getPageContent();

    const cards = [
        {
            title: content["about.mission.title"] || "Our Mission",
            description: content["about.mission.description"] || "To build a lifelong network among graduates and their alma mater.",
        },
        {
            title: content["about.vision.title"] || "Our Vision",
            description: content["about.vision.description"] || "A connected community where every alumnus can find opportunity and support.",
        },
        {
            title: content["about.involved.title"] || "Get Involved",
            description: content["about.involved.description"] || "Join events, mentor students, or simply stay in touch with old friends.",
        },
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 py-12">
            <h1 className="text-3xl font-bold text-slate-800">
                {content["about.title"] || "About Us"}
            </h1>
            <p className="mt-4 text-slate-600 leading-relaxed">
                {content["about.description"] || "The Alumni Association connects former students..."}
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                        <h3 className="text-lg font-semibold text-blue-700">{card.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}