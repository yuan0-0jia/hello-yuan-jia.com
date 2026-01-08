import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import Icon from "./Icon";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-parchment dark:bg-warmGray-900 flex flex-col justify-center items-center text-center px-4 py-8 sm:px-6 border-t border-sepia-200 dark:border-sepia-800">
      <div className="max-w-4xl mx-auto">
        {/* Contact section */}
        <div className="py-8">
          <p className="font-typewriter text-sm tracking-wider text-warmGray-600 dark:text-warmGray-300 mb-6">
            Feel free to reach out to me.
          </p>
          <ul className="flex flex-row justify-center items-center gap-4">
            <li>
              <Icon to={"https://www.linkedin.com/in/yuanjia1/"}>
                <FaLinkedin />
              </Icon>
            </li>
            <li>
              <Icon to={"https://github.com/yuan0-0jia"}>
                <FaGithub />
              </Icon>
            </li>
            <li>
              <Icon to={"mailto:hello.yuanjia@gmail.com"}>
                <FaEnvelope />
              </Icon>
            </li>
          </ul>
        </div>

        {/* Copyright section */}
        <div className="pt-6">
          <div className="vintage-divider mb-6">
            <span className="text-sepia-300 dark:text-sepia-600 text-xs">✦</span>
          </div>
          <p className="font-typewriter text-xs text-sepia-400 dark:text-sepia-500 mb-2 tracking-wider">
            &copy; {new Date().getFullYear()} Yuan Jia. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="font-typewriter text-xs text-sepia-400 dark:text-sepia-500 hover:text-sepia-600 dark:hover:text-sepia-400 transition-colors tracking-wider"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
