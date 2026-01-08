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
      <label className="block font-typewriter text-sm text-warmGray-700 dark:text-warmGray-200 tracking-wide">
        Project Thumbnail
      </label>
      
      <div
        className="relative w-full overflow-hidden rounded-sm bg-parchment dark:bg-warmGray-800 p-2 group vintage-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {displayImage ? (
          <Image
            src={displayImage}
            alt={projectName}
            width={400}
            height={300}
            className="w-full h-auto max-h-48 object-contain rounded-sm"
            unoptimized={!!preview}
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-sepia-100 dark:bg-warmGray-700 rounded-sm">
            <span className="font-typewriter text-sepia-500 dark:text-sepia-400 text-sm tracking-wide">
              No image
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-warmGray-900/60 flex items-center justify-center transition-opacity rounded-sm">
            <label
              htmlFor={`project-image-input-${projectId}`}
              className="cursor-pointer flex flex-col items-center gap-2 text-cream hover:text-sepia-200 transition-colors"
            >
              <FaUpload className="w-6 h-6" />
              <span className="font-typewriter text-xs tracking-wide">
                {displayImage ? "Change Image" : "Upload Image"}
              </span>
            </label>
          </div>
        )}

        {/* New Image Badge */}
        {preview && (
          <div className="absolute top-2 right-2 bg-sepia-500 text-cream font-typewriter text-xs px-2 py-1 rounded-sm shadow-lg tracking-wide">
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
      
      <p className="font-typewriter text-xs text-sepia-500 dark:text-sepia-400 text-center tracking-wider">
        {preview
          ? "✓ New image ready. Click 'Update Project' below to save."
          : "Hover over image to change (overrides screenshot URL)"}
      </p>
    </div>
  );
}

