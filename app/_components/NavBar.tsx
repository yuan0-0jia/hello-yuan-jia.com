import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import ThemeSwitch from "./ThemeSwitch";
// import { auth } from "../_lib/auth";

export default async function Navigation() {
  // const session = await auth();

  return (
    <header className="border-b border-stone-200 dark:border-stone-800 px-4 py-3 sticky top-0 z-20 uppercase sm:px-6 bg-[#f7f7f7] dark:bg-zinc-900">
      <div className="flex justify-between items-center max-w-7xl mx-auto tracking-wider">
        <Link href="/" className="tracking-widest font-semibold">
          Yuan Jia
        </Link>

        <nav className="z-10 text-sm">
          <ul className="flex gap-6 items-center tracking-wider">
            <li>
              <ThemeSwitch />
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-accent-400 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/photo"
                className="hover:text-accent-400 transition-colors"
              >
                Photos
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                <FaRegUser />
              </Link>
            </li>

            {/* <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                src={session.user.image}
                alt={session.user.name}
                className="h-8 rounded-full"
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
