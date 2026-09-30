export type Batch = { id: string; name: string };
export type Department = { id: string; name: string };

export type AlumniStatus = "PENDING" | "APPROVED" | "REJECTED";
export type NoticeCategory = "EVENT" | "ACADEMIC" | "CAREER" | "GENERAL" | "URGENT";


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
    education: Education[];
    experience: Experience[];
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
    category: NoticeCategory;
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
    verifications: Verification[];
};

export type Verification = {
    id: string;
    alumniId: string;
    token: string;
    revokedAt: string | null;
};

export type Education = {
    id: string;
    institution: string;
    degree: string;
    year: string;
};

export type Experience = {
    id: string;
    company: string;
    role: string;
    start: string;
    end: string;
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
                photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
                education: [
                    { id: "e1", institution: "Dept. of CSE", degree: "B.Sc in CSE", year: "2018" },
                ],
                experience: [
                    { id: "x1", company: "TechNova Ltd.", role: "Senior Software Engineer", start: "2019", end: "Present" },
                ],
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
                photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
                education: [
                    { id: "e2", institution: "Dept. of BBA", degree: "BBA in Marketing", year: "2019" },
                ],
                experience: [
                    { id: "x2", company: "RetailX", role: "Marketing Lead", start: "2020", end: "Present" },
                ],
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
                photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
                education: [
                    { id: "e3", institution: "Dept. of EEE", degree: "B.Sc in EEE", year: "2020" },
                ],
                experience: [
                    { id: "x3", company: "PowerGrid BD", role: "Electrical Engineer", start: "2021", end: "Present" },
                ],
            },
            {
                id: "a4",
                regNo: "CSE-2017-088",
                name: "Nusrat Jahan",
                slug: "nusrat-jahan",
                email: "nusrat@example.com",
                phone: "+880 1610-333333",
                batchId: "b2018",
                departmentId: "cse",
                address: "Rajshahi, Bangladesh",
                bio: "Full-stack developer and tech enthusiast.",
                status: "APPROVED",
                photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
                education: [
                    { id: "e4", institution: "Dept. of CSE", degree: "B.Sc in CSE", year: "2017" },
                ],
                experience: [
                    { id: "x4", company: "SoftwareHub", role: "Full Stack Developer", start: "2018", end: "Present" },
                ],
            },
            {
                id: "a5",
                regNo: "BBA-2018-205",
                name: "Arif Hossain",
                slug: "arif-hossain",
                email: "arif@example.com",
                phone: "+880 1510-444444",
                batchId: "b2018",
                departmentId: "bba",
                address: "Khulna, Bangladesh",
                bio: "Entrepreneur and business analyst.",
                status: "APPROVED",
                photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
                education: [
                    { id: "e5", institution: "Dept. of BBA", degree: "BBA in Finance", year: "2018" },
                ],
                experience: [
                    { id: "x5", company: "StartupBD", role: "Business Analyst", start: "2019", end: "Present" },
                ],
            },
            {
                id: "a6",
                regNo: "EEE-2019-012",
                name: "Sadia Islam",
                slug: "sadia-islam",
                email: "sadia@example.com",
                phone: "+880 1410-555555",
                batchId: "b2019",
                departmentId: "eee",
                address: "Barisal, Bangladesh",
                bio: "Renewable energy researcher.",
                status: "APPROVED",
                photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
                education: [
                    { id: "e6", institution: "Dept. of EEE", degree: "M.Sc in EEE", year: "2019" },
                ],
                experience: [
                    { id: "x6", company: "GreenEnergy Ltd.", role: "Research Engineer", start: "2020", end: "Present" },
                ],
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
                body: "We are excited to announce the Annual Alumni Reunion 2026. All former students are cordially invited to join us for a day of memories, networking, and celebration. The event will be held at the main campus auditorium. Registration is now open.",
                status: "PUBLISHED",
                publishedAt: "2026-04-15",
                category: "EVENT",
            },
            {
                id: "n2",
                title: "Scholarship Applications Open for 2026",
                slug: "scholarship-applications-2026",
                body: "The Alumni Association is pleased to announce that scholarship applications for the 2026 academic year are now open. Eligible students can apply for merit-based and need-based scholarships. The deadline for submission is May 30, 2026. Please visit the scholarship office for more details.",
                status: "PUBLISHED",
                publishedAt: "2026-04-10",
                category: "ACADEMIC",
            },
            {
                id: "n3",
                title: "Job Opportunity: Software Engineer at TechNova",
                slug: "job-opportunity-technova",
                body: "TechNova Ltd. is hiring Software Engineers for their Dhaka office. Alumni members are encouraged to apply. Requirements: B.Sc in CSE, 2+ years of experience in React and Node.js. Interested candidates should send their CV to careers@technova.com by April 25, 2026.",
                status: "PUBLISHED",
                publishedAt: "2026-04-08",
                category: "CAREER",
            },
            {
                id: "n4",
                title: "Alumni Cricket Tournament 2026",
                slug: "alumni-cricket-tournament-2026",
                body: "Get ready for the most exciting event of the year! The Alumni Cricket Tournament 2026 will be held on May 20, 2026, at the university sports ground. Teams from different batches are invited to participate. Register your team before May 10.",
                status: "PUBLISHED",
                publishedAt: "2026-04-05",
                category: "EVENT",
            },
            {
                id: "n5",
                title: "Urgent: Update Your Contact Information",
                slug: "update-contact-information",
                body: "All alumni members are requested to update their contact information (phone number and email address) in the association database. This will help us keep you informed about upcoming events and opportunities. Please log in to your profile and update your details.",
                status: "PUBLISHED",
                publishedAt: "2026-04-01",
                category: "URGENT",
            },
            {
                id: "n6",
                title: "New Alumni Directory Launched",
                slug: "new-alumni-directory-launched",
                body: "We are proud to announce the launch of our new online Alumni Directory. Now you can easily find and connect with fellow alumni, search by batch, department, or location. Visit the directory to explore this new feature and reconnect with your classmates.",
                status: "PUBLISHED",
                publishedAt: "2026-03-28",
                category: "GENERAL",
            },
        ],
        galleryAlbums: [
            {
                id: "g1",
                title: "Annual Reunion 2024",
                coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
            },
            {
                id: "g2",
                title: "Convocation Ceremony",
                coverImage: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=800&h=600&fit=crop",
            },
            {
                id: "g3",
                title: "Alumni Meetup 2025",
                coverImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop",
            },
            {
                id: "g4",
                title: "Sports Day 2025",
                coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
            },
            {
                id: "g5",
                title: "Career Fair 2025",
                coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
            },
            {
                id: "g6",
                title: "Cultural Night 2024",
                coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
            },
        ],
        galleryImages: [
            // Album 1 - Annual Reunion
            { id: "gi1", albumId: "g1", imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=800&fit=crop", caption: "Welcome speech" },
            { id: "gi2", albumId: "g1", imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=800&fit=crop", caption: "Group photo" },
            { id: "gi3", albumId: "g1", imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=800&fit=crop", caption: "Dinner session" },
            { id: "gi4", albumId: "g1", imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=800&fit=crop", caption: "Networking hour" },

            // Album 2 - Convocation
            { id: "gi5", albumId: "g2", imageUrl: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=800&h=800&fit=crop", caption: "Graduates celebrating" },
            { id: "gi6", albumId: "g2", imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=800&fit=crop", caption: "Certificate handover" },
            { id: "gi7", albumId: "g2", imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=800&fit=crop", caption: "Stage view" },
            { id: "gi8", albumId: "g2", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=800&fit=crop", caption: "Graduation caps" },
            // Album 3 - Alumni Meetup
            { id: "gi9", albumId: "g3", imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=800&fit=crop", caption: "Networking session" },
            { id: "gi10", albumId: "g3", imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop", caption: "Guest speaker" },
            { id: "gi11", albumId: "g3", imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&h=800&fit=crop", caption: "Panel discussion" },
            { id: "gi12", albumId: "g3", imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=800&fit=crop", caption: "Team photo" },

            // Album 4 - Sports Day
            { id: "gi13", albumId: "g4", imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=800&fit=crop", caption: "Cricket match" },
            { id: "gi14", albumId: "g4", imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=800&fit=crop", caption: "Football game" },
            { id: "gi15", albumId: "g4", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop", caption: "Athletics" },
            { id: "gi16", albumId: "g4", imageUrl: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&h=800&fit=crop", caption: "Prize giving" },

            // Album 5 - Career Fair
            { id: "gi17", albumId: "g5", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop", caption: "Opening ceremony" },
            { id: "gi18", albumId: "g5", imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=800&fit=crop", caption: "Company booths" },
            { id: "gi19", albumId: "g5", imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=800&fit=crop", caption: "Interview session" },
            { id: "gi20", albumId: "g5", imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=800&fit=crop", caption: "Career guidance" },

            // Album 6 - Cultural Night
            { id: "gi21", albumId: "g6", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=800&fit=crop", caption: "Stage performance" },
            { id: "gi22", albumId: "g6", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop", caption: "Music night" },
            { id: "gi23", albumId: "g6", imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=800&fit=crop", caption: "Dance performance" },
            { id: "gi24", albumId: "g6", imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=800&fit=crop", caption: "Audience view" },
        ],
        pageContent: [
            { key: "homepage.hero.title", value: "Welcome to Our Alumni Community" },
            { key: "homepage.hero.subtitle", value: "Reconnecting Friends · Building Networks · Shaping the Future" },
            { key: "about.title", value: "About Us" },
            {
                key: "about.description",
                value: "The Alumni Association connects former students with the institution and with each other. We organize reunions, share career opportunities, and keep everyone informed through notices and events — helping our graduates stay in touch long after they leave campus.",
            },
            {
                key: "about.mission.title",
                value: "Our Mission",
            },
            {
                key: "about.mission.description",
                value: "To build a lifelong network among graduates and their alma mater.",
            },
            {
                key: "about.vision.title",
                value: "Our Vision",
            },
            {
                key: "about.vision.description",
                value: "A connected community where every alumnus can find opportunity and support.",
            },
            {
                key: "about.involved.title",
                value: "Get Involved",
            },
            {
                key: "about.involved.description",
                value: "Join events, mentor students, or simply stay in touch with old friends.",
            },
        ],
        verifications: [
            { id: "v1", alumniId: "a1", token: "vtok-md-rahman-9f3a", revokedAt: null },
            { id: "v2", alumniId: "a2", token: "vtok-fatima-akter-7c1e", revokedAt: null },
        ],
    };
}

export const alumni = globalForMockDb.__mockStore.alumni;
export const users = globalForMockDb.__mockStore.users;
export const notices = globalForMockDb.__mockStore.notices;
export const galleryAlbums = globalForMockDb.__mockStore.galleryAlbums;
export const galleryImages = globalForMockDb.__mockStore.galleryImages;
export const pageContent = globalForMockDb.__mockStore.pageContent;
export const verifications = globalForMockDb.__mockStore.verifications;

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