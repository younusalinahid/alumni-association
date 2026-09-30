"use client";

import React, { useState, ReactNode } from "react";

type AccordionProps = {
    title: string;
    icon?: ReactNode;
    defaultOpen?: boolean;
    children: React.ReactNode;
};

export default function Accordion({ title, icon, defaultOpen = false, children }: AccordionProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left"
            >
        <span className="flex items-center gap-2 font-medium text-zinc-800">
          {icon}
            {title}
        </span>
                <span className={`text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
            </button>
            {open && (
                <div className="border-t border-black/5 px-4 py-3 text-sm text-zinc-600">
                    {children}
                </div>
            )}
        </div>
    );
}