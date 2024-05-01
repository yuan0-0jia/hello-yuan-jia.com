import supabase, { SUPABASE_URL } from "../supabase";

export async function getAbout() {
  const { data, error } = await supabase.from("about").select("*");

  if (error) {
    console.error(error);
    throw new Error("About could not be loaded");
  }

  return data;
}

export async function createEditAbout(newParagraph, id) {
  const hasImagePath = newParagraph.photo?.startsWith?.(SUPABASE_URL);
  const imageName = `${Math.random()}-${newParagraph.photo?.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newParagraph.photo
    : `${SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;

  let query = supabase.from("about");

  if (id === null) {
    if (!newParagraph.photo?.name) {
      query = query.insert([{ ...newParagraph }]);
    } else {
      query = query.insert([{ ...newParagraph, photo: imagePath }]);
    }
  }

  if (id !== null) {
    if (!newParagraph.photo?.name) {
      query = query
        .update({ ...newParagraph })
        .eq("id", id)
        .select();
    } else {
      query = query
        .update({ ...newParagraph, photo: imagePath })
        .eq("id", id)
        .select();
    }
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("About could not be created");
  }

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("photos")
    .upload(imageName, newParagraph.photo);

  if (storageError) {
    await supabase.from("about").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("About image could not be uploaded, About was not created");
  }

  return data;
}

export async function deleteAbout(id) {
  const { error } = await supabase.from("about").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("About paragraph could not be deleted");
  }
}
