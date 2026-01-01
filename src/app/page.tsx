import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pegasus-bg.png"
          alt="Pegasus Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <h1
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-white drop-shadow-2xl animate-fade-in-up"
          style={{ textShadow: '0 4px 6px rgba(0,0,0,0.3)' }}
        >
          새해 복 많이 받으세요
        </h1>
        <p className="mt-8 text-xl text-white/90 font-light tracking-widest uppercase animate-pulse">
          Happy New Year 2026
        </p>

        <div className="mt-12 flex space-x-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <a
            href="/calendar"
            className="group relative px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium overflow-hidden transition-all hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10">달력보기</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="/guestbook"
            className="group relative px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium overflow-hidden transition-all hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10">방명록</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-400/0 via-white/20 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </div>
      </main>
    </div>
  );
}
git init
git add.
git commit - m "first commit"
git branch - M main
git remote add origin https://github.com/drthyo99-sketch/my-next-app.git
git push - u origin main
