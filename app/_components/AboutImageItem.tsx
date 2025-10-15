"use client";

import { useState } from "react";
import Image from "next/image";
import { updateAbout } from "../_lib/auth-action";
import { FaUpload } from "react-icons/fa6";
import SpinnerMini from "./SpinnerMini";

interface AboutImageItemProps {
  section: {
    id: number;
    desc: string;
    photo: string | null;
  };
  noBackground?: boolean;
}

export default function AboutImageItem({
  section,
  noBackground = false,
}: AboutImageItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("id", section.id.toString());
      formData.append("desc", section.desc);
      formData.append("photo", file);
      formData.append("currentImage", section.photo || "");

      await updateAbout(formData);
    } catch (error) {
      console.error("Error updating image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-md flex justify-center group ${
        noBackground ? "" : "bg-stone-200 dark:bg-zinc-800 p-2"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {section.photo ? (
        <Image
          alt={`Section ${section.id}`}
          src={section.photo}
          width={400}
          height={300}
          className="h-auto max-h-48 object-contain rounded-md"
        />
      ) : (
        <div className="h-40 w-full flex items-center justify-center text-stone-400 dark:text-stone-500">
          No Image
        </div>
      )}

      {/* Hover Overlay */}
      {(isHovered || isUploading) && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity rounded-md">
          {isUploading ? (
            <div className="text-white">
              <SpinnerMini />
            </div>
          ) : (
            <label
              htmlFor={`about-image-${section.id}`}
              className="cursor-pointer flex flex-col items-center gap-2 text-white hover:text-stone-200 transition-colors"
            >
              <FaUpload className="w-6 h-6" />
              <span className="text-xs font-medium">
                {section.photo ? "Update Image" : "Add Image"}
              </span>
              <input
                id={`about-image-${section.id}`}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
}
