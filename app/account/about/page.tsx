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
      <div className="text-center py-8">
        <p className="text-stone-500 dark:text-stone-300">
          No about section found. Add your first about section to get started.
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
          {about.map((section) => (
            <tr key={section.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative h-16 w-16">
                  <Image
                    alt={section.title}
                    src={section.photo}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <form action={updateAbout} className="space-y-4">
                  <input type="hidden" name="id" value={section.id} />
                  <input
                    type="hidden"
                    name="currentImage"
                    value={section.photo}
                  />
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="title"
                      defaultValue={section.title}
                      required
                      className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
                    />
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
                    <SubmitButton>Update</SubmitButton>
                  </div>
                </form>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  type="submit"
                  form={`form-${section.id}`}
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
          <h1 className="text-3xl font-semibold mb-3">
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
