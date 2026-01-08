import Image from "next/image";
import { login } from "../_lib/auth-action";

export default function SignInButton() {
  return (
    <form action={login}>
      <button
        className="flex items-center gap-4 font-typewriter text-sm tracking-wider px-8 py-4 border-2 border-sepia-400 text-sepia-600 dark:text-sepia-300 dark:border-sepia-500 transition-all duration-300 hover:bg-sepia-50 dark:hover:bg-sepia-900/30 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sepia-500 focus-visible:ring-offset-2"
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
