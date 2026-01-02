"use client";

import { useEffect, useState } from "react";

interface Wing {
    id: number;
    left: string;
    animationDuration: string;
    animationDelay: string;
    fontSize: string;
}

export default function FallingWings() {
    const [wings, setWings] = useState<Wing[]>([]);

    useEffect(() => {
        const wingCount = 20;
        const newWings: Wing[] = [];

        for (let i = 0; i < wingCount; i++) {
            newWings.push({
                id: i,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 5}s`, // 5-10s
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 1.5 + 1}rem`, // 1rem - 2.5rem
            });
        }

        setWings(newWings);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {wings.map((wing) => (
                <div
                    key={wing.id}
                    className="animate-fall absolute top-[-10%]"
                    style={{
                        left: wing.left,
                        animationDuration: wing.animationDuration,
                        animationDelay: wing.animationDelay,
                        fontSize: wing.fontSize,
                    }}
                >
                    🪽
                </div>
            ))}
        </div>
    );
}
