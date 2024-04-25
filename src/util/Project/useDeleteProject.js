import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteProject as deleteProjectApi } from "./apiProjects";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProject } = useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: () => {
      toast.success("Project successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteProject };
}
