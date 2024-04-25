import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { useCreateAvatar } from "../util/useCreateAvatar";
import { useEditAvatar } from "../util/useEditAvatar";

import Button from "./Button";
import { FileInput } from "flowbite-react";
// import { useState } from "react";

function CreateAvatarForm({ avatarToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = avatarToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const { createAvatar, isCreating } = useCreateAvatar();
  const { editAvatar, isEditing } = useEditAvatar();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editAvatar(
        { newAvatarData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createAvatar(
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

  // function handleCancel() {
  //   setFullName(currentFullName);
  //   setAvatar(null);
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="space-y-12">
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block leading-6 text-gray-900 text-center text-xs"
          >
            Avatar ID: {editId}
          </label>
          <div className="flex justify-center ">
            <div className="text-center">
              <div className="flex flex-col leading-6 text-zinc-600 mx-4">
                <label htmlFor="file-upload" className="block">
                  <FileInput
                    type="file"
                    className="focus:ring-zinc-600 focus:border-zinc-600 focus:ring-1 block w-full  disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-zinc-900 text-sm font-normal rounded-lg"
                    id="image"
                    accept="image/*"
                    {...register("image", {
                      required: "This field is required",
                    })}
                  />
                  {errors?.image?.message && (
                    <span className="text-red-600 text-xs">
                      {errors?.image?.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          className=" font-base leading-6 text-gray-900"
          onClick={reset}
          type="reset"
        >
          Cancel
        </button>
        <Button disabled={isWorking} type="small">
          Update
        </Button>
      </div>
    </form>
  );
}

CreateAvatarForm.propTypes = {
  avatarToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateAvatarForm;
