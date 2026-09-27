export type Batch = { id: string; name: string };
export type Department = { id: string; name: string };

export type AlumniStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Alumni = {
    id: string;
    regNo: string;
    name: string;
    slug: string;
    email: string;
    phone: string;
    batchId: string;
    departmentId: string;
    address: string;
    bio: string;
    status: AlumniStatus;
    photoUrl: string | null;
};

export type Role = "ADMIN" | "ALUMNI";

export type User = {
    id: string;
    email: string;
    password: string;
    role: Role;
};

export type NoticeStatus = "DRAFT" | "PUBLISHED";

export type Notice = {
    id: string;
    title: string;
    slug: string;
    body: string;
    status: NoticeStatus;
    publishedAt: string;
};

export type GalleryImage = {
    id: string;
    albumId: string;
    imageUrl: string;
    caption: string;
};

export type GalleryAlbum = {
    id: string;
    title: string;
    coverImage: string;
};

export type PageContent = {
    key: string;
    value: string;
};

type MockStore = {
    alumni: Alumni[];
    users: User[];
    notices: Notice[];
    galleryAlbums: GalleryAlbum[];
    galleryImages: GalleryImage[];
    pageContent: PageContent[];
};

const globalForMockDb = globalThis as unknown as { __mockStore?: MockStore };

if (!globalForMockDb.__mockStore) {
    globalForMockDb.__mockStore = {
        alumni: [
            {
                id: "a1",
                regNo: "CSE-2018-014",
                name: "Md. Rahman",
                slug: "md-rahman",
                email: "rahman@example.com",
                phone: "+880 1710-000000",
                batchId: "b2018",
                departmentId: "cse",
                address: "Dhaka, Bangladesh",
                bio: "Software engineer, currently building fintech products.",
                status: "APPROVED",
                photoUrl: "/mock/rahman.jpg",
            },
            {
                id: "a2",
                regNo: "BBA-2019-102",
                name: "Fatima Akter",
                slug: "fatima-akter",
                email: "fatima@example.com",
                phone: "+880 1810-111111",
                batchId: "b2019",
                departmentId: "bba",
                address: "Chattogram, Bangladesh",
                bio: "Marketing lead at a growing retail chain.",
                status: "APPROVED",
                photoUrl: null,
            },
            {
                id: "a3",
                regNo: "EEE-2020-045",
                name: "Tarzim Hossen",
                slug: "tarzim-hossen",
                email: "tarzim@example.com",
                phone: "+880 1910-222222",
                batchId: "b2020",
                departmentId: "eee",
                address: "Sylhet, Bangladesh",
                bio: "Power systems engineer.",
                status: "APPROVED",
                photoUrl: null,
            },
        ],
        users: [
            { id: "u1", email: "admin@alumni.test", password: "admin123", role: "ADMIN" },
            { id: "u2", email: "rahman@example.com", password: "alumni123", role: "ALUMNI" },
        ],
        notices: [
            {
                id: "n1",
                title: "Annual Alumni Reunion 2026",
                slug: "annual-alumni-reunion-2026",
                body: "We are excited to announce the Annual Alumni Reunion 2026. Stay connected!",
                status: "PUBLISHED",
                publishedAt: "2026-04-15",
            },
        ],
        galleryAlbums: [
            { id: "g1", title: "Annual Reunion 2024", coverImage: "/images/gallery/image1.png" },
            { id: "g2", title: "Convocation Ceremony", coverImage: "/images/gallery/image4.jpg" },
        ],
        galleryImages: [
            { id: "gi1", albumId: "g1", imageUrl: "/images/gallery/image1.png", caption: "Welcome speech" },
            { id: "gi2", albumId: "g1", imageUrl: "/images/gallery/image2.png", caption: "Group photo" },
            { id: "gi3", albumId: "g1", imageUrl: "/images/gallery/image3.png", caption: "Dinner session" },
            { id: "gi4", albumId: "g2", imageUrl: "/images/gallery/image4.jpg", caption: "Certificate handover" },
            { id: "gi5", albumId: "g2", imageUrl: "/images/gallery/image5.png", caption: "Stage view" },
        ],
        pageContent: [
            { key: "homepage.hero.title", value: "Welcome to Our Alumni Community" },
            { key: "homepage.hero.subtitle", value: "Reconnecting Friends · Building Networks · Shaping the Future" },
            { key: "about.title", value: "About Us" },
            {
                key: "about.description",
                value:
                    "The Alumni Association connects former students with the institution and with each other. We organize reunions, share career opportunities, and keep everyone informed through notices and events — helping our graduates stay in touch long after they leave campus.",
            },
        ],
    };
}

export const alumni = globalForMockDb.__mockStore.alumni;
export const users = globalForMockDb.__mockStore.users;
export const notices = globalForMockDb.__mockStore.notices;
export const galleryAlbums = globalForMockDb.__mockStore.galleryAlbums;
export const galleryImages = globalForMockDb.__mockStore.galleryImages;
export const pageContent = globalForMockDb.__mockStore.pageContent;

export const batches: Batch[] = [
    { id: "b2018", name: "Batch 2018" },
    { id: "b2019", name: "Batch 2019" },
    { id: "b2020", name: "Batch 2020" },
];

export const departments: Department[] = [
    { id: "cse", name: "Computer Science & Engineering" },
    { id: "bba", name: "Business Administration" },
    { id: "eee", name: "Electrical & Electronic Engineering" },
];