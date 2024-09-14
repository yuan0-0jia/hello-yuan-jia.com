import Link from "next/link";

export default function Icon({
  children,
  to,
}: {
  children: JSX.Element;
  to: string;
}) {
  return (
    <Link href={to}>
      <button className="rounded-full border px-2 py-2 border-zinc-600 hover:bg-zinc-200 text-slate-700 dark:text-slate-100 dark:hover:bg-zinc-500 text-lg">
        {children}
      </button>
    </Link>
  );
}
