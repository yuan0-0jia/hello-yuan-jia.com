import { useState } from "react";
import Button from "./Button";
import FormRowVertical from "./FormRowVertical";
import { useLogin } from "../util/useLogin";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <input
            className="px-3 py-3 shadow-sm border rounded border-zinc-300 bg-zinc-100 focus:ring-zinc-600 focus:border-zinc-600"
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <input
            className="px-3 py-3 shadow-sm border rounded border-zinc-300 bg-zinc-100 focus:ring-zinc-600 focus:border-zinc-600"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <div className="m-5">
          <FormRowVertical>
            <Button type="small" disabled={isLoading}>
              {!isLoading ? "Login" : <Spinner className="fill-zinc-600" />}
            </Button>
            <Link
              to="/"
              className="mx-auto w-fit text-center text-xs text-zinc-600 hover:underline hover:underline-offset-4"
              disabled={isLoading}
            >
              GO BACK
            </Link>
          </FormRowVertical>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
