import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import ThemeSwitch from "./ThemeSwitch";

export default async function Navigation() {
  return (
    <header className="border-b border-sepia-200 dark:border-sepia-800 px-4 py-4 sticky top-0 z-20 bg-cream/95 dark:bg-warmGray-900/95 backdrop-blur-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="font-typewriter text-lg tracking-wider text-sepia-700 dark:text-sepia-300 hover:text-sepia-500 dark:hover:text-sepia-400 transition-colors"
        >
          Yuan Jia
        </Link>

        <nav className="z-10 font-typewriter text-sm tracking-wider">
          <ul className="flex gap-6 md:gap-8 items-center">
            <li>
              <ThemeSwitch />
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-sepia-600 dark:text-sepia-400 hover:text-sepia-800 dark:hover:text-sepia-300 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/photos" 
                className="text-sepia-600 dark:text-sepia-400 hover:text-sepia-800 dark:hover:text-sepia-300 transition-colors"
              >
                Photos
              </Link>
            </li>
            <li>
              <Link 
                href="/account" 
                className="text-sepia-600 dark:text-sepia-400 hover:text-sepia-800 dark:hover:text-sepia-300 transition-colors p-2"
              >
                <FaRegUser className="w-4 h-4" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
