// This is the only file from which "data" comes.
// Pages/Components should never import directly from mock-data.ts.
// They should always use the functions provided by this file.
//
// Later, when Prisma is added,I will only change the code inside
// each function, while keeping the function names and return shapes
// the same. So no other application code will need to change.

import { alumni, batches, departments, notices, users, galleryAlbums, galleryImages, Alumni } from "./mock-data";import Undici from "undici-types";
import errors = Undici.errors;

export async function getPublishedNotices() {
    await delay();
    return notices;
}

// This small delay function simulates the slight delay that occurs
// during a real database query (network delay).
function delay(ms: number = 150): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Adds the complete batch/department objects to the Alumni data.
// (In Prisma, this is called "include" / "relation")
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

export async function getApprovedAlumni() {
    await delay();
    return alumni.filter((a) => a.status === "APPROVED").map(withRefs);
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