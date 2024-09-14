import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4 h-dvh  flex flex-col justify-center items-center ">
      <div>
        <h1 className="text-3xl font-semibold ">
          This page could not be found :(
        </h1>
        <Link
          href="/"
          className="inline-block bg-accent-500 hover:text-stone-400 dark:hover:text-stone-500 text-stone-800 dark:text-stone-300 mx-6 my-3 text-lg"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
