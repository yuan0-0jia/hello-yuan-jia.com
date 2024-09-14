import { supabase } from "./supabase";

export async function getAvatar() {
  const { data, error } = await supabase.from("avatar").select("*");

  // For testing
  // await new Promise((res) => setTimeout(res, 3000));

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    throw new Error("Projects could not be loaded");
  }

  return data;
}

export async function getAbout() {
  const { data, error } = await supabase.from("about").select("*");

  if (error) {
    console.error(error);
    throw new Error("About could not be loaded");
  }

  return data;
}

export async function getPhotos() {
  const { data, error } = await supabase.from("photos").select("*");

  if (error) {
    throw new Error("photos could not be loaded");
  }

  return data;
}
