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
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback?next=/account`,
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

export async function updateAva(formData: FormData) {
  const { data, error } = await getUser();
  if (error || !data?.user) throw new Error("You must be logged in");

  const id = formData.get("id") as string | null; // Type assertion for id
  const image = formData.get("image"); // This can be a File or null

  // Check if image is a File and handle it
  if (!(image instanceof File)) {
    throw new Error("Image file is required and must be a File type");
  }

  const supabase = await createClient();

  const imageName = image.name.replaceAll("/", ""); // Sanitize image name
  const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;
  const hasImagePath = imagePath.startsWith(
    process.env.NEXT_PUBLIC_SUPABASE_URL!
  );

  const query = supabase.from("avatar");

  // Use update method only if id is present
  if (id) {
    // Perform the update operation
    const { error: updateError } = await query
      .update({ image: hasImagePath ? imagePath : imageName }) // Use imageName if it's a new upload
      .eq("id", id);

    if (updateError) {
      console.error(updateError);
      throw new Error("Ava could not be updated");
    }
  }

  // Upload the image to Supabase Storage
  const { error: storageError } = await supabase.storage
    .from("photos")
    .upload(imageName, image, { upsert: true });

  if (storageError) {
    // If storage fails, delete the avatar if it was created
    if (id) {
      await supabase.from("avatar").delete().eq("id", id);
    }
    console.error(storageError);
    throw new Error("Ava could not be uploaded, ava was not created");
  }

  // Optionally handle revalidation after the upload
  revalidatePath("/", "layout");
}

export async function updateProject(formData: FormData) {
  const { data, error } = await getUser();
  if (error || !data?.user) throw new Error("You must be logged in");

  const id = formData.get("id") as string;
  const project = formData.get("project") as string;
  const desc = formData.get("desc") as string;
  const image = formData.get("image") as File | null;
  const to = formData.get("to") as string;
  const button = formData.get("button") as string;

  if (!id || !project || !desc || !to || !button) {
    throw new Error("Required fields are missing");
  }

  const supabase = await createClient();

  let imagePath = formData.get("currentImage") as string | null;
  if (!imagePath) {
    throw new Error("Current image path is required");
  }

  // Handle image upload if a new image is provided
  if (image instanceof File) {
    const imageName = image.name.replaceAll("/", "");
    const newImagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;
    const hasImagePath = newImagePath.startsWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL!
    );

    // Upload the new image
    const { error: storageError } = await supabase.storage
      .from("photos")
      .upload(imageName, image, { upsert: true });

    if (storageError) {
      console.error(storageError);
      throw new Error("Project image could not be uploaded");
    }

    imagePath = hasImagePath ? newImagePath : imageName;
  }

  // Update the project
  const updateData: {
    project: string;
    desc: string;
    to: string;
    button: string;
    thumbnail?: string;
  } = {
    project,
    desc,
    to,
    button,
  };

  // Only include thumbnail in update if a new image was provided
  if (image instanceof File && imagePath) {
    updateData.thumbnail = imagePath;
  }

  const { error: updateError } = await supabase
    .from("projects")
    .update(updateData)
    .eq("id", id);

  if (updateError) {
    console.error(updateError);
    throw new Error("Project could not be updated");
  }

  revalidatePath("/", "layout");
}

export async function updatePhoto(formData: FormData) {
  const { data, error } = await getUser();
  if (error || !data?.user) throw new Error("You must be logged in");

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const image = formData.get("image") as File | null;

  if (!id || !title) {
    throw new Error("Required fields are missing");
  }

  const supabase = await createClient();

  let imagePath = formData.get("currentImage") as string;

  // Handle image upload if a new image is provided
  if (image instanceof File) {
    const imageName = image.name.replaceAll("/", "");
    const newImagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;
    const hasImagePath = newImagePath.startsWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL!
    );

    // Upload the new image
    const { error: storageError } = await supabase.storage
      .from("photos")
      .upload(imageName, image, { upsert: true });

    if (storageError) {
      console.error(storageError);
      throw new Error("Photo could not be uploaded");
    }

    imagePath = hasImagePath ? newImagePath : imageName;
  }

  // Update the photo
  const { error: updateError } = await supabase
    .from("photos")
    .update({
      title,
      image: imagePath,
    })
    .eq("id", id);

  if (updateError) {
    console.error(updateError);
    throw new Error("Photo could not be updated");
  }

  revalidatePath("/", "layout");
}

export async function updateAbout(formData: FormData) {
  const { data, error } = await getUser();
  if (error || !data?.user) throw new Error("You must be logged in");

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const photo = formData.get("photo") as File | null;

  if (!id || !title || !desc) {
    throw new Error("Required fields are missing");
  }

  const supabase = await createClient();

  let imagePath = formData.get("currentImage") as string | null;
  if (!imagePath) {
    throw new Error("Current image path is required");
  }

  // Handle image upload if a new image is provided
  if (photo instanceof File) {
    const imageName = photo.name.replaceAll("/", "");
    const newImagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;
    const hasImagePath = newImagePath.startsWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL!
    );

    // Upload the new image
    const { error: storageError } = await supabase.storage
      .from("photos")
      .upload(imageName, photo, { upsert: true });

    if (storageError) {
      console.error(storageError);
      throw new Error("About image could not be uploaded");
    }

    imagePath = hasImagePath ? newImagePath : imageName;
  }

  // Update the about section
  const { error: updateError } = await supabase
    .from("about")
    .update({
      title,
      desc,
      photo: imagePath,
    })
    .eq("id", id);

  if (updateError) {
    console.error(updateError);
    throw new Error("About section could not be updated");
  }

  revalidatePath("/", "layout");
}
