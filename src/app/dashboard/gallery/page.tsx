"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type AlbumRow = {
    id: string;
    title: string;
    coverImage: string;
    imageCount: number;
};

const initialAlbumForm = { title: "", coverImage: "" };
const initialImageForm = { albumId: "", imageUrl: "", caption: "" };

export default function AdminGalleryPage() {
    const [albums, setAlbums] = useState<AlbumRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [albumForm, setAlbumForm] = useState(initialAlbumForm);
    const [imageForm, setImageForm] = useState(initialImageForm);
    const [submitting, setSubmitting] = useState(false);
    const [actingId, setActingId] = useState<string | null>(null);
    const [uploadingAlbumCover, setUploadingAlbumCover] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    async function load() {
        setLoading(true);
        const res = await fetch("/api/gallery/albums");
        setAlbums(await res.json());
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleCreateAlbum(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        await fetch("/api/gallery/albums", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(albumForm),
        });
        setAlbumForm(initialAlbumForm);
        setSubmitting(false);
        await load();
    }

    async function handleDeleteAlbum(id: string) {
        setActingId(id);
        await fetch(`/api/gallery/albums/${id}`, { method: "DELETE" });
        await load();
        setActingId(null);
    }

    async function handleAddImage(e: React.FormEvent) {
        e.preventDefault();
        if (!imageForm.albumId) return;

        setSubmitting(true);
        await fetch("/api/gallery/images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(imageForm),
        });
        setImageForm(initialImageForm);
        setSubmitting(false);
        await load();
    }

    async function uploadFile(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Upload failed");
        }

        return data.url;
    }

    async function handleAlbumCoverFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingAlbumCover(true);
        try {
            const url = await uploadFile(file);
            setAlbumForm((f) => ({ ...f, coverImage: url }));
        } catch (err) {
            if (err instanceof Error) alert(err.message);
        } finally {
            setUploadingAlbumCover(false);
        }
    }

    async function handleImageFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const url = await uploadFile(file);
            setImageForm((f) => ({ ...f, imageUrl: url }));
        } catch (err) {
            if (err instanceof Error) alert(err.message);
        } finally {
            setUploadingImage(false);
        }
    }

    return (
        <div>
            <h1 className="text-xl font-bold">Manage Gallery</h1>

            {/* Create Album form */}
            <form onSubmit={handleCreateAlbum} className="mt-4 space-y-3 rounded-lg border border-black/10 bg-white p-4">
                <h2 className="text-sm font-semibold text-zinc-700">Create New Album</h2>
                <input
                    required
                    placeholder="Album title"
                    value={albumForm.title}
                    onChange={(e) => setAlbumForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                />
                <div className="flex items-center gap-2">
                    <input
                        required
                        placeholder="Image path or full URL"
                        value={albumForm.coverImage}
                        onChange={(e) => setAlbumForm((f) => ({ ...f, coverImage: e.target.value }))}
                        className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm"
                    />
                    <label className="cursor-pointer rounded-md border border-black/10 px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50">
                        {uploadingAlbumCover ? "Uploading..." : "Upload"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAlbumCoverFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={submitting}
                    className="cursor-pointer rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Create Album
                </button>
            </form>

            {/* Add Image to Album form */}
            <form onSubmit={handleAddImage} className="mt-4 space-y-3 rounded-lg border border-black/10 bg-white p-4">
                <h2 className="text-sm font-semibold text-zinc-700">Add Image to Album</h2>
                <select
                    required
                    value={imageForm.albumId}
                    onChange={(e) => setImageForm((f) => ({ ...f, albumId: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                >
                    <option value="">Select album</option>
                    {albums.map((a) => (
                        <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                </select>
                <div className="flex items-center gap-2">
                    <input
                        required
                        placeholder="Image path or full URL"
                        value={imageForm.imageUrl}
                        onChange={(e) => setImageForm((f) => ({ ...f, imageUrl: e.target.value }))}
                        className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm"
                    />
                    <label className="cursor-pointer rounded-md border border-black/10 px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50">
                        {uploadingImage ? "Uploading..." : "Upload"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
                <input
                    placeholder="Caption (optional)"
                    value={imageForm.caption}
                    onChange={(e) => setImageForm((f) => ({ ...f, caption: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="cursor-pointer rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Add Image
                </button>
            </form>

            {loading && <p className="mt-4 text-sm text-zinc-400">Loading...</p>}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {albums.map((album) => (
                    <div key={album.id} className="overflow-hidden rounded-lg border border-black/10 bg-white">
                        <div className="relative h-32 w-full">
                            <Image src={album.coverImage} alt={album.title} fill className="object-cover" sizes="50vw" />
                        </div>
                        <div className="flex items-center justify-between p-3">
                            <div>
                                <div className="font-medium text-zinc-800">{album.title}</div>
                                <div className="text-xs text-zinc-500">{album.imageCount} photos</div>
                            </div>
                            <button
                                onClick={() => handleDeleteAlbum(album.id)}
                                disabled={actingId === album.id}
                                className="cursor-pointer rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}