import { getPageContent } from "@/lib/mock-db";
import CmsForm from "@/app/dashboard/CmsForm";

export const dynamic = "force-dynamic";

export default async function CmsPage() {
    const content = await getPageContent();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Website Content</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Edit text shown on the public homepage and about page.
                </p>
            </div>

            {/* Homepage Section */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-800">Homepage</h2>
                <div className="space-y-4">
                    <CmsForm
                        label="Homepage Hero Title"
                        contentKey="homepage.hero.title"
                        defaultValue={content["homepage.hero.title"] || ""}
                    />
                    <CmsForm
                        label="Homepage Hero Subtitle"
                        contentKey="homepage.hero.subtitle"
                        defaultValue={content["homepage.hero.subtitle"] || ""}
                    />
                </div>
            </div>

            {/* About Page Section */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-800">About Page</h2>
                <div className="space-y-4">
                    <CmsForm
                        label="About Page Title"
                        contentKey="about.title"
                        defaultValue={content["about.title"] || ""}
                    />
                    <CmsForm
                        label="About Page Description"
                        contentKey="about.description"
                        defaultValue={content["about.description"] || ""}
                        isTextarea
                    />
                </div>
            </div>

            {/* About Cards Section (Mission, Vision, Get Involved) */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-800">
                    About - Info Cards
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Mission */}
                    <div className="space-y-3 rounded-lg border border-gray-100 bg-slate-50 p-4">
                        <h3 className="font-medium text-slate-700">Our Mission</h3>
                        <CmsForm
                            label="Title"
                            contentKey="about.mission.title"
                            defaultValue={content["about.mission.title"] || ""}
                        />
                        <CmsForm
                            label="Description"
                            contentKey="about.mission.description"
                            defaultValue={content["about.mission.description"] || ""}
                            isTextarea
                        />
                    </div>

                    {/* Vision */}
                    <div className="space-y-3 rounded-lg border border-gray-100 bg-slate-50 p-4">
                        <h3 className="font-medium text-slate-700">Our Vision</h3>
                        <CmsForm
                            label="Title"
                            contentKey="about.vision.title"
                            defaultValue={content["about.vision.title"] || ""}
                        />
                        <CmsForm
                            label="Description"
                            contentKey="about.vision.description"
                            defaultValue={content["about.vision.description"] || ""}
                            isTextarea
                        />
                    </div>

                    {/* Get Involved */}
                    <div className="space-y-3 rounded-lg border border-gray-100 bg-slate-50 p-4">
                        <h3 className="font-medium text-slate-700">Get Involved</h3>
                        <CmsForm
                            label="Title"
                            contentKey="about.involved.title"
                            defaultValue={content["about.involved.title"] || ""}
                        />
                        <CmsForm
                            label="Description"
                            contentKey="about.involved.description"
                            defaultValue={content["about.involved.description"] || ""}
                            isTextarea
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}