import { redirect } from "next/navigation";
import { getUser } from "../../_lib/auth-action";
import { getPhotos } from "../../_lib/data-service";
import { Suspense } from "react";
import Spinner from "../../_components/Spinner";
import PhotoGridItem from "../../_components/PhotoGridItem";

export const metadata = {
  title: "Photos Management",
};

async function PhotosList() {
  const photos = await getPhotos();

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="font-typewriter text-sepia-500 dark:text-sepia-400 tracking-wider">
          No photos found. Add your first photo to get started.
        </p>
      </div>
    );
  }

  // Separate header photo (id=0) from other photos
  const headerPhoto = photos.find((photo) => photo.id === 0);
  const otherPhotos = photos
    .filter((photo) => photo.id !== 0)
    .sort((cur, next) => cur.id - next.id);

  return (
    <div className="space-y-6">
      {/* Header Photo Section */}
      {headerPhoto && (
        <div className="bg-parchment dark:bg-warmGray-800/50 vintage-border rounded-sm p-8">
          <h2 className="font-typewriter text-lg text-warmGray-800 dark:text-cream tracking-wide mb-4 text-center">
            Header Photo
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <PhotoGridItem photo={headerPhoto} />
            </div>
          </div>
          <p className="font-typewriter text-xs text-sepia-500 dark:text-sepia-400 text-center mt-4 tracking-wider">
            Hover over the image to update
          </p>
        </div>
      )}

      {/* Photo Grid */}
      <div className="space-y-4">
        <h2 className="font-typewriter text-lg text-warmGray-800 dark:text-cream tracking-wide text-center">
          Gallery Photos
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {otherPhotos.map((photo) => (
            <PhotoGridItem key={photo.id} photo={photo} />
          ))}
        </div>
        <p className="font-typewriter text-xs text-sepia-500 dark:text-sepia-400 text-center tracking-wider">
          Hover over any image to update
        </p>
      </div>
    </div>
  );
}

export default async function Page() {
  const { data, error } = await getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-6">
        <div className="text-center">
          <div className="vintage-divider mb-6">
            <span className="text-sepia-400 dark:text-sepia-500">✦</span>
          </div>
          <h1 className="font-typewriter text-2xl md:text-3xl text-warmGray-800 dark:text-cream tracking-wide mb-2">
            Photos Management
          </h1>
          <p className="font-typewriter text-sm text-sepia-500 dark:text-sepia-400 tracking-wider">
            Hover over any photo to update it
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          }
        >
          <PhotosList />
        </Suspense>
      </div>
    </div>
  );
}
