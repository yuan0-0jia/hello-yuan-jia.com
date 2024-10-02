"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Error() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <main className="flex flex-col flex-auto content-center justify-center items-center text-center">
      <div>
        <h1 className="text-3xl font-semibold ">Well, {error} :(</h1>
        <Link
          href="/"
          className="inline-block bg-accent-500 underline hover:text-stone-400 dark:hover:text-stone-500 text-stone-800 dark:text-stone-300 mx-6 my-3 text-lg"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
