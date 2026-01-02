"use client";

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/image";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

interface Message {
    id: number;
    content: string;
    created_at: string;
}

export default function Guestbook() {
    const [content, setContent] = useState('')
    const [messages, setMessages] = useState<Message[]>([])

    const [isAdmin, setIsAdmin] = useState(false)

    // 글 가져오기 함수
    const fetchMessages = async () => {
        if (!supabase) return;

        const { data } = await supabase
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (data) setMessages(data as any)
    }

    useEffect(() => {
        // eslint-disable-next-line
        fetchMessages()
    }, [])

    // 글 쓰기 함수
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        if (!supabase) {
            alert("Supabase 설정이 되어있지 않습니다.");
            return;
        }

        const { error } = await supabase
            .from('guestbook')
            .insert([{ content }])

        if (error) {
            alert("오류 발생: " + error.message)
        } else {
            setContent('')
            fetchMessages() // 목록 새로고침
        }
    }

    // 관리자 로그인
    const handleAdminLogin = () => {
        const code = window.prompt("관리자 코드를 입력하세요:");
        // 간단한 하드코딩된 비밀번호 (실제 프로덕션에서는 환경변수나 Auth 사용 권장)
        if (code === "1234") {
            setIsAdmin(true);
            alert("관리자 모드로 전환되었습니다.");
        } else if (code) {
            alert("코드가 올바르지 않습니다.");
        }
    };

    // 글 삭제 함수
    const handleDelete = async (id: number) => {
        if (!supabase) return;
        if (!confirm("정말 이 메시지를 삭제하시겠습니까?")) return;

        const { error } = await supabase
            .from('guestbook')
            .delete()
            .eq('id', id);

        if (error) {
            alert("삭제 실패: " + error.message);
        } else {
            fetchMessages(); // 목록 새로고침
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden text-slate-800">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/pegasus-bright.png"
                    alt="Background"
                    fill
                    className="object-cover object-center blur-sm opacity-80"
                    priority
                />
            </div>

            <main className="relative z-10 min-h-screen flex flex-col items-center p-4 md:p-12 animate-fade-in-up">
                <div className="w-full max-w-2xl">
                    {/* Header */}
                    <header className="mb-8 text-center">
                        <Link href="/" className="inline-block px-6 py-2 mb-4 rounded-full border border-slate-300 bg-white/50 hover:bg-white text-slate-600 transition-colors text-sm font-bold">
                            ← Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-slate-800" style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.5)' }}>Guestbook</h1>
                        <p className="text-slate-600 font-medium">Leave a wish for 2026</p>
                    </header>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white/40 backdrop-blur-md border border-white/60 shadow-lg text-slate-800 rounded-2xl p-6 mb-12 shadow-xl">
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all h-32 resize-none shadow-inner"
                                placeholder="예쁜 말을 남겨주세요..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-3 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                        >
                            Sign Guestbook
                        </button>
                    </form>

                    {/* Messages List */}
                    <div className="space-y-4 pb-20">
                        {messages.map((msg) => (
                            <div key={msg.id} className="group relative bg-white/80 backdrop-blur-sm border border-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs text-slate-400 font-medium">{new Date(msg.created_at).toLocaleDateString()}</span>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="text-red-400 hover:text-red-600 font-bold text-xs px-2 py-1 rounded hover:bg-red-50 transition-colors"
                                        >
                                            삭제
                                        </button>
                                    )}
                                </div>
                                <p className="text-slate-700 font-medium leading-relaxed break-words">{msg.content}</p>
                            </div>
                        ))}
                    </div>

                    {/* Admin Trigger */}
                    <div className="absolute bottom-4 right-4 z-50 opacity-100">
                        <button
                            onClick={handleAdminLogin}
                            className="text-slate-400 hover:text-slate-600 text-xs font-medium px-3 py-1 bg-white/50 rounded-full transition-colors"
                        >
                            {isAdmin ? "Admin Mode On" : "Admin"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}