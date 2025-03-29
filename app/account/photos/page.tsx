import { redirect } from "next/navigation";
import { getUser, updatePhoto } from "../../_lib/auth-action";
import SubmitButton from "../../_components/SubmitButton";
import { getPhotos } from "../../_lib/data-service";
import Image from "next/image";
import { Suspense } from "react";
import Spinner from "../../_components/Spinner";

export const metadata = {
  title: "Photos Management",
};

async function PhotosList() {
  const photos = await getPhotos();

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-stone-500 dark:text-stone-300">
          No photos found. Add your first photo to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-8"
        >
          <form action={updatePhoto} className="space-y-6">
            <input type="hidden" name="id" value={photo.id} />
            <input type="hidden" name="currentImage" value={photo.image} />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor={`title-${photo.id}`}
                    className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id={`title-${photo.id}`}
                    name="title"
                    defaultValue={photo.title}
                    required
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor={`image-${photo.id}`}
                    className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
                  >
                    Photo
                  </label>
                  <div className="relative h-64 w-full mb-4">
                    <Image
                      alt={photo.title}
                      src={photo.image}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <input
                    type="file"
                    id={`image-${photo.id}`}
                    name="image"
                    accept="image/*"
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-stone-900 dark:file:text-stone-100 file:text-sm file:font-medium placeholder:text-stone-400 dark:placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <SubmitButton>Update Photo</SubmitButton>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}

export default async function Page() {
  const { data, error } = await getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-3">Photos Management</h1>
          <p className="text-stone-500 dark:text-stone-300">
            Manage your portfolio photos
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
