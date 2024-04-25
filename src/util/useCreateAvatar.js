import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditAvatar } from "./apiAva";

export function useCreateAvatar() {
  const queryClient = useQueryClient();
  const { mutate: createAvatar, isLoading: isCreating } = useMutation({
    mutationFn: createEditAvatar,
    onSuccess: () => {
      toast.success("New avatar successfully created");
      queryClient.invalidateQueries({
        queryKey: ["avatar"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createAvatar };
}
