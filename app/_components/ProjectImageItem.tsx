"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    thumbnail: string | null;
  };
}

export default function ProjectImageItem({ project }: ProjectImageItemProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed");
    const file = e.target.files?.[0];
    console.log("Selected file:", file?.name, file?.size);

    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log("Starting upload...");
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("id", project.id);
      formData.append("project", project.project);
      formData.append("desc", project.desc);
      formData.append("to", project.to);
      formData.append("button", project.button);
      formData.append("image", file);
      formData.append("currentImage", project.thumbnail || "");

      console.log("Calling updateProject...");
      await updateProject(formData);
      console.log("Upload successful!");

      // Success - refresh to show updated image
      router.refresh();
    } catch (error) {
      console.error("Error updating project image:", error);
      alert(
        `Failed to update image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Fallback placeholder image if thumbnail is missing
  const imageSrc = project.thumbnail || "/placeholder-project.png";

  return (
    <div
      className="relative w-full overflow-hidden rounded-md bg-stone-200 dark:bg-zinc-800 p-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {project.thumbnail ? (
        <Image
          alt={project.project}
          src={project.thumbnail}
          width={400}
          height={300}
          className="w-full h-auto max-h-48 object-contain rounded-md"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-stone-300 dark:bg-zinc-700 rounded-md">
          <span className="text-stone-500 dark:text-stone-400 text-sm">
            No image
          </span>
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
              htmlFor={`project-image-${project.id}`}
              className="cursor-pointer flex flex-col items-center gap-2 text-white hover:text-stone-200 transition-colors"
            >
              <FaUpload className="w-6 h-6" />
              <span className="text-xs font-medium">
                {project.thumbnail ? "Update Image" : "Upload Image"}
              </span>
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
