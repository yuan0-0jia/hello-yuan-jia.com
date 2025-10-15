import { redirect } from "next/navigation";
import { getUser, updateProject } from "../../_lib/auth-action";
import SubmitButton from "../../_components/SubmitButton";
import { getProjects } from "../../_lib/data-service";
import { Suspense } from "react";
import Spinner from "../../_components/Spinner";
import AddProjectModal from "../../_components/AddProjectModal";
import DeleteProjectButton from "../../_components/DeleteProjectButton";
import ProjectImageItem from "../../_components/ProjectImageItem";

export const metadata = {
  title: "Projects Setting",
};

async function ProjectsList() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-stone-500 dark:text-stone-300">
          No projects found. Add your first project to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-[#f7f7f7] dark:bg-zinc-900 rounded-lg shadow-sm p-8 relative"
        >
          <DeleteProjectButton projectId={project.id} />
          <form action={updateProject} className="space-y-6">
            <input type="hidden" name="id" value={project.id} />
            <input
              type="hidden"
              name="currentImage"
              value={project.thumbnail}
            />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor={`project-${project.id}`}
                    className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    id={`project-${project.id}`}
                    name="project"
                    defaultValue={project.project}
                    required
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`desc-${project.id}`}
                    className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id={`desc-${project.id}`}
                    name="desc"
                    defaultValue={project.desc}
                    required
                    rows={4}
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`to-${project.id}`}
                    className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
                  >
                    Project Link
                  </label>
                  <input
                    type="text"
                    id={`to-${project.id}`}
                    name="to"
                    defaultValue={project.to}
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
                    placeholder="https://example.com or /internal-path"
                  />
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    External URL (https://...) or internal path (/...)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor={`button-${project.id}`}
                    className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
                  >
                    Button Text
                  </label>
                  <input
                    type="text"
                    id={`button-${project.id}`}
                    name="button"
                    defaultValue={project.button}
                    className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="space-y-4 flex items-start justify-center">
                <div className="space-y-2 w-full max-w-md">
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-200">
                    Project Image
                  </label>
                  <ProjectImageItem project={project} />
                  <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
                    Hover over image to update
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <SubmitButton>Update Project</SubmitButton>
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
            <h1 className="text-3xl font-semibold mb-2">Projects Management</h1>
            <p className="text-stone-500 dark:text-stone-300">
              Manage your portfolio projects
            </p>
          </div>
          <AddProjectModal />
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          }
        >
          <ProjectsList />
        </Suspense>
      </div>
    </div>
  );
}
