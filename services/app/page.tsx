import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <Image src="/file.svg" alt="" fill priority className="object-cover" />
      </div>

      <section className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-10 text-center backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Domain for sale</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">domain for sale</h1>
        <p className="mt-6 text-base text-slate-200 sm:text-lg">contact 0986618442</p>
      </section>
    </main>
  );
}
