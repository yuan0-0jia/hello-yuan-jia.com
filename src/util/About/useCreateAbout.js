import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditAbout } from "./apiAbout";

export function useCreateAbout() {
  const queryClient = useQueryClient();
  const { mutate: createAbout, isLoading: isCreating } = useMutation({
    mutationFn: createEditAbout,
    onSuccess: () => {
      toast.success("New paragraph successfully created");
      queryClient.invalidateQueries({
        queryKey: ["about"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createAbout };
}
