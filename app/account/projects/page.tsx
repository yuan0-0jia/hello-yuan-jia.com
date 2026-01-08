import { redirect } from "next/navigation";
import { getUser, updateProject } from "../../_lib/auth-action";
import SubmitButton from "../../_components/SubmitButton";
import { getProjects } from "../../_lib/data-service";
import { Suspense } from "react";
import Spinner from "../../_components/Spinner";
import AddProjectModal from "../../_components/AddProjectModal";
import DeleteProjectButton from "../../_components/DeleteProjectButton";
import ProjectImageInput from "../../_components/ProjectImageInput";

export const metadata = {
  title: "Projects Setting",
};

async function ProjectsList() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="font-typewriter text-sepia-500 dark:text-sepia-400 tracking-wider">
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
          className="bg-parchment dark:bg-warmGray-800/50 vintage-border rounded-sm p-8 relative"
        >
          <DeleteProjectButton projectId={project.id} />
          <form action={updateProject} className="space-y-6">
            <input type="hidden" name="id" value={project.id} />
            <input
              type="hidden"
              name="currentImage"
              value={project.thumbnail || ""}
            />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor={`project-${project.id}`}
                    className="block font-typewriter text-sm text-warmGray-700 dark:text-warmGray-200 mb-1 tracking-wide"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    id={`project-${project.id}`}
                    name="project"
                    defaultValue={project.project}
                    required
                    className="w-full rounded-sm border border-sepia-200 dark:border-sepia-700 bg-cream dark:bg-warmGray-800 px-3 py-2 font-typewriter text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sepia-500 text-warmGray-800 dark:text-warmGray-100 tracking-wide"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`desc-${project.id}`}
                    className="block font-typewriter text-sm text-warmGray-700 dark:text-warmGray-200 mb-1 tracking-wide"
                  >
                    Description
                  </label>
                  <textarea
                    id={`desc-${project.id}`}
                    name="desc"
                    defaultValue={project.desc}
                    required
                    rows={4}
                    className="w-full rounded-sm border border-sepia-200 dark:border-sepia-700 bg-cream dark:bg-warmGray-800 px-3 py-2 font-typewriter text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sepia-500 text-warmGray-800 dark:text-warmGray-100 tracking-wide"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`to-${project.id}`}
                    className="block font-typewriter text-sm text-warmGray-700 dark:text-warmGray-200 mb-1 tracking-wide"
                  >
                    Project Link
                  </label>
                  <input
                    type="text"
                    id={`to-${project.id}`}
                    name="to"
                    defaultValue={project.to}
                    className="w-full rounded-sm border border-sepia-200 dark:border-sepia-700 bg-cream dark:bg-warmGray-800 px-3 py-2 font-typewriter text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sepia-500 text-warmGray-800 dark:text-warmGray-100 tracking-wide"
                    placeholder="https://example.com or /internal-path"
                  />
                  <p className="font-typewriter text-xs text-sepia-500 dark:text-sepia-400 mt-1 tracking-wider">
                    External URL (https://...) or internal path (/...)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor={`button-${project.id}`}
                    className="block font-typewriter text-sm text-warmGray-700 dark:text-warmGray-200 mb-1 tracking-wide"
                  >
                    Button Text
                  </label>
                  <input
                    type="text"
                    id={`button-${project.id}`}
                    name="button"
                    defaultValue={project.button}
                    className="w-full rounded-sm border border-sepia-200 dark:border-sepia-700 bg-cream dark:bg-warmGray-800 px-3 py-2 font-typewriter text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sepia-500 text-warmGray-800 dark:text-warmGray-100 tracking-wide"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <ProjectImageInput
                  currentThumbnail={project.thumbnail}
                  projectName={project.project}
                  projectId={project.id}
                />
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
            <div className="vintage-divider mb-6">
              <span className="text-sepia-400 dark:text-sepia-500">✦</span>
            </div>
            <h1 className="font-typewriter text-2xl md:text-3xl text-warmGray-800 dark:text-cream tracking-wide mb-2">
              Projects Management
            </h1>
            <p className="font-typewriter text-sm text-sepia-500 dark:text-sepia-400 tracking-wider">
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
