import Link from "next/link";

const base =
  "inline-block text-sm rounded-full bg-transparent font-semibold uppercase tracking-wide border-2 border-zinc-600 text-zinc-600 dark:border-zinc-300 dark:text-zinc-300 transition-colors duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:outline-none focus:ring focus:ring-slate-100 dark:focus:ring-slate-700 focus:ring-offset-2 disabled:cursor-not-allowed";

const styles = {
  primary: base + " px-4 py-3 md:px-6 md:py-4",
  small: base + " px-3 py-1 md:px-4 md:py-1.5 text-xs",
  secondary:
    "inline-block text-sm rounded-full border-2 border-stone-600 dark:border-stone-300 font-semibold uppercase tracking-wide text-stone-600 dark:text-stone-300 transition-colors duration-300 hover:bg-stone-200 dark:hover:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-200 dark:focus:ring-stone-600      focus:ring-offset-2 focus:text-stone-700 disabled:cursor-not-allowed px-4 py-1.5 md:px-5 md:py-2.5",
  round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
};

export default function Button({
  children,
  disabled,
  to,
  type,
  onClick,
}: {
  children: string;
  disabled?: boolean;
  type: keyof typeof styles;
  to: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  if (to)
    return (
      <Link className={styles[type]} href={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
