"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingLabel = "Updating...",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-stone-200 dark:bg-zinc-800 rounded-lg px-6 py-2 font-semibold hover:bg-stone-300 dark:hover:bg-zinc-700  disabled:cursor-not-allowed disabled:bg-stone-400
      dark:disabled:bg-zinc-500 "
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
