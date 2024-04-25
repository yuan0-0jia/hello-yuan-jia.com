import { useQuery } from "@tanstack/react-query";
import { getProjects } from "./apiProjects";

export function useProjects() {
  const {
    isLoading,
    data: projects,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return { isLoading, error, projects };
}
