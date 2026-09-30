// This is the only file from which "data" comes.
// Pages/Components should never import directly from mock-data.ts.
// They should always use the functions provided by this file.
//
// Later, when Prisma is added,I will only change the code inside
// each function, while keeping the function names and return shapes
// the same. So no other application code will need to change.

import {
    alumni,
    batches,
    departments,
    notices,
    users,
    galleryAlbums,
    galleryImages,
    Alumni,
    Notice,
    GalleryImage, GalleryAlbum, pageContent, verifications, Verification
} from "./mock-data";
import Undici from "undici-types";
import QRCode from "qrcode";

function delay(ms: number = 150): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function withRefs(a: Alumni) {
    return {
        ...a,
        batch: batches.find((b) => b.id === a.batchId) || null,
        department: departments.find((d) => d.id === a.departmentId) || null,
    };
}

export async function getStats() {
    await delay();
    return {
        totalAlumni: alumni.filter((a) => a.status === "APPROVED").length,
        registeredMembers: users.filter((u) => u.role === "ALUMNI").length,
        batches: batches.length,
        pending: alumni.filter((a) => a.status === "PENDING").length,
    };
}

export async function getApprovedAlumni(filters?: {
    search?: string;
    batchId?: string;
    departmentId?: string;
}) {
    await delay();

    let result = alumni.filter((a) => a.status === "APPROVED");

    if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(
            (a) =>
                a.name.toLowerCase().includes(searchLower) ||
                a.regNo.toLowerCase().includes(searchLower)
        );
    }

    if (filters?.batchId) {
        result = result.filter((a) => a.batchId === filters.batchId);
    }

    if (filters?.departmentId) {
        result = result.filter((a) => a.departmentId === filters.departmentId);
    }

    return result.map(withRefs);
}

export async function getAlumniBySlug(slug: string) {
    await delay();
    const found = alumni.find((a) => a.slug === slug && a.status === "APPROVED");
    return found ? withRefs(found) : null;
}

type CreateRegistrationInput = {
    name: string;
    regNo: string;
    email: string;
    phone: string;
    batchId: string;
    departmentId: string;
    address: string;
    photoUrl: string;
};

type ContactMessageInput = {
    name: string;
    email: string;
    message: string;
};

type CreateNoticeInput = {
    title: string;
    body: string;
};

type CreateAlbumInput = {
    title: string;
    coverImage: string;
};

type AddImageInput = {
    albumId: string;
    imageUrl: string;
    caption: string;
};

export async function createRegistration(input: CreateRegistrationInput) {
    await delay();

    const emailTaken = alumni.some((a) => a.email === input.email);
    if (emailTaken) {
        throw new Error("EMAIL_TAKEN");
    }

    const regNoTaken = alumni.some((a) => a.regNo === input.regNo);
    if (regNoTaken) {
        throw new Error("REGNO_TAKEN");
    }

    const slug = input.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    const newAlumnus: Alumni = {
        id: `a${alumni.length + 1}`,
        regNo: input.regNo,
        name: input.name,
        slug,
        email: input.email,
        phone: input.phone,
        batchId: input.batchId,
        departmentId: input.departmentId,
        address: input.address,
        bio: "",
        status: "PENDING",
        photoUrl: input.photoUrl || null,
    };

    alumni.push(newAlumnus);
    return newAlumnus;
}

export async function verifyLogin(email: string, password: string) {
    await delay();

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        return null;
    }
    const profile = alumni.find((a) => a.email === user.email) || null;

    return { id: user.id, email: user.email, role: user.role, profile };
}

export async function getPendingRegistrations() {
    await delay();
    return alumni.filter((a) => a.status === "PENDING").map(withRefs);
}

export async function setAlumniStatus(id: string, status: "APPROVED" | "REJECTED") {
    await delay();

    const record = alumni.find((a) => a.id === id);
    if (!record) {
        throw new Error("NOT_FOUND");
    }

    record.status = status;
    return record;
}

export async function getGalleryAlbums() {
    await delay();
    return galleryAlbums.map((album) => ({
        ...album,
        imageCount: galleryImages.filter((img) => img.albumId === album.id).length,
    }));
}

export async function getGalleryImagesByAlbum(albumId: string) {
    await delay();
    const album = galleryAlbums.find((a) => a.id === albumId);
    if (!album) return null;

    const images = galleryImages.filter((img) => img.albumId === albumId);
    return { album, images };
}

