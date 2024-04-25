import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditAbout } from "./apiAbout";

export function useEditAbout() {
  const queryClient = useQueryClient();
  const { mutate: editAbout, isLoading: isEditing } = useMutation({
    mutationFn: ({ newParagraphData, id }) =>
      createEditAbout(newParagraphData, id),
    onSuccess: () => {
      toast.success("Paragraph successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["about"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editAbout };
}
