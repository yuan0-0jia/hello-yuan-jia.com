import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./apiAuth";

export function useUser() {
  const {
    fetchStatus,
    isLoading,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    fetchStatus,
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
