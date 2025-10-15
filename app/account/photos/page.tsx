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
        <p className="text-stone-500 dark:text-stone-300">
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
        <div className="bg-[#f7f7f7] dark:bg-zinc-900 rounded-lg shadow-sm p-8">
          <h2 className="text-lg font-medium mb-4 text-center">Header Photo</h2>
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <PhotoGridItem photo={headerPhoto} />
            </div>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 text-center mt-4">
            Hover over the image to update
          </p>
        </div>
      )}

      {/* Photo Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-center">Gallery Photos</h2>
        <div className="grid grid-cols-3 gap-8">
          {otherPhotos.map((photo) => (
            <PhotoGridItem key={photo.id} photo={photo} />
          ))}
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
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
          <h1 className="text-3xl font-semibold mb-2">Photos Management</h1>
          <p className="text-stone-500 dark:text-stone-300">
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
