import { redirect } from "next/navigation";
import { getUser } from "../_lib/auth-action";
import { getAvatar } from "../_lib/data-service";
import AvatarImageItem from "../_components/AvatarImageItem";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  const { data, error } = await getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const avatar = await getAvatar();
  const avatarData = avatar?.find((photo) => photo.id === 1);

  if (!avatarData) {
    return <div>Avatar not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-2">Account Settings</h1>
          <p className="text-stone-500 dark:text-stone-300">
            Welcome back, {data?.user?.user_metadata?.name}
          </p>
        </div>

        <div className="bg-[#f7f7f7] dark:bg-zinc-900 rounded-lg shadow-sm p-6">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-medium mb-4 text-center">
              Profile Photo
            </h2>
            <div className="flex flex-col items-center gap-4">
              <AvatarImageItem avatar={avatarData} />
              <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
                Hover over the image to update
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
