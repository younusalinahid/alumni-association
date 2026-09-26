export default function AboutPage() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-2xl font-bold">About Us</h1>
            <p className="mt-3 max-w-2xl text-zinc-600">
                The Alumni Association connects former students with the institution
                and with each other. We organize reunions, share career opportunities,
                and keep everyone informed through notices and events — helping our
                graduates stay in touch long after they leave campus.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-black/10 p-4">
                    <div className="text-lg font-bold text-brand-700">Our Mission</div>
                    <p className="mt-1 text-sm text-zinc-600">
                        To build a lifelong network among graduates and their alma mater.
                    </p>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                    <div className="text-lg font-bold text-brand-700">Our Vision</div>
                    <p className="mt-1 text-sm text-zinc-600">
                        A connected community where every alumnus can find opportunity and support.
                    </p>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                    <div className="text-lg font-bold text-brand-700">Get Involved</div>
                    <p className="mt-1 text-sm text-zinc-600">
                        Join events, mentor students, or simply stay in touch with old friends.
                    </p>
                </div>
            </div>
        </div>
    );
}