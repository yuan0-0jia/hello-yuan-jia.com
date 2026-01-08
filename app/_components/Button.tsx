import Link from "next/link";

const baseStyles =
  "inline-block font-typewriter text-sm tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sepia-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const styles = {
  primary:
    baseStyles +
    " px-6 py-3 md:px-8 md:py-4 bg-sepia-600 text-cream border border-sepia-700 hover:bg-sepia-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0",
  small:
    baseStyles +
    " px-3 py-1.5 md:px-4 md:py-2 text-xs bg-sepia-600 text-cream border border-sepia-700 hover:bg-sepia-700",
  secondary:
    baseStyles +
    " px-5 py-2.5 md:px-6 md:py-3 bg-transparent border-2 border-sepia-400 text-sepia-600 dark:text-sepia-300 dark:border-sepia-500 hover:bg-sepia-50 dark:hover:bg-sepia-900/30 hover:-translate-y-0.5 active:translate-y-0",
  round:
    baseStyles +
    " px-4 py-2 md:px-5 md:py-2.5 text-sm bg-transparent border border-sepia-400 text-sepia-600 dark:text-sepia-300 dark:border-sepia-500 hover:bg-sepia-50 dark:hover:bg-sepia-900/30",
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
  to?: string;
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
