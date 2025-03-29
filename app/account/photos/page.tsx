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
    <div className="bg-[#f7f7f7] dark:bg-zinc-900 rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-700">
        <thead className="bg-stone-50 dark:bg-zinc-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-300 uppercase tracking-wider"
            >
              Preview
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-300 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-stone-500 dark:text-stone-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-zinc-900 divide-y divide-stone-200 dark:divide-stone-700">
          {photos.map((photo) => (
            <tr key={photo.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative h-16 w-16">
                  <Image
                    alt={photo.title}
                    src={photo.image}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <form
                  action={updatePhoto}
                  className="flex items-center space-x-4"
                >
                  <input type="hidden" name="id" value={photo.id} />
                  <input
                    type="hidden"
                    name="currentImage"
                    value={photo.image}
                  />
                  <input
                    type="text"
                    name="title"
                    defaultValue={photo.title}
                    required
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
                  />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    id={`image-${photo.id}`}
                  />
                  <label
                    htmlFor={`image-${photo.id}`}
                    className="cursor-pointer text-sm text-stone-500 dark:text-stone-300 hover:text-stone-700 dark:hover:text-stone-100"
                  >
                    Change Image
                  </label>
                  <SubmitButton>Update</SubmitButton>
                </form>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  type="submit"
                  form={`form-${photo.id}`}
                  className="text-stone-500 dark:text-stone-300 hover:text-stone-700 dark:hover:text-stone-100"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
