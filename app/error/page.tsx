"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Error() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <main className="flex flex-col flex-auto content-center justify-center items-center text-center px-4">
      <div>
        <div className="font-typewriter text-4xl text-sepia-300 dark:text-sepia-700 mb-4">
          ✕
        </div>
        <h1 className="font-typewriter text-xl md:text-2xl text-warmGray-800 dark:text-cream mb-4 tracking-wide">
          Oops! {error || "Something went wrong"}
        </h1>
        <p className="font-serif text-warmGray-500 dark:text-warmGray-400 mb-8 italic">
          We encountered an unexpected error.
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
