import Link from "next/link";
import { Suspense } from "react";
import Paragraph from "../_components/Paragraph";
import Title from "../_components/Title";
import { getPhotos } from "../_lib/data-service";
import Image from "next/image";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Photos",
};

export const revalidate = 3600;

async function PhotosContent() {
  const photos = await getPhotos();

  return (
    <>
      <Title
        title={"Photos"}
        sub={"over the years"}
        img={photos?.find((photo) => photo.id === 0).image}
      />

      <div className="my-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos
          .filter((photo) => photo.id !== 0)
          .sort((cur, next) => cur.id - next.id)
          .map((photo) => (
            <div 
              key={photo.id} 
              className="relative aspect-[3/2] w-full img-vintage vintage-border rounded-sm overflow-hidden"
            >
              <Image
                src={photo.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
      </div>

      <Paragraph>
        Feel free to check out more photos on my{" "}
        <Link
          href="https://www.flickr.com/photos/yuan-jia/"
          className="text-sepia-600 dark:text-sepia-400 underline decoration-sepia-400/50 decoration-1 underline-offset-4 hover:decoration-sepia-500 transition-colors"
        >
          flickr.
        </Link>{" "}
      </Paragraph>
    </>
  );
}

export default function Page() {
  return (
    <div className="mx-4 md:mx-12 lg:mx-20 my-12 md:my-20 flex flex-col items-center justify-center p-4 tracking-wide">
      <div className="flex max-w-7xl w-full flex-col items-center justify-center">
        <Suspense
          fallback={
            <div className="py-20">
              <Spinner />
            </div>
          }
        >
          <PhotosContent />
        </Suspense>
      </div>
    </div>
  );
}
