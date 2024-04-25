import { useProjects } from "../util/Project/useProjects";
import Project from "./Project";
import { Spinner } from "flowbite-react";

function Projects() {
  const { isLoading, projects } = useProjects();

  return (
    <section className="mt-40 px-4 py-4 bg-[#f7f7f7] tracking-wide">
      <div className="text-center">
        <header>
          <h2 className="before:mx-auto before:my-8 before:block before:w-16 before:h-1px before:border-t before:border-slate-500 before:opacity-35 text-4xl font-extralight tracking-wide">
            Projects
          </h2>
          <p className=" p-2 text-stone-500 font-extralight text-md">
            Here are some projects I did over the years.
          </p>
        </header>
      </div>

      {isLoading ? (
        <div className="my-20 text-center">
          <Spinner className="fill-zinc-600 w-28 h-28" />
        </div>
      ) : (
        projects?.map((project) => (
          <Project
            key={project.id}
            header={project.project}
            desc={project.desc}
            image={project.thumbnail}
            reverse={project.id % 2 === 0}
            to={project.to}
            button={project.button}
          />
        ))
      )}
    </section>
  );
}

export default Projects;
