"use client";

import { useState } from "react";
import Image from "next/image";
import { updateAva } from "../_lib/auth-action";
import { FaUpload } from "react-icons/fa6";
import SpinnerMini from "./SpinnerMini";

interface AvatarImageItemProps {
  avatar: {
    id: number;
    image: string;
  };
}

export default function AvatarImageItem({ avatar }: AvatarImageItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("id", avatar.id.toString());
      formData.append("image", file);

      await updateAva(formData);
    } catch (error) {
      console.error("Error updating avatar:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="relative h-40 w-40 rounded-full overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        alt="Profile"
        src={avatar.image}
        fill
        priority={true}
        quality={75}
        sizes="160px"
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
              htmlFor="avatar-upload"
              className="cursor-pointer flex flex-col items-center gap-1 text-white hover:text-stone-200 transition-colors"
            >
              <FaUpload className="w-6 h-6" />
              <span className="text-xs font-medium">Update</span>
              <input
                id="avatar-upload"
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
