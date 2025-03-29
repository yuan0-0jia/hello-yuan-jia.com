import { redirect } from "next/navigation";
import { getUser, updateAbout } from "../../_lib/auth-action";
import SubmitButton from "../../_components/SubmitButton";
import { getAbout } from "../../_lib/data-service";
import Image from "next/image";
import { Suspense } from "react";
import Spinner from "../../_components/Spinner";

export const metadata = {
  title: "About Management",
};

async function AboutForm() {
  const about = await getAbout();

  if (!about || about.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-stone-500 dark:text-stone-300">
          No about section found. Add your first about section to get started.
        </p>
      </div>
    );
  }

  const header = about.find((section) => section.id === 0);
  const sections = about
    .filter((section) => section.id !== 0)
    .sort((a, b) => a.id - b.id);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      {header && (
        <div className="bg-[#f7f7f7] dark:bg-zinc-900 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Header Section</h2>
          <form action={updateAbout} id="form-header" className="space-y-4">
            <input type="hidden" name="id" value={header.id} />
            <input type="hidden" name="currentImage" value={header.photo} />
            <input type="hidden" name="desc" value={header.desc} />
            <div className="flex items-center space-x-4">
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="hidden"
                id="photo-header"
              />
              <label
                htmlFor="photo-header"
                className="cursor-pointer text-sm text-stone-500 dark:text-stone-300 hover:text-stone-700 dark:hover:text-stone-100"
              >
                Change Image
              </label>
            </div>
            <div
              id="error-header"
              className="text-red-500 text-sm hidden"
            ></div>
            <div className="flex justify-end">
              <SubmitButton form="form-header" pendingLabel="Updating...">
                Update Header
              </SubmitButton>
            </div>
          </form>
        </div>
      )}

      {/* Other Sections */}
      <div className="bg-[#f7f7f7] dark:bg-zinc-900 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-700">
          <thead className="bg-stone-50 dark:bg-zinc-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-300 uppercase tracking-wider"
              >
                ID
              </th>
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
                Content
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
            {sections.map((section) => (
              <tr key={section.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 dark:text-stone-400">
                  {section.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative h-16 w-16">
                    {section.photo ? (
                      <Image
                        alt="Section preview"
                        src={section.photo}
                        fill
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-stone-400 dark:text-stone-500">
                        /
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <form
                    action={updateAbout}
                    id={`form-${section.id}`}
                    className="space-y-4"
                  >
                    <input type="hidden" name="id" value={section.id} />
                    <input
                      type="hidden"
                      name="currentImage"
                      value={section.photo}
                    />
                    <div className="space-y-2">
                      <textarea
                        name="desc"
                        defaultValue={section.desc}
                        required
                        rows={3}
                        className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        className="hidden"
                        id={`photo-${section.id}`}
                      />
                      <label
                        htmlFor={`photo-${section.id}`}
                        className="cursor-pointer text-sm text-stone-500 dark:text-stone-300 hover:text-stone-700 dark:hover:text-stone-100"
                      >
                        Change Image
                      </label>
                    </div>
                    <div
                      id={`error-${section.id}`}
                      className="text-red-500 text-sm hidden"
                    ></div>
                  </form>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <SubmitButton
                    form={`form-${section.id}`}
                    pendingLabel="Updating..."
                  >
                    Update
                  </SubmitButton>
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
          <h1 className="text-3xl font-semibold mb-2">
            About Section Management
          </h1>
          <p className="text-stone-500 dark:text-stone-300">
            Manage your about section content
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          }
        >
          <AboutForm />
        </Suspense>
      </div>
    </div>
  );
}
