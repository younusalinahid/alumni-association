import Link from "next/link";
import ContactForm from "@/app/contact/ContactForm";

export const dynamic = "force-dynamic";

const contactInfo = [
    {
        icon: "📍",
        title: "Visit Us",
        lines: ["Alumni Association Office", "Main Campus, University Road", "Dhaka 1207, Bangladesh"],
        color: "bg-blue-100 text-blue-700",
    },
    {
        icon: "📞",
        title: "Call Us",
        lines: ["+880 1710-000000", "+880 1810-111111", "Sat - Thu, 9:00 AM - 5:00 PM"],
        color: "bg-green-100 text-green-700",
    },
    {
        icon: "✉️",
        title: "Email Us",
        lines: ["info@alumni-association.org", "support@alumni-association.org", "We reply within 24 hours"],
        color: "bg-purple-100 text-purple-700",
    },
];

const faqs = [
    {
        q: "How can I become a member of the Alumni Association?",
        a: "You can register through our online registration form. Once your registration is approved by our admin team, you will be added to the alumni directory.",
    },
    {
        q: "Is there a membership fee?",
        a: "No, membership is completely free for all former students. However, some events may have a small participation fee.",
    },
    {
        q: "How can I update my profile information?",
        a: "Log in to your account and go to your profile page. You can update your contact information, education, and work experience there.",
    },
    {
        q: "Can I organize an alumni event in my city?",
        a: "Yes! We encourage alumni to organize local meetups. Please contact us through this form and our team will help you plan the event.",
    },
    {
        q: "How do I get a verification certificate?",
        a: "After approval, you can download your verification PDF from your profile page. It includes a QR code that can be scanned to verify your membership.",
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
                <div className="relative mx-auto max-w-6xl px-4 text-center text-white">
                    <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wider backdrop-blur-sm">
                        📬 GET IN TOUCH
                    </span>
                    <h1 className="mt-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
                    <p className="mx-auto mt-3 max-w-2xl text-blue-100">
                        Have questions? We would love to hear from you. Reach out to us anytime.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-12">
                {/* Contact Info Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${info.color}`}
                            >
                                {info.icon}
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-slate-800">
                                {info.title}
                            </h3>
                            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                                {info.lines.map((line, i) => (
                                    <li key={i}>{line}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact Form + Map */}
                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    {/* Form */}
                    <ContactForm />

                    {/* Map & Office Hours */}
                    <div className="space-y-6">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <iframe
                                src="https://www.openstreetmap.org/export/embed.html?bbox=90.35%2C23.72%2C90.42%2C23.78&amp;layer=mapnik"
                                className="h-64 w-full"
                                loading="lazy"
                            />
                            <div className="border-t border-gray-100 p-4">
                                <p className="text-sm font-medium text-slate-700">
                                    📍 Alumni Association Office
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Main Campus, University Road, Dhaka 1207
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800">
                                🕐 Office Hours
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm">
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-slate-600">Saturday - Thursday</span>
                                    <span className="font-medium text-slate-800">9:00 AM - 5:00 PM</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-slate-600">Friday</span>
                                    <span className="font-medium text-red-600">Closed</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-slate-600">Public Holidays</span>
                                    <span className="font-medium text-red-600">Closed</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-800">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Find answers to common questions about our association
                        </p>
                    </div>

                    <div className="mx-auto mt-8 max-w-3xl space-y-3">
                        {faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                            >
                                <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-800">
                                    <span>{faq.q}</span>
                                    <span className="ml-4 text-slate-400 transition group-open:rotate-180">
                                        ▾
                                    </span>
                                </summary>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-8 text-center text-white md:p-12">
                    <h2 className="text-2xl font-bold md:text-3xl">
                        Still Have Questions?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-blue-100">
                        Our team is always ready to help. Feel free to reach out anytime.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <a
                            href="mailto:info@alumni-association.org"
                            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                        >
                            Email Us
                        </a>
                        <Link
                            href="/register"
                            className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/20"
                        >
                            Join the Community
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}