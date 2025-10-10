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
    icon: <FaPhotoFilm className="h-5 w-5 " />,
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
    <nav className="border-r border-slate-300">
      <ul className="flex flex-col gap-1 h-full text-base">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`mx-2 rounded-lg py-2 px-4 hover:bg-stone-200
                dark:hover:bg-zinc-800 flex items-center gap-3 font-normal ${
                  pathname === link.href ? "bg-stone-100 dark:bg-zinc-900" : ""
                }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li
          className="mt-auto mx-2 rounded-lg hover:bg-stone-200
                dark:hover:bg-zinc-800"
        >
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