export async function submitContactMessage(input: ContactMessageInput) {
    await delay();

    if (!input.name || !input.email || !input.message) {
        throw new Error("MISSING_FIELDS");
    }
    return { success: true };
}

export async function getPublishedNotices() {
    await delay();
    return notices.filter((n) => n.status === "PUBLISHED");
}

export async function getAllNotices() {
    await delay();
    return notices;
}

export async function createNotice(input: CreateNoticeInput) {
    await delay();

    const slug = input.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    const newNotice: Notice = {
        id: `n${notices.length + 1}`,
        title: input.title,
        slug,
        body: input.body,
        status: "DRAFT",
        publishedAt: new Date().toISOString().slice(0, 10),
    };

    notices.push(newNotice);
    return newNotice;
}

export async function setNoticeStatus(id: string, status: "PUBLISHED" | "DRAFT") {
    await delay();

    const record = notices.find((n) => n.id === id);
    if (!record) {
        throw new Error("NOT_FOUND");
    }

    record.status = status;
    return record;
}

export async function deleteNotice(id: string) {
    await delay();

    const index = notices.findIndex((n) => n.id === id);
    if (index === -1) {
        throw new Error("NOT_FOUND");
    }

    notices.splice(index, 1);
}

export async function getNoticeBySlug(slug: string) {
    await delay();
    const found = notices.find((n) => n.slug === slug && n.status === "PUBLISHED");
    return found || null;
}

export async function createAlbum(input: CreateAlbumInput) {
    await delay();

    const newAlbum: GalleryAlbum = {
        id: `g${galleryAlbums.length + 1}`,
        title: input.title,
        coverImage: input.coverImage,
    };

    galleryAlbums.push(newAlbum);
    return newAlbum;
}

export async function deleteAlbum(id: string) {
    await delay();

    const albumIndex = galleryAlbums.findIndex((a) => a.id === id);
    if (albumIndex === -1) {
        throw new Error("NOT_FOUND");
    }

    galleryAlbums.splice(albumIndex, 1);
    for (let i = galleryImages.length - 1; i >= 0; i--) {
        if (galleryImages[i].albumId === id) {
            galleryImages.splice(i, 1);
        }
    }
}

export async function addImageToAlbum(input: AddImageInput) {
    await delay();

    const album = galleryAlbums.find((a) => a.id === input.albumId);
    if (!album) {
        throw new Error("ALBUM_NOT_FOUND");
    }

    const newImage: GalleryImage = {
        id: `gi${galleryImages.length + 1}`,
        albumId: input.albumId,
        imageUrl: input.imageUrl,
        caption: input.caption,
    };

    galleryImages.push(newImage);
    return newImage;
}

export async function deleteImage(id: string) {
    await delay();

    const index = galleryImages.findIndex((img) => img.id === id);
    if (index === -1) {
        throw new Error("NOT_FOUND");
    }

    galleryImages.splice(index, 1);
}

export async function getPageContent(): Promise<Record<string, string>> {
    await delay();

    const map: Record<string, string> = {};
    for (const item of pageContent) {
        map[item.key] = item.value;
    }
    return map;
}

export async function updatePageContent(key: string, value: string) {
    await delay();

    const record = pageContent.find((item) => item.key === key);
    if (record) {
        record.value = value;
    } else {
        pageContent.push({ key, value });
    }

    return { key, value };
}

export async function getOrCreateVerification(alumniId: string) {
    await delay();

    const existing = verifications.find((v) => v.alumniId === alumniId && !v.revokedAt);
    if (existing) {
        return existing;
    }

    const newVerification: Verification = {
        id: `v${verifications.length + 1}`,
        alumniId,
        token: `vtok-${alumniId}-${Math.random().toString(36).slice(2, 10)}`,
        revokedAt: null,
    };

    verifications.push(newVerification);
    return newVerification;
}

export async function verifyToken(token: string) {
    await delay();

    const verification = verifications.find((v) => v.token === token);
    if (!verification || verification.revokedAt) {
        return null;
    }

    const record = alumni.find((a) => a.id === verification.alumniId && a.status === "APPROVED");
    if (!record) {
        return null;
    }

    return withRefs(record);
}

export async function generateVerificationQr(alumniId: string): Promise<string> {
    const verification = await getOrCreateVerification(alumniId);
    const verifyUrl = `http://localhost:3000/verify/${verification.token}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl);
    return qrDataUrl;
}