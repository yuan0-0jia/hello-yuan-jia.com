import { redirect } from "next/navigation";
import { getUser, updateAbout } from "../../_lib/auth-action";
import SubmitButton from "../../_components/SubmitButton";
import { getAbout } from "../../_lib/data-service";
import Image from "next/image";
import { Suspense } from "react";
import Spinner from "../../_components/Spinner";
import AddParagraphModal from "../../_components/AddParagraphModal";
import DeleteParagraphButton from "../../_components/DeleteParagraphButton";

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
    <div className="grid gap-8">
      {/* Header Section */}
      {header && (
        <div className="bg-[#f7f7f7] dark:bg-zinc-900 rounded-lg shadow-sm p-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Header Section</h2>
            <span className="text-xs text-stone-400 dark:text-stone-500 bg-stone-200 dark:bg-zinc-800 px-2 py-1 rounded">
              ID: {header.id}
            </span>
          </div>
          <form action={updateAbout} className="space-y-6">
            <input type="hidden" name="id" value={header.id} />
            <input
              type="hidden"
              name="currentImage"
              value={header.photo || ""}
            />
            <input type="hidden" name="desc" value={header.desc} />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center">
                {header.photo ? (
                  <div className="relative w-full max-w-[200px] overflow-hidden rounded-lg bg-stone-200 dark:bg-zinc-800 p-2 flex justify-center">
                    <Image
                      alt="Header preview"
                      src={header.photo}
                      width={200}
                      height={200}
                      className="h-auto max-h-48 object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="h-40 w-40 flex items-center justify-center text-stone-400 dark:text-stone-500 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-lg">
                    No Image
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="photo-header"
                    className="block text-sm font-medium text-stone-700 dark:text-stone-200"
                  >
                    Header Image
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    id="photo-header"
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-stone-900 dark:file:text-stone-100 file:text-sm file:font-medium placeholder:text-stone-400 dark:placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500"
                  />
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    This image appears at the top of your About page
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <SubmitButton>Update Header</SubmitButton>
            </div>
          </form>
        </div>
      )}

      {/* Paragraph Sections */}
      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-[#f7f7f7] dark:bg-zinc-900 rounded-lg shadow-sm p-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DeleteParagraphButton paragraphId={section.id.toString()} />
              <h2 className="text-lg font-medium">Paragraph {section.id}</h2>
            </div>
            <span className="text-xs text-stone-400 dark:text-stone-500 bg-stone-200 dark:bg-zinc-800 px-2 py-1 rounded">
              ID: {section.id}
            </span>
          </div>

          <form action={updateAbout} className="space-y-6">
            <input type="hidden" name="id" value={section.id} />
            <input
              type="hidden"
              name="currentImage"
              value={section.photo || ""}
            />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor={`desc-${section.id}`}
                    className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
                  >
                    Paragraph Content
                  </label>
                  <textarea
                    id={`desc-${section.id}`}
                    name="desc"
                    defaultValue={section.desc}
                    required
                    rows={8}
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor={`photo-${section.id}`}
                    className="block text-sm font-medium text-stone-700 dark:text-stone-200"
                  >
                    Paragraph Image
                  </label>
                  {section.photo ? (
                    <div className="relative w-full overflow-hidden rounded-md bg-stone-200 dark:bg-zinc-800 p-2 flex justify-center">
                      <Image
                        alt={`Paragraph ${section.id}`}
                        src={section.photo}
                        width={400}
                        height={300}
                        className="h-auto max-h-48 object-contain rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="relative h-40 w-full flex items-center justify-center text-stone-400 dark:text-stone-500 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-md">
                      No Image
                    </div>
                  )}
                  <input
                    type="file"
                    id={`photo-${section.id}`}
                    name="photo"
                    accept="image/*"
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-stone-900 dark:file:text-stone-100 file:text-sm file:font-medium placeholder:text-stone-400 dark:placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500"
                  />
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Optional: Images appear beside paragraphs (alternating
                    sides)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <SubmitButton>Update Paragraph</SubmitButton>
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-semibold mb-2">
              About Section Management
            </h1>
            <p className="text-stone-500 dark:text-stone-300">
              Manage your about section content
            </p>
          </div>
          <AddParagraphModal />
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
