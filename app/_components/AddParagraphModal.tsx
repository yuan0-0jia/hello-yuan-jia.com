"use client";

import { useState } from "react";
import { createParagraph } from "../_lib/auth-action";
import SubmitButton from "./SubmitButton";

export default function AddParagraphModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      await createParagraph(formData);
      setIsOpen(false);
      // Reset form would happen automatically on close
    } catch (error) {
      console.error("Error creating paragraph:", error);
    }
  };

  return (
    <>
      {/* Add Paragraph Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-stone-200 dark:bg-zinc-800 rounded-lg px-6 py-2 font-semibold hover:bg-stone-300 dark:hover:bg-zinc-700 transition-colors"
      >
        Add Paragraph
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  Add New Paragraph
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 text-2xl leading-none"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="desc"
                      className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
                    >
                      Paragraph Content *
                    </label>
                    <textarea
                      id="desc"
                      name="desc"
                      required
                      rows={6}
                      className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
                      placeholder="Enter your paragraph content here..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-stone-900 dark:file:text-stone-100 file:text-sm file:font-medium placeholder:text-stone-400 dark:placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500"
                    />
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      Optional: Upload an image to accompany the paragraph
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <SubmitButton>Create Paragraph</SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
