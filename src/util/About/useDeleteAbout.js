import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteAbout as deleteAboutApi } from "./apiAbout";

export function useDeleteAbout() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteAbout } = useMutation({
    mutationFn: deleteAboutApi,
    onSuccess: () => {
      toast.success("About paragraph successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["about"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteAbout };
}
