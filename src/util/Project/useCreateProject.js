import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditProject } from "./apiProjects";

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { mutate: createProject, isLoading: isCreating } = useMutation({
    mutationFn: createEditProject,
    onSuccess: () => {
      toast.success("New project successfully created");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createProject };
}
