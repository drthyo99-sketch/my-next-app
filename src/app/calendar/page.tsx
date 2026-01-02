"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CalendarPage() {
    const [viewDate, setViewDate] = useState<Date | null>(null);

    // Initial load: Set to KST today
    useEffect(() => {
        const now = new Date();
        const kstDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
        setViewDate(kstDate);
    }, []);

    if (!viewDate) {
        return <div className="min-h-screen w-full flex items-center justify-center text-white">Loading...</div>;
    }

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    // KST Today for highlighting
    const now = new Date();
    const kstToday = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    const isCurrentMonth = kstToday.getFullYear() === year && kstToday.getMonth() === month;

    const changeMonth = (offset: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
        setViewDate(newDate);
    };

    const changeDate = (newYear: number, newMonth: number) => {
        setViewDate(new Date(newYear, newMonth, 1));
    };

    // Generate Year Options (Current Year +/- 2, extended to 5 per request, let's do +/- 5 from KST Today)
    const currentYear = kstToday.getFullYear();
    const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
    const monthOptions = Array.from({ length: 12 }, (_, i) => i);

    return (
        <div className="relative min-h-screen w-full overflow-hidden text-slate-800">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/pegasus-bright.png"
                    alt="Background"
                    fill
                    className="object-cover object-center blur-sm scale-105 opacity-80"
                    priority
                />
            </div>

            <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 md:p-8 animate-fade-in-up">
                <div className="w-full max-w-4xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg text-slate-800 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(255,255,255,0.6)]">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => changeMonth(-1)}
                                className="p-2 hover:bg-white/50 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            <div className="flex flex-col items-center">
                                <div className="flex gap-2 mb-2">
                                    <select
                                        value={year}
                                        onChange={(e) => changeDate(parseInt(e.target.value), month)}
                                        className="bg-transparent text-xl font-bold text-slate-700 outline-none cursor-pointer hover:bg-white/30 rounded px-1"
                                    >
                                        {yearOptions.map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                    <span className="text-xl font-bold text-slate-700">.</span>
                                    <select
                                        value={month}
                                        onChange={(e) => changeDate(year, parseInt(e.target.value))}
                                        className="bg-transparent text-xl font-bold text-slate-700 outline-none cursor-pointer hover:bg-white/30 rounded px-1 uppercase"
                                    >
                                        {monthOptions.map(m => (
                                            <option key={m} value={m}>{new Date(2000, m, 1).toLocaleString('default', { month: 'long' })}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={() => changeMonth(1)}
                                className="p-2 hover:bg-white/50 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                        <Link href="/" className="mt-4 md:mt-0 px-6 py-2 rounded-full border border-slate-300 hover:bg-white hover:text-pink-500 transition-colors text-sm uppercase tracking-wider font-bold">
                            Back to Home
                        </Link>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-4 mb-4">
                        {weekDays.map((day) => (
                            <div key={day} className="text-center text-slate-500 font-bold text-sm tracking-wider py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {blanks.map((blank) => (
                            <div key={`blank-${blank}`} className="aspect-square" />
                        ))}
                        {days.map((day) => {
                            const isToday = isCurrentMonth && day === kstToday.getDate();
                            return (
                                <div
                                    key={day}
                                    className={`
                    aspect-square flex items-center justify-center rounded-xl text-lg font-medium transition-all duration-300
                    ${isToday
                                            ? 'bg-gradient-to-tr from-pink-400 to-blue-400 text-white shadow-lg scale-110 font-bold'
                                            : 'hover:bg-white/50 text-slate-700 cursor-default'
                                        }
                  `}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
