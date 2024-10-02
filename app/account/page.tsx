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
    <form action={updateAva}>
      <h2 className="font-semibold text-xl mb-7">
        Welcome back, {data?.user?.user_metadata?.name}
      </h2>
      <div className="flex flex-col gap-4 w-56 ">
        <div className="relative h-36 w-36 aspect-square">
          <Image
            alt="Yuan"
            src={avatar?.find((photo) => photo.id === 1).image}
            fill
            priority={true}
            quality={75}
            sizes="564px"
            className="object-cover rounded-full"
          />
        </div>

        <input
          type="hidden"
          value={avatar?.find((entry) => entry.id === 1).id}
          name="id"
        />
        <input
          type="file"
          name="image"
          required
          className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        <SubmitButton>Update Profile Photo</SubmitButton>
      </div>
    </form>
  );
}
