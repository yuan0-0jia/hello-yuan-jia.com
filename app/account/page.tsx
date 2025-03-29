import { redirect } from "next/navigation";
import { getUser, updateAva } from "../_lib/auth-action";
import SubmitButton from "../_components/SubmitButton";
import { getAvatar } from "../_lib/data-service";
import Image from "next/image";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  const { data, error } = await getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const avatar = await getAvatar();

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-3">Account Settings</h1>
          <p className="text-stone-500 dark:text-stone-300">
            Welcome back, {data?.user?.user_metadata?.name}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-medium mb-6 text-center">
              Profile Photo
            </h2>
            <form action={updateAva} className="space-y-6">
              <div className="flex flex-col items-center gap-6">
                <div className="relative h-40 w-40 aspect-square">
                  <Image
                    alt="Profile"
                    src={avatar?.find((photo) => photo.id === 1).image}
                    fill
                    priority={true}
                    quality={75}
                    sizes="160px"
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="w-full space-y-4">
                  <input
                    type="hidden"
                    value={avatar?.find((entry) => entry.id === 1).id}
                    name="id"
                  />
                  <input
                    type="file"
                    name="image"
                    required
                    accept="image/*"
                    className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <div className="flex justify-center">
                    <SubmitButton>Update Profile Photo</SubmitButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
