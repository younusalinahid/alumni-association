export default function RegisterInfoCard() {
    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
                <h3 className="font-semibold text-blue-900">📋 Why Register?</h3>
                <ul className="mt-3 space-y-2 text-sm text-blue-800">
                    <li>✓ Join the global alumni network</li>
                    <li>✓ Get access to exclusive events</li>
                    <li>✓ Download your verification certificate</li>
                    <li>✓ Connect with former classmates</li>
                    <li>✓ Discover career opportunities</li>
                </ul>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <h3 className="font-semibold text-amber-900">⚠️ Note</h3>
                <p className="mt-2 text-sm text-amber-800">
                    Your registration will be reviewed by an admin. This usually takes
                    1-2 business days. You will be notified once approved.
                </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-800">📞 Need Help?</h3>
                <p className="mt-2 text-sm text-slate-600">
                    Contact us at{" "}
                    <a
                        href="mailto:info@alumni-association.org"
                        className="font-medium text-blue-600"
                    >
                        info@alumni-association.org
                    </a>
                </p>
            </div>
        </div>
    );
}