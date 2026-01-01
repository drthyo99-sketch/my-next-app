"use client";

import { useState } from "react";
import Image from "next/image";

type Message = {
    id: number;
    name: string;
    content: string;
    date: string;
};

export default function GuestbookPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, name: "Hyun", content: "Happy New Year! The site looks amazing.", date: "2026-01-01" },
        { id: 2, name: "Guest", content: "Pegasus is cool!", date: "2026-01-02" },
    ]);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            name,
            content,
            date: new Date().toISOString().split('T')[0],
        };

        setMessages([newMessage, ...messages]);
        setName("");
        setContent("");
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/pegasus-bg.png"
                    alt="Background"
                    fill
                    className="object-cover object-center blur-md opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <main className="relative z-10 min-h-screen flex flex-col items-center p-4 md:p-12 animate-fade-in-up">
                <div className="w-full max-w-2xl">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Guestbook</h1>
                        <p className="text-white/60">Leave a wish for 2026</p>
                        <a href="/" className="inline-block mt-6 px-6 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors text-sm uppercase tracking-wider">
                            Back to Home
                        </a>
                    </header>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-12 shadow-lg">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="content" className="block text-sm font-medium text-white/80 mb-2">Message</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all h-32 resize-none"
                                placeholder="Write your wishes here..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 transform hover:scale-[1.02] transition-all duration-200"
                        >
                            Sign Guestbook
                        </button>
                    </form>

                    {/* Messages List */}
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-white/90">{msg.name}</h3>
                                    <span className="text-xs text-white/40">{msg.date}</span>
                                </div>
                                <p className="text-white/80 font-light leading-relaxed">{msg.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
