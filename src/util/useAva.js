import { useQuery } from "@tanstack/react-query";
import { getAva } from "./apiAva";

export function useAva() {
  const {
    isLoading,
    data: ava,
    error,
  } = useQuery({
    queryKey: ["avatar"],
    queryFn: getAva,
  });

  return { isLoading, error, ava };
}
