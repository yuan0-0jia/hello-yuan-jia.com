import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";

export const getAvatar = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("avatar").select("*");

    if (error) {
      console.error(error);
    }

    return data;
  },
  ["avatar"],
  { revalidate: 3600 }
);

export const getProjects = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").select("*");

    if (error) {
      throw new Error("Projects could not be loaded");
    }

    return data;
  },
  ["projects"],
  { revalidate: 3600 }
);

export const getAbout = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("about").select("*");

    if (error) {
      console.error(error);
      throw new Error("About could not be loaded");
    }

    return data;
  },
  ["about"],
  { revalidate: 3600 }
);

export const getPhotos = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("photos").select("*");

    if (error) {
      throw new Error("photos could not be loaded");
    }

    return data;
  },
  ["photos"],
  { revalidate: 3600 }
);
