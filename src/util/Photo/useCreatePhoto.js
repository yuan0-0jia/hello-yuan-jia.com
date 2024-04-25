import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditPhoto } from "./apiPhotos";

export function useCreatePhoto() {
  const queryClient = useQueryClient();
  const { mutate: createPhoto, isLoading: isCreating } = useMutation({
    mutationFn: createEditPhoto,
    onSuccess: () => {
      toast.success("New photo successfully created");
      queryClient.invalidateQueries({
        queryKey: ["photos"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createPhoto };
}
