import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditAvatar } from "./apiAva";
import { toast } from "react-hot-toast";

export function useEditAvatar() {
  const queryClient = useQueryClient();

  const { mutate: editAvatar, isLoading: isEditing } = useMutation({
    mutationFn: ({ newAvatarData, id }) => createEditAvatar(newAvatarData, id),
    onSuccess: () => {
      toast.success("Avatar successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["avatar"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editAvatar };
}
