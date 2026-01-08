import { getProjects } from "../_lib/data-service";
import Project from "./Project";

export default async function Projects() {
  const projects = await getProjects();

  return projects
    ?.sort((cur, next) => cur.id - next.id)
    .map((project) => (
      <Project
        key={project.id}
        header={project.project}
        desc={project.desc}
        image={project.thumbnail}
        previewUrl={project.preview_url} // New field for screenshot URL
        reverse={project.id % 2 === 0}
        to={project.to}
        button={project.button}
      />
    ));
}
