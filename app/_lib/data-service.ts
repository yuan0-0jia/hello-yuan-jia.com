import { createClient } from "@/utils/supabase/server";

export async function getAvatar() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("avatar").select("*");

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    throw new Error("Projects could not be loaded");
  }

  return data;
}

export async function getAbout() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("about").select("*");

  if (error) {
    console.error(error);
    throw new Error("About could not be loaded");
  }

  return data;
}

export async function getPhotos() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("photos").select("*");

  if (error) {
    throw new Error("photos could not be loaded");
  }

  return data;
}
