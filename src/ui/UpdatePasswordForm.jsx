import { useForm } from "react-hook-form";
import Button from "./Button";

import { useUpdateUser } from "../util/useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div label="New Password (min 8 chars)">
        <input
          className="focus:ring-zinc-600 focus:border-zinc-600 block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-60 p-2.5 text-sm rounded-lg"
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        <span className="text-red-600 text-xs font-semibold">
          {errors?.password?.message}
        </span>
      </div>

      <div label="Confirm password">
        <input
          className="focus:ring-zinc-600 focus:border-zinc-600 block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-60 p-2.5 text-sm rounded-lg"
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
        <span className="text-red-600 text-xs font-semibold">
          {errors?.password?.message}
        </span>
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <button onClick={reset} type="reset">
          Cancel
        </button>
        <Button disabled={isUpdating} type="small">
          Update password
        </Button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
