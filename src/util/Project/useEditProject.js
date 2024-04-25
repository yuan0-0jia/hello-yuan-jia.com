import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditProject } from "./apiProjects";

export function useEditProject() {
  const queryClient = useQueryClient();
  const { mutate: editProject, isLoading: isEditing } = useMutation({
    mutationFn: ({ newProjectData, id }) =>
      createEditProject(newProjectData, id),
    onSuccess: () => {
      toast.success("Project successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editProject };
}
