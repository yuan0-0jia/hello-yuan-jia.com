import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { useCreatePhoto } from "../util/Photo/useCreatePhoto";
import { Label, FileInput, Spinner } from "flowbite-react";
import { useEditPhoto } from "../util/Photo/useEditPhoto";

function CreatePhotoForm({ photoToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = photoToEdit;
  const isEditSession = editId !== null;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { createPhoto, isCreating } = useCreatePhoto();
  const { editPhoto, isEditing } = useEditPhoto();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editPhoto(
        { newPhotoData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createPhoto(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="space-y-12">
        <div className="col-span-full">
          <Label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Photo
          </Label>
          <div className="flex justify-center">
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <Label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <FileInput
                    type="file"
                    id="image"
                    accept="image/*"
                    {...register("image")}
                  />
                  {errors?.image?.message && (
                    <span className="text-red-600 text-xs">
                      {errors?.image?.message}
                    </span>
                  )}
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="reset"
          disabled={isWorking}
          onClick={onCloseModal}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          disabled={isWorking}
          type="submit"
          className="rounded-md bg-zinc-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
        >
          {isWorking ? (
            <Spinner className="fill-zinc-600" />
          ) : (
            <>{isEditSession ? "Edit Photo" : "Create Photo"}</>
          )}
        </button>
      </div>
    </form>
  );
}

CreatePhotoForm.propTypes = {
  photoToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreatePhotoForm;
