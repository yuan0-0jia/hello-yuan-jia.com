"use client";

import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { deleteParagraph } from "../_lib/auth-action";
import SpinnerMini from "./SpinnerMini";

export default function DeleteParagraphButton({
  paragraphId,
}: {
  paragraphId: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const formData = new FormData();
      formData.append("id", paragraphId);
      await deleteParagraph(formData);
    } catch (error) {
      console.error("Error deleting paragraph:", error);
      setIsDeleting(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-600 dark:bg-red-700 text-white rounded-md px-3 py-1.5 font-semibold hover:bg-red-700 dark:hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-400 dark:disabled:bg-red-500 text-xs"
        >
          {isDeleting ? <SpinnerMini /> : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="bg-stone-200 dark:bg-zinc-800 rounded-md px-3 py-1.5 font-semibold hover:bg-stone-300 dark:hover:bg-zinc-700 disabled:cursor-not-allowed text-xs"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowConfirm(true)}
      className="text-stone-500 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
      aria-label="Delete paragraph"
    >
      <FaXmark className="w-5 h-5" />
    </button>
  );
}
