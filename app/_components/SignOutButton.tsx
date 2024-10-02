import { FaArrowRightFromBracket } from "react-icons/fa6";
import { logout } from "../_lib/auth-action";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <button className="py-3 px-5 flex items-center gap-4 font-normal w-full">
        <FaArrowRightFromBracket className="h-5 w-5" />
        <span>Sign out</span>
      </button>
    </form>
  );
}
