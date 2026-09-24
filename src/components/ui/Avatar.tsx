type AvatarProps = {
    name: string;
    photoUrl?: string | null;
    size?: number;
};

export default function Avatar({name, photoUrl, size = 64}: AvatarProps) {
    const initial = name.trim().charAt(0).toUpperCase();

    if (photoUrl) {
        return (
            <img
                src={photoUrl}
                alt={name}
                width={size}
                height={size}
                className="rounded-full object-cover"
                style={{width: size, height: size}}
            />
        );
    }

    return (
        <div
            className="flex items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700"
            style={{ width: size, height: size, fontSize: size / 2.2 }}
        >
            {initial}
        </div>
    );
}