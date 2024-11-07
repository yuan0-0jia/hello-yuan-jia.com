import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import ThemeSwitch from "./ThemeSwitch";

// import { auth } from "../_lib/auth";

export default async function Navigation() {
  // const session = await auth();

  return (
    <header className="border-b border-stone-200 dark:border-stone-800 px-4 py-3 sticky top-0 z-20 uppercase sm:px-6 bg-[#f7f7f7] dark:bg-zinc-900">
      <div className="flex justify-between items-center max-w-7xl mx-auto tracking-wider">
        <Link
          href="/"
          className="tracking-widest mx-2 px-5 font-semibold hover:text-gray-400"
        >
          Yuan Jia
        </Link>

        <nav className="z-10 text-sm">
          <ul className="flex gap-6 items-center tracking-wider">
            <li className="flex flex-col justify-center hover:text-gray-400">
              <ThemeSwitch />
            </li>
            <li className="flex flex-col justify-center">
              <Link href="/about" className="hover:text-gray-400 ">
                About
              </Link>
            </li>
            <li className="flex flex-col justify-center">
              <Link href="/photos" className="hover:text-gray-400 ">
                Photos
              </Link>
            </li>
            <li className="flex flex-col justify-center">
              <Link href="/account" className="hover:text-gray-400 ">
                <FaRegUser />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
