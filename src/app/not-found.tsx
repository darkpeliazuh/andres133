import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center bg-noir-950 px-6 text-center">
      <div>
        <p className="eyebrow mb-6">Maison Noir · 404</p>
        <h1 className="font-display text-7xl text-ivory md:text-9xl">
          A wrong <span className="italic font-serif font-light gold-text">turn</span>.
        </h1>
        <p className="mx-auto mt-8 max-w-md font-serif text-lg italic text-ivory/65">
          The page you are looking for has slipped between courses. Allow our
          maître d' to escort you back to the dining room.
        </p>
        <Link href="/" className="btn-gold mt-12">
          <span>Return home</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
