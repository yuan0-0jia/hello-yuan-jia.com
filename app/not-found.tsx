import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col flex-auto content-center justify-center items-center text-center px-4">
      <div>
        <div className="font-typewriter text-8xl text-sepia-200 dark:text-sepia-800 mb-4">
          404
        </div>
        <h1 className="font-typewriter text-xl md:text-2xl text-warmGray-800 dark:text-cream mb-4 tracking-wide">
          Page not found
        </h1>
        <p className="font-serif text-warmGray-500 dark:text-warmGray-400 mb-8 italic">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-block font-typewriter text-sm tracking-wider px-6 py-3 bg-sepia-600 text-cream border border-sepia-700 hover:bg-sepia-700 transition-colors hover:-translate-y-0.5"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
