import { useQuery } from "@tanstack/react-query";
import { getPhotos } from "./apiPhotos";

export function usePhotos() {
  const {
    isLoading,
    data: photos,
    error,
  } = useQuery({
    queryKey: ["photos"],
    queryFn: getPhotos,
  });

  return { isLoading, error, photos };
}
