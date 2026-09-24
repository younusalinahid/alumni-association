// This file currently stores the raw data as an in-memory array.
// Later, when Prisma is added, this entire file will be deleted.
// The data will then be stored in PostgreSQL.

export type Batch = { id: string; name: string };
export type Department = { id: string; name: string };

export type AlumniStatus = "PENDING" | "APPROVED" | "REJECTED";
export type Role = "ADMIN" | "ALUMNI";

export type User = {
    id: string;
    email: string;
    password: string;
    role: Role;
};

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

export type Notice = {
    id: string;
    title: string;
    body: string;
    publishedAt: string;
};

export const users: User[] = [
    { id: "u1", email: "admin@alumni.test", password: "admin123", role: "ADMIN" },
    { id: "u2", email: "rahman@example.com", password: "alumni123", role: "ALUMNI" },
];

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

export let alumni: Alumni[] = [
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
        status: "PENDING",
        photoUrl: null,
    },
];

export const notices: Notice[] = [
    {
        id: "n1",
        title: "Annual Alumni Reunion 2026",
        body: "Join us for the annual reunion on the campus ground. Registration opens soon.",
        publishedAt: "2026-09-20",
    },
];