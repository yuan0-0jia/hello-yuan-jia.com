"use client";

import { useState } from "react";
import Image from "next/image";
import { FaUpload } from "react-icons/fa6";

interface ProjectImageInputProps {
  currentThumbnail: string | null;
  projectName: string;
  projectId: string;
}

export default function ProjectImageInput({
  currentThumbnail,
  projectName,
  projectId,
}: ProjectImageInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  // Show preview if available, otherwise show current thumbnail
  const displayImage = preview || currentThumbnail;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700 dark:text-stone-200">
        Project Image
      </label>
      
      <div
        className="relative w-full overflow-hidden rounded-md bg-stone-200 dark:bg-zinc-800 p-2 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {displayImage ? (
          <Image
            src={displayImage}
            alt={projectName}
            width={400}
            height={300}
            className="w-full h-auto max-h-48 object-contain rounded-md"
            unoptimized={!!preview}
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-stone-300 dark:bg-zinc-700 rounded-md">
            <span className="text-stone-500 dark:text-stone-400 text-sm">
              No image
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity rounded-md">
            <label
              htmlFor={`project-image-input-${projectId}`}
              className="cursor-pointer flex flex-col items-center gap-2 text-white hover:text-stone-200 transition-colors"
            >
              <FaUpload className="w-6 h-6" />
              <span className="text-xs font-medium">
                {displayImage ? "Change Image" : "Upload Image"}
              </span>
            </label>
          </div>
        )}

        {/* New Image Badge */}
        {preview && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg">
            New image selected
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        id={`project-image-input-${projectId}`}
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
        {preview
          ? "✓ New image ready. Click 'Update Project' below to save."
          : "Hover over image to change (optional)"}
      </p>
    </div>
  );
}

