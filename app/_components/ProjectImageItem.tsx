"use client";

import { useState } from "react";
import Image from "next/image";
import { updateProject } from "../_lib/auth-action";
import { FaUpload } from "react-icons/fa6";
import SpinnerMini from "./SpinnerMini";

interface ProjectImageItemProps {
  project: {
    id: string;
    project: string;
    desc: string;
    to: string;
    button: string;
    thumbnail: string;
  };
}

export default function ProjectImageItem({ project }: ProjectImageItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("id", project.id);
      formData.append("project", project.project);
      formData.append("desc", project.desc);
      formData.append("to", project.to);
      formData.append("button", project.button);
      formData.append("image", file);
      formData.append("currentImage", project.thumbnail);

      await updateProject(formData);
    } catch (error) {
      console.error("Error updating project image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-md bg-stone-200 dark:bg-zinc-800 p-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        alt={project.project}
        src={project.thumbnail}
        width={400}
        height={300}
        className="w-full h-auto max-h-48 object-contain rounded-md"
      />

      {/* Hover Overlay */}
      {(isHovered || isUploading) && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity rounded-md">
          {isUploading ? (
            <div className="text-white">
              <SpinnerMini />
            </div>
          ) : (
            <label
              htmlFor={`project-image-${project.id}`}
              className="cursor-pointer flex flex-col items-center gap-2 text-white hover:text-stone-200 transition-colors"
            >
              <FaUpload className="w-6 h-6" />
              <span className="text-xs font-medium">Update Image</span>
              <input
                id={`project-image-${project.id}`}
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
