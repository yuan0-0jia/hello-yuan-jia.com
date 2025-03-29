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

  const aboutData = about[0]; // Assuming we only have one about section

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-8">
      <form action={updateAbout} className="space-y-6">
        <input type="hidden" name="id" value={aboutData.id} />
        <input type="hidden" name="currentImage" value={aboutData.image} />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={aboutData.title}
                required
                className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                defaultValue={aboutData.content}
                required
                rows={8}
                className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
              >
                About Image
              </label>
              <div className="relative h-64 w-full mb-4">
                <Image
                  alt={aboutData.title}
                  src={aboutData.image}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-stone-900 dark:file:text-stone-100 file:text-sm file:font-medium placeholder:text-stone-400 dark:placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <SubmitButton>Update About Section</SubmitButton>
        </div>
      </form>
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
