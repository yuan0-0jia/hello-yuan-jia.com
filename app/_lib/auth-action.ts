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

  // Handle image upload if a new image is provided
  if (image instanceof File && image.size > 0) {
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

  revalidatePath("/account/projects", "page");
  revalidatePath("/", "layout");
  redirect("/account/projects");
}

export async function createProject(formData: FormData) {
  const { data, error } = await getUser();
  if (error || !data?.user) throw new Error("You must be logged in");

  const project = formData.get("project") as string;
  const desc = formData.get("desc") as string;
  const image = formData.get("image") as File | null;
  const to = formData.get("to") as string;
  const button = formData.get("button") as string;

  if (!project || !desc || !to || !button) {
    throw new Error("Required fields are missing");
  }

  const supabase = await createClient();

  let imagePath: string | null = null;

  // Handle image upload if an image is provided and has content
  if (image instanceof File && image.size > 0) {
    const imageName = image.name.replaceAll("/", "");
    const newImagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;
    const hasImagePath = newImagePath.startsWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL!
    );

    // Upload the image
    const { error: storageError } = await supabase.storage
      .from("photos")
      .upload(imageName, image, { upsert: true });

    if (storageError) {
      console.error(storageError);
      throw new Error("Project image could not be uploaded");
    }

    imagePath = hasImagePath ? newImagePath : imageName;
  }

  // Create the project with thumbnail as null if no image provided
  const insertData: {
    project: string;
    desc: string;
    to: string;
    button: string;
    thumbnail: string | null;
  } = {
    project,
    desc,
    to,
    button,
    thumbnail: imagePath,
  };

  const { error: insertError } = await supabase
    .from("projects")
    .insert(insertData);

  if (insertError) {
    console.error(insertError);
    throw new Error("Project could not be created");
  }

  revalidatePath("/", "layout");
}

export async function deleteProject(formData: FormData) {
  const { data, error } = await getUser();
  if (error || !data?.user) throw new Error("You must be logged in");

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Project ID is required");
  }

  const supabase = await createClient();

  // Delete the project
  const { error: deleteError } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error(deleteError);
    throw new Error("Project could not be deleted");
  }

  revalidatePath("/", "layout");
}

export async function updatePhoto(formData: FormData) {
  const { data, error } = await getUser();
  if (error || !data?.user) throw new Error("You must be logged in");

  const id = formData.get("id") as string;
  const image = formData.get("image") as File | null;

  if (!id) {
    throw new Error("Photo ID is required");
  }

  const supabase = await createClient();

  let imagePath = formData.get("currentImage") as string;

  // Handle image upload if a new image is provided and has content
  if (image instanceof File && image.size > 0) {
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
    .update({ image: imagePath })
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
  const desc = formData.get("desc") as string;
  const photo = formData.get("photo") as File | null;

  if (!id || !desc) {
    throw new Error("Required fields are missing");
  }

  const supabase = await createClient();

  let imagePath = formData.get("currentImage") as string | null;

  // Handle image upload if a new image is provided and has content
  if (photo instanceof File && photo.size > 0) {
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

export async function createParagraph(formData: FormData) {
  const { data, error } = await getUser();
  if (error || !data?.user) throw new Error("You must be logged in");

  const desc = formData.get("desc") as string;
  const photo = formData.get("photo") as File | null;

  if (!desc) {
    throw new Error("Description is required");
  }

  const supabase = await createClient();

  // Get the maximum existing ID to assign the next sequential ID
  const { data: existingParagraphs, error: fetchError } = await supabase
    .from("about")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Could not fetch existing paragraphs");
  }

  // Calculate next ID (max ID + 1, or 1 if no paragraphs exist)
  const nextId =
    existingParagraphs && existingParagraphs.length > 0
      ? existingParagraphs[0].id + 1
      : 1;

  let imagePath: string | null = null;

  // Handle image upload if an image is provided and has content
  if (photo instanceof File && photo.size > 0) {
    const imageName = photo.name.replaceAll("/", "");
    const newImagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${imageName}`;
    const hasImagePath = newImagePath.startsWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL!
    );

    // Upload the image
    const { error: storageError } = await supabase.storage
      .from("photos")
      .upload(imageName, photo, { upsert: true });

    if (storageError) {
      console.error(storageError);
      throw new Error("Paragraph image could not be uploaded");
    }

    imagePath = hasImagePath ? newImagePath : imageName;
  }

  // Create the paragraph with the next sequential ID
  const insertData: {
    id: number;
    desc: string;
    photo: string | null;
  } = {
    id: nextId,
    desc,
    photo: imagePath,
  };

  const { error: insertError } = await supabase
    .from("about")
    .insert(insertData);

  if (insertError) {
    console.error(insertError);
    throw new Error("Paragraph could not be created");
  }

  revalidatePath("/", "layout");
}

export async function deleteParagraph(formData: FormData) {
  const { data, error } = await getUser();
  if (error || !data?.user) throw new Error("You must be logged in");

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Paragraph ID is required");
  }

  // Don't allow deleting the header (id 0)
  if (id === "0") {
    throw new Error("Cannot delete the header section");
  }

  const supabase = await createClient();

  // Delete the paragraph
  const { error: deleteError } = await supabase
    .from("about")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error(deleteError);
    throw new Error("Paragraph could not be deleted");
  }

  revalidatePath("/", "layout");
}
