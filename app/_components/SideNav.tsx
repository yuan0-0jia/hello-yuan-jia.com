"use client";

import { FaCircleUser, FaCode, FaList, FaPhotoFilm } from "react-icons/fa6";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <FaCircleUser className="h-5 w-5" />,
  },
  {
    name: "Projects",
    href: "/account/projects",
    icon: <FaCode className="h-5 w-5" />,
  },
  {
    name: "Photos",
    href: "/account/photos",
    icon: <FaPhotoFilm className="h-5 w-5" />,
  },
  {
    name: "About",
    href: "/account/about",
    icon: <FaList className="h-5 w-5" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-sepia-200 dark:border-sepia-800">
      <ul className="flex flex-col gap-1 h-full font-typewriter text-sm tracking-wide">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`mx-2 rounded-sm py-3 px-4 hover:bg-sepia-100 dark:hover:bg-sepia-900/30 flex items-center gap-3 text-warmGray-600 dark:text-warmGray-300 hover:text-sepia-700 dark:hover:text-sepia-300 transition-colors ${
                pathname === link.href
                  ? "bg-sepia-100 dark:bg-sepia-900/50 text-sepia-700 dark:text-sepia-300 border-l-2 border-sepia-500"
                  : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto mx-2 rounded-sm hover:bg-sepia-100 dark:hover:bg-sepia-900/30 transition-colors">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
