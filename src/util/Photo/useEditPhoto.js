import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditPhoto } from "./apiPhotos";

export function useEditPhoto() {
  const queryClient = useQueryClient();
  const { mutate: editPhoto, isLoading: isEditing } = useMutation({
    mutationFn: ({ newPhotoData, id }) => createEditPhoto(newPhotoData, id),
    onSuccess: () => {
      toast.success("Photo successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["photos"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editPhoto };
}
