import { useState } from "react";

import Button from "./Button";

import { useUser } from "../util/useUser";
import { useUpdateUser } from "../util/useUpdateUser";

import { Label, TextInput } from "flowbite-react";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { isUpdating, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Label label="Email address">
        <TextInput value={email} disabled />
      </Label>
      <div label="Full name">
        <input
          className="focus:ring-zinc-600 focus:border-zinc-600 block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-60 p-2.5 text-sm rounded-lg"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </div>

      <div className="flex flex-row space-x-4 justify-center">
        <button type="reset" disabled={isUpdating} onClick={handleCancel}>
          Cancel
        </button>
        <Button type="small" disabled={isUpdating}>
          Update account
        </Button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
