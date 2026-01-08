import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex flex-col flex-auto content-center justify-center items-center px-4">
      <div className="text-center">
        <div className="vintage-divider mb-6">
          <span className="text-sepia-400 dark:text-sepia-500">✦</span>
        </div>
        <h1 className="font-typewriter text-2xl md:text-3xl text-warmGray-800 dark:text-cream mb-8 tracking-wide">
          Sign In
      </h1>
      <SignInButton />
      </div>
    </div>
  );
}
