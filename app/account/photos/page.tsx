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
      <div className="text-center py-6">
        <p className="text-stone-500 dark:text-stone-300">
          No photos found. Add your first photo to get started.
        </p>
      </div>
    );
  }

  // Separate header photo (id=0) from other photos
  const headerPhoto = photos.find((photo) => photo.id === 0);
  const otherPhotos = photos.filter((photo) => photo.id !== 0);

  return (
    <div className="space-y-6">
      {/* Header Photo Section */}
      {headerPhoto && (
        <div className="bg-[#f7f7f7] dark:bg-zinc-900 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Header Photo</h2>
          <form action={updatePhoto} className="space-y-4">
            <input type="hidden" name="id" value={headerPhoto.id} />
            <input
              type="hidden"
              name="currentImage"
              value={headerPhoto.image}
            />
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image
                  alt="Header Photo"
                  src={headerPhoto.image}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  id="header-image"
                />
                <label
                  htmlFor="header-image"
                  className="cursor-pointer text-sm text-stone-500 dark:text-stone-300 hover:text-stone-700 dark:hover:text-stone-100"
                >
                  Change Header Image
                </label>
                <SubmitButton>Update Header</SubmitButton>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Other Photos Table */}
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
                className="px-6 py-3 text-right text-xs font-medium text-stone-500 dark:text-stone-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-stone-200 dark:divide-stone-700">
            {otherPhotos.map((photo) => (
              <tr key={photo.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative h-16 w-16">
                    <Image
                      alt="Photo preview"
                      src={photo.image}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <form action={updatePhoto} id={`form-${photo.id}`}>
                    <input type="hidden" name="id" value={photo.id} />
                    <input
                      type="hidden"
                      name="currentImage"
                      value={photo.image}
                    />
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      id={`photo-${photo.id}`}
                    />
                    <label
                      htmlFor={`photo-${photo.id}`}
                      className="cursor-pointer text-sm text-stone-500 dark:text-stone-300 hover:text-stone-700 dark:hover:text-stone-100 mr-4"
                    >
                      Change Image
                    </label>
                    <SubmitButton
                      form={`form-${photo.id}`}
                      pendingLabel="Updating..."
                    >
                      Update
                    </SubmitButton>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-2">Photos Management</h1>
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
