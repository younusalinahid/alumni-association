import Image from "next/image";

type AvatarProps = {
    name: string;
    photoUrl?: string | null;
    size?: number;
};

export default function Avatar({ name, photoUrl, size = 100 }: AvatarProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            className="relative flex items-center justify-center overflow-hidden rounded-full bg-blue-100 text-blue-700 font-bold"
            style={{ width: size, height: size, fontSize: size / 2.5 }}
        >
            {photoUrl ? (
                <Image
                    src={photoUrl}
                    alt={name}
                    width={size}
                    height={size}
                    className="object-cover"
                />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );
}