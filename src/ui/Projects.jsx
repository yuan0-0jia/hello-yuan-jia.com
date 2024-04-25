import { useProjects } from "../util/Project/useProjects";
import Project from "./Project";
import { Spinner } from "flowbite-react";

function Projects() {
  const { isLoading, projects } = useProjects();

  return (
    <section className="mt-40 bg-[#f7f7f7] px-4 py-4 tracking-wide">
      <div className="text-center">
        <header>
          <h2 className="before:h-1px text-4xl font-extralight tracking-wide before:mx-auto before:my-8 before:block before:w-16 before:border-t before:border-slate-500 before:opacity-35">
            Projects
          </h2>
          <p className=" text-md p-2 font-extralight text-stone-500">
            Here are some projects I did over the years.
          </p>
        </header>
      </div>

      {isLoading ? (
        <div className="my-20 text-center">
          <Spinner className="h-28 w-28 fill-zinc-600" />
        </div>
      ) : (
        projects
          ?.sort((cur, next) => cur.id - next.id)
          .map((project) => (
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
