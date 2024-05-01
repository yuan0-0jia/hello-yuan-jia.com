import supabase, { SUPABASE_URL } from "../supabase";

export async function getPhotos() {
  const { data, error } = await supabase.from("photos").select("*");

  if (error) {
    console.error(error);
    throw new Error("photos could not be loaded");
  }

  return data;
}

export async function createEditPhoto(newPhoto, id) {
  const hasImagePath = newPhoto.image?.startsWith?.(SUPABASE_URL);
  const imageName = `${Math.random()}-${newPhoto.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newPhoto.image
    : `${SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;

  let query = supabase.from("photos");

  if (id === null) query = query.insert([{ ...newPhoto, image: imagePath }]);

  if (id !== null) {
    query = query
      .update({ ...newPhoto, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Photo could not be created");
  }

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("photos")
    .upload(imageName, newPhoto.image);

  if (storageError) {
    await supabase.from("photos").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Photo could not be uploaded, Photo was not created");
  }

  return data;
}
