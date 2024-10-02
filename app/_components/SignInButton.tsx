import Image from "next/image";
// import { signInAction } from "../_lib/action";
import { login } from "../_lib/auth-action";

export default function SignInButton() {
  return (
    <form action={login}>
      <button
        className="flex items-center gap-6 text-lg  border-primary-300 px-10 py-4 font-medium rounded-full border-2 border-zinc-600 text-zinc-600
        dark:border-zinc-300 dark:text-zinc-300 transition-colors duration-300
        hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:outline-none focus:ring
        focus:ring-slate-100 dark:focus:ring-slate-700 focus:ring-offset-2
        disabled:cursor-not-allowed"
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
