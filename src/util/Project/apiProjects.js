import supabase, { SUPABASE_URL } from "../supabase";

export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error(error);
    throw new Error("Projects could not be loaded");
  }

  return data;
}

export async function createEditProject(newProject, id) {
  const hasImagePath = newProject.thumbnail?.startsWith?.(SUPABASE_URL);
  const imageName = `${Math.random()}-${newProject.thumbnail.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newProject.thumbnail
    : `${SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;

  let query = supabase.from("projects");

  if (!id) query = query.insert([{ ...newProject, thumbnail: imagePath }]);

  if (id) {
    query = query
      .update({ ...newProject, thumbnail: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Project could not be created");
  }

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("photos")
    .upload(imageName, newProject.thumbnail);

  if (storageError) {
    await supabase.from("projects").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Project thumbnail could not be uploaded, Project was not created"
    );
  }

  return data;
}

export async function deleteProject(id) {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Project could not be deleted");
  }
}
