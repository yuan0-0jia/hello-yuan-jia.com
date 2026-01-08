import { redirect } from "next/navigation";
import { getUser, updateAbout } from "../../_lib/auth-action";
import SubmitButton from "../../_components/SubmitButton";
import { getAbout } from "../../_lib/data-service";
import { Suspense } from "react";
import Spinner from "../../_components/Spinner";
import AddParagraphModal from "../../_components/AddParagraphModal";
import DeleteParagraphButton from "../../_components/DeleteParagraphButton";
import AboutImageItem from "../../_components/AboutImageItem";

export const metadata = {
  title: "About Management",
};

async function AboutForm() {
  const about = await getAbout();

  if (!about || about.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="font-typewriter text-sepia-500 dark:text-sepia-400 tracking-wider">
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
        <div className="bg-parchment dark:bg-warmGray-800/50 vintage-border rounded-sm p-8">
          <h2 className="font-typewriter text-lg text-warmGray-800 dark:text-cream tracking-wide text-center mb-4">
            Header Section
          </h2>
          <div className="flex justify-center">
            <div className="space-y-2 w-full max-w-sm">
              <AboutImageItem section={header} noBackground />
              <p className="font-typewriter text-xs text-sepia-500 dark:text-sepia-400 text-center tracking-wider">
                Hover over image to update
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Paragraph Sections */}
      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-parchment dark:bg-warmGray-800/50 vintage-border rounded-sm p-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DeleteParagraphButton paragraphId={section.id.toString()} />
              <h2 className="font-typewriter text-lg text-warmGray-800 dark:text-cream tracking-wide">
                Paragraph {section.id}
              </h2>
            </div>
            <span className="font-typewriter text-xs text-sepia-400 dark:text-sepia-500 bg-sepia-100 dark:bg-sepia-900/50 px-2 py-1 border border-sepia-200 dark:border-sepia-700">
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
                    className="block font-typewriter text-sm text-warmGray-700 dark:text-warmGray-200 mb-1 tracking-wide"
                  >
                    Paragraph Content
                  </label>
                  <textarea
                    id={`desc-${section.id}`}
                    name="desc"
                    defaultValue={section.desc}
                    required
                    rows={8}
                    className="w-full rounded-sm border border-sepia-200 dark:border-sepia-700 bg-cream dark:bg-warmGray-800 px-3 py-2 font-typewriter text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sepia-500 text-warmGray-800 dark:text-warmGray-100 tracking-wide"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block font-typewriter text-sm text-warmGray-700 dark:text-warmGray-200 tracking-wide">
                    Paragraph Image
                  </label>
                  <AboutImageItem section={section} />
                  <p className="font-typewriter text-xs text-sepia-500 dark:text-sepia-400 text-center tracking-wider">
                    Hover over image to update
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
            <div className="vintage-divider mb-6">
              <span className="text-sepia-400 dark:text-sepia-500">✦</span>
            </div>
            <h1 className="font-typewriter text-2xl md:text-3xl text-warmGray-800 dark:text-cream tracking-wide mb-2">
              About Section Management
            </h1>
            <p className="font-typewriter text-sm text-sepia-500 dark:text-sepia-400 tracking-wider">
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
