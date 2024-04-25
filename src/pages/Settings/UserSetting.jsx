import UpdateUserDataForm from "../../ui/UpdateUserDataForm";
import UpdatePasswordForm from "../../ui/UpdatePasswordForm";
import CreateAvatarForm from "../../ui/CreateAvatarForm";
import { useAva } from "../../util/useAva";
import { Spinner } from "flowbite-react";

function UserSetting() {
  const { ava, isLoading } = useAva();

  return (
    <div className="flex flex-col items-center justify-center m-20 ">
      <div className="flex flex-col gap-10 w-64 items-center justify-center text-center">
        <h1 className="font-semibold text-lg">Update Account Settings</h1>

        <div>
          <h1 className="m-1">Update Username</h1>
          <UpdateUserDataForm />
        </div>

        <div>
          <h1 className="m-1">Update Avatar</h1>
          {isLoading ? (
            <Spinner className="fill-zinc-600" />
          ) : (
            ava.map((entry) => (
              <div key={entry.id} className="">
                <CreateAvatarForm avatarToEdit={entry} />
              </div>
            ))
          )}
        </div>

        <div>
          <h1 className="m-1">Update password</h1>
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default UserSetting;
