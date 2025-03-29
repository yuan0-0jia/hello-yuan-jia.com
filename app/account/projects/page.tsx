import { redirect } from "next/navigation";
import { getUser, updateProject } from "../../_lib/auth-action";
import SubmitButton from "../../_components/SubmitButton";
import { getProjects } from "../../_lib/data-service";
import Image from "next/image";

export const metadata = {
  title: "Projects Setting",
};

export default async function Page() {
  const { data, error } = await getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-3">Projects Management</h1>
          <p className="text-stone-500 dark:text-stone-300">
            Manage your portfolio projects
          </p>
        </div>

        <div className="grid gap-8">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-8"
            >
              <form action={updateProject} className="space-y-6">
                <input type="hidden" name="id" value={project.id} />
                <input
                  type="hidden"
                  name="currentImage"
                  value={project.image}
                />

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`title-${project.id}`}
                        className="block text-sm font-medium mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id={`title-${project.id}`}
                        name="title"
                        defaultValue={project.title}
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`description-${project.id}`}
                        className="block text-sm font-medium mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        id={`description-${project.id}`}
                        name="description"
                        defaultValue={project.description}
                        required
                        rows={4}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`link-${project.id}`}
                        className="block text-sm font-medium mb-1"
                      >
                        Project Link
                      </label>
                      <input
                        type="url"
                        id={`link-${project.id}`}
                        name="link"
                        defaultValue={project.link}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`image-${project.id}`}
                        className="block text-sm font-medium mb-1"
                      >
                        Project Image
                      </label>
                      <div className="relative h-48 w-full mb-4">
                        <Image
                          alt={project.title}
                          src={project.image}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <input
                        type="file"
                        id={`image-${project.id}`}
                        name="image"
                        accept="image/*"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
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
      </div>
    </div>
  );
}
