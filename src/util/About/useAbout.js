import { useQuery } from "@tanstack/react-query";
import { getAbout } from "./apiAbout";

export function useAbout() {
  const {
    isLoading,
    data: about,
    error,
  } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  return { isLoading, error, about };
}
