export default function Footer() {
    return (
        <footer className="mt-16 border-t border-black/10 bg-zinc-50 py-8 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Alumni Association. All rights reserved.
        </footer>
    );
}