"use client";

import { useState } from "react";
import Image from "next/image";
import { updatePhoto } from "../_lib/auth-action";
import { FaUpload } from "react-icons/fa6";
import SpinnerMini from "./SpinnerMini";

interface PhotoGridItemProps {
  photo: { id: number; image: string; title: string };
}

export default function PhotoGridItem({ photo }: PhotoGridItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("id", photo.id.toString());
      formData.append("image", file);
      formData.append("currentImage", photo.image);

      await updatePhoto(formData);
    } catch (error) {
      console.error("Error updating photo:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden group aspect-[3/2] w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={photo.image}
        alt={photo.title || ""}
        fill
        className="object-cover"
      />

      {/* Hover Overlay */}
      {(isHovered || isUploading) && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
          {isUploading ? (
            <div className="text-white">
              <SpinnerMini />
            </div>
          ) : (
            <label
              htmlFor={`photo-upload-${photo.id}`}
              className="cursor-pointer flex flex-col items-center gap-2 text-white hover:text-stone-200 transition-colors"
            >
              <FaUpload className="w-8 h-8" />
              <span className="text-sm font-medium">Update Photo</span>
              <input
                id={`photo-upload-${photo.id}`}
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
