import { FaArrowRightFromBracket } from "react-icons/fa6";
import { logout } from "../_lib/auth-action";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <button className="py-3 px-4 flex items-center gap-4 w-full font-typewriter text-sm tracking-wide text-warmGray-600 dark:text-warmGray-300 hover:text-sepia-700 dark:hover:text-sepia-300 transition-colors">
        <FaArrowRightFromBracket className="h-5 w-5" />
        <span>Sign out</span>
      </button>
    </form>
  );
}
