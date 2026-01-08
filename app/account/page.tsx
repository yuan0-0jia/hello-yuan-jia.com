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
    return <div className="font-typewriter text-warmGray-600 dark:text-warmGray-300">Avatar not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center">
          <div className="vintage-divider mb-6">
            <span className="text-sepia-400 dark:text-sepia-500">✦</span>
          </div>
          <h1 className="font-typewriter text-2xl md:text-3xl text-warmGray-800 dark:text-cream tracking-wide mb-2">
            Account Settings
          </h1>
          <p className="font-typewriter text-sm text-sepia-500 dark:text-sepia-400 tracking-wider">
            Welcome back, {data?.user?.user_metadata?.name}
          </p>
        </div>

        <div className="bg-parchment dark:bg-warmGray-800/50 vintage-border rounded-sm p-6">
          <div className="max-w-md mx-auto">
            <h2 className="font-typewriter text-lg text-warmGray-800 dark:text-cream tracking-wide mb-4 text-center">
              Profile Photo
            </h2>
            <div className="flex flex-col items-center gap-4">
              <AvatarImageItem avatar={avatarData} />
              <p className="font-typewriter text-xs text-sepia-500 dark:text-sepia-400 text-center tracking-wider">
                Hover over the image to update
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
