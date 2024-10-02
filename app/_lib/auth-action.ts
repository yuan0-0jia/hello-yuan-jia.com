"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function login() {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/callback?next=/account`,
    },
  });

  if (error) {
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getUser() {
  const supabase = await createClient();

  return supabase.auth.getUser();
}

export async function updateAva(formData: any) {
  const { data, error } = await getUser();
  if (error || !data?.user) throw new Error("You must be logged in");

  const id = formData.get("id");
  const image = formData.get("image");

  const supabase = await createClient();

  const hasImagePath = image?.startsWith?.(
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );
  const imageName = `${image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? image
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;

  let query: any = supabase.from("avatar");

  if (id) {
    query = query.update({ image: imagePath }).eq("id", id).select();
  }

  const { data: queryData, error: queryError } = await query.select().single();

  if (queryError) {
    console.error(queryError);
    throw new Error("Ava could not be created");
  }

  const { error: storageError } = await supabase.storage
    .from("photos")
    .upload(imageName, image, { upsert: true });

  if (storageError) {
    await supabase.from("avatar").delete().eq("id", queryData.id);
    console.error(storageError);
    throw new Error("Ava could not be uploaded, ava was not created");
  }

  revalidatePath("/", "layout");
}
