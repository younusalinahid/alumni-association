export default function Footer() {
    return (
        <footer className="mt-16 border-t border-black/10 bg-zinc-50 py-8 text-center text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} Alumni Association. All rights reserved.</p>
            <div className="mt-3 flex justify-center gap-4">
                <a href="#" aria-label="Facebook" className="hover:text-brand-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12" />
                    </svg>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-brand-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.7 11.7 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1c.5 1.6 2 2.8 3.8 2.9A8.3 8.3 0 0 1 2 18.6a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2" />
                    </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-brand-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9h4v12H3zM9 9h3.8v1.6h.05c.53-1 1.83-2 3.77-2 4 0 4.75 2.6 4.75 6.1V21h-4v-5.6c0-1.3 0-3-1.85-3s-2.13 1.4-2.13 2.9V21H9z" />
                    </svg>
                </a>
            </div>
        </footer>
    );
}