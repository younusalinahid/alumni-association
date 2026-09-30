"use client";

import { useState, useEffect } from "react";

type Photo = {
    id: string;
    imageUrl: string;
    caption: string;
};

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (selectedIndex === null) return;
            if (e.key === "Escape") setSelectedIndex(null);
            if (e.key === "ArrowRight") {
                setSelectedIndex((i) => (i === null ? null : (i + 1) % photos.length));
            }
            if (e.key === "ArrowLeft") {
                setSelectedIndex((i) =>
                    i === null ? null : (i - 1 + photos.length) % photos.length
                );
            }
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIndex, photos.length]);

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {photos.map((photo, index) => (
                    <button
                        key={photo.id}
                        onClick={() => setSelectedIndex(index)}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                        <img
                            src={photo.imageUrl}
                            alt={photo.caption}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                        <div className="absolute bottom-3 left-3 right-3 translate-y-3 text-left text-sm font-medium text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                            {photo.caption}
                        </div>
                    </button>
                ))}
            </div>

            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedIndex(null)}
                >
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20"
                    >
                        ✕
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex(
                                (selectedIndex - 1 + photos.length) % photos.length
                            );
                        }}
                        className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
                    >
                        ‹
                    </button>

                    <div
                        className="relative max-h-[85vh] max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={photos[selectedIndex].imageUrl}
                            alt={photos[selectedIndex].caption}
                            className="max-h-[80vh] w-auto rounded-lg object-contain"
                        />
                        <div className="mt-4 text-center">
                            <p className="text-base font-medium text-white">
                                {photos[selectedIndex].caption}
                            </p>
                            <p className="mt-1 text-xs text-white/60">
                                {selectedIndex + 1} / {photos.length}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex((selectedIndex + 1) % photos.length);
                        }}
                        className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    );
}