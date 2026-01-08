import Link from "next/link";

export default function Icon({
  children,
  to,
}: {
  children: JSX.Element;
  to: string;
}) {
  return (
    <Link href={to} target="_blank" rel="noopener noreferrer">
      <button className="rounded-sm border px-3 py-3 border-sepia-300 dark:border-sepia-600 text-warmGray-600 dark:text-warmGray-300 hover:border-sepia-500 hover:text-sepia-600 dark:hover:border-sepia-400 dark:hover:text-sepia-400 hover:bg-sepia-50 dark:hover:bg-sepia-900/30 transition-all duration-300 text-lg">
        {children}
      </button>
    </Link>
  );
}
