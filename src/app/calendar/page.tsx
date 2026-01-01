import Image from "next/image";

export default function CalendarPage() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-white/30">
            {/* Background - Reusing Pegasus for consistency but blurred */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/pegasus-bg.png"
                    alt="Background"
                    fill
                    className="object-cover object-center blur-sm scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 md:p-8 animate-fade-in-up">
                <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                {year}
                            </h1>
                            <p className="text-2xl md:text-3xl font-light text-white/80 uppercase tracking-widest mt-2">
                                {currentDate.toLocaleString('default', { month: 'long' })}
                            </p>
                        </div>
                        <a href="/" className="mt-4 md:mt-0 px-6 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors text-sm uppercase tracking-wider">
                            Back to Home
                        </a>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-4 mb-4">
                        {weekDays.map((day) => (
                            <div key={day} className="text-center text-white/60 font-medium text-sm tracking-wider py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {blanks.map((blank) => (
                            <div key={`blank-${blank}`} className="aspect-square" />
                        ))}
                        {days.map((day) => {
                            const isToday = day === currentDate.getDate();
                            return (
                                <div
                                    key={day}
                                    className={`
                    aspect-square flex items-center justify-center rounded-xl text-lg font-light transition-all duration-300
                    ${isToday
                                            ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110'
                                            : 'hover:bg-white/10 text-white/90 cursor-default'
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
