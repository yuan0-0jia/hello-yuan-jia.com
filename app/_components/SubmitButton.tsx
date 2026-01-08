"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingLabel = "Updating...",
  form,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  form?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      form={form}
      className="font-typewriter text-sm tracking-wider bg-sepia-600 text-cream px-6 py-2 border border-sepia-700 hover:bg-sepia-700 transition-colors disabled:cursor-not-allowed disabled:bg-sepia-400 disabled:border-sepia-400"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
