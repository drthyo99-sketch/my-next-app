import Image from "next/image";
import FallingWings from "./components/FallingWings";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <FallingWings />
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pegasus-bright.png"
          alt="Magic Pegasus Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* No dark overlay for the bright theme, maybe a very subtle white gradient if needed */}
      </div>

      {/* Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-4">
        <h1
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-slate-800 drop-shadow-lg animate-fade-in-up"
          style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8)' }}
        >
          새해 복 많이 받으세요
        </h1>
        <p className="mt-8 text-2xl text-slate-700 font-medium tracking-widest uppercase animate-pulse">
          Happy New Year 2026
        </p>

        <div className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <a
            href="/calendar"
            className="group relative px-8 py-3 bg-white/60 backdrop-blur-md border border-white/50 rounded-full text-slate-800 font-bold overflow-hidden transition-all hover:bg-white/80 hover:scale-105 hover:shadow-lg hover:text-pink-600"
          >
            <span className="relative z-10">달력보기</span>
          </a>
          <a
            href="/guestbook"
            className="group relative px-8 py-3 bg-white/60 backdrop-blur-md border border-white/50 rounded-full text-slate-800 font-bold overflow-hidden transition-all hover:bg-white/80 hover:scale-105 hover:shadow-lg hover:text-blue-600"
          >
            <span className="relative z-10">방명록</span>
          </a>
        </div>
      </main>
    </div>
  );
}