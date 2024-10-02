import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex flex-col flex-auto content-center justify-center items-center">
      <h1 className="font-semibold text-3xl text-center m-5  tracking-wide">
        Update?
      </h1>

      <SignInButton />
    </div>
  );
}
