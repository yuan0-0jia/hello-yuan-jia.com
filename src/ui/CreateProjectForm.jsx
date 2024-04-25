import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { useCreateProject } from "../util/Project/useCreateProject";
import { FileInput, Spinner } from "flowbite-react";
import { useEditProject } from "../util/Project/useEditProject";

function CreateProjectForm({ projectToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = projectToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { createProject, isCreating } = useCreateProject();
  const { editProject, isEditing } = useEditProject();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const thumbnail =
      typeof data.thumbnail === "string" ? data.thumbnail : data.thumbnail[0];

    if (isEditSession)
      editProject(
        { newProjectData: { ...data, thumbnail }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createProject(
        { ...data, thumbnail: data.thumbnail[0] },
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

  if (isCreating) return <Spinner className="w-28 h-28" />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={`${isWorking ? "opacity-25" : ""}`}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="m-5 grid grid-cols-1 gap-3  sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Project Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-zinc-600 sm:max-w-md">
                  <input
                    type="text"
                    id="project"
                    disabled={isWorking}
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("project", {
                      required: "This field is required",
                    })}
                  />
                </div>
                {errors?.project?.message && (
                  <span className="mx-2 text-red-600 text-xs font-base">
                    {errors?.project?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Project Description
              </label>
              <div className="mt-2">
                <textarea
                  id="desc"
                  rows={3}
                  disabled={isWorking}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  {...register("desc", {
                    required: "This field is required",
                  })}
                />
              </div>
              {errors?.desc?.message && (
                <span className="mx-2 text-red-600 text-xs font-base">
                  {errors?.desc?.message}
                </span>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Project Thumbnail
              </label>
              <div className="mt-2 flex justify-center border border-dashed rounded-md p-6">
                <div className="text-center">
                  <div className="flex flex-row items-center text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-base text-zinc-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-zinc-600 focus-within:ring-offset-2 hover:text-zinc-900"
                    >
                      <FileInput
                        type="file"
                        id="thumbnail"
                        disabled={isWorking}
                        accept="image/*"
                        className="focus:ring-zinc-600 focus:border-zinc-600"
                        helperText="Upload project thumbnail"
                        {...register("thumbnail", {
                          required: isEditSession
                            ? false
                            : "This field is required",
                        })}
                      />
                    </label>
                  </div>
                  {errors?.thumbnail?.message && (
                    <span className="text-red-600 text-xs">
                      {errors?.thumbnail?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Link To
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-zinc-600 sm:max-w-md">
                  <input
                    type="text"
                    id="to"
                    disabled={isWorking}
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("to")}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Button Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-zinc-600 sm:max-w-md">
                  <input
                    type="text"
                    id="button"
                    disabled={isWorking}
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("button")}
                  />
                </div>
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
            <>{isEditSession ? "Edit Project" : "Create Project"}</>
          )}
        </button>
      </div>
    </form>
  );
}

CreateProjectForm.propTypes = {
  projectToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateProjectForm;
