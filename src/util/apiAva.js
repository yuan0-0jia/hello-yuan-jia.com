import supabase, { SUPABASE_URL } from "./supabase";

export async function getAva() {
  const { data, error } = await supabase.from("avatar").select("*");

  if (error) {
    console.error(error);
    throw new Error("ava could not be loaded");
  }

  return data;
}

export async function createEditAvatar(newAva, id) {
  const hasImagePath = newAva.image?.startsWith?.(SUPABASE_URL);
  const imageName = `${newAva.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newAva.image
    : `${SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;

  let query = supabase.from("avatar");

  if (!id) query = query.insert([{ ...newAva, image: imagePath }]);

  if (id) {
    console.log(imagePath);
    query = query
      .update({ ...newAva, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Ava could not be created");
  }

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("photos")
    .upload(imageName, newAva.image, { upsert: true });

  if (storageError) {
    await supabase.from("avatar").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Ava could not be uploaded, ava was not created");
  }

  return data;
}
