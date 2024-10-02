import Link from "next/link";
import Paragraph from "../_components/Paragraph";
import Title from "../_components/Title";
import { getPhotos } from "../_lib/data-service";
import Image from "next/image";

export const metadata = {
  title: "Photos",
};

export default async function Page() {
  const photos = await getPhotos();

  return (
    <div className="m-20 flex flex-col items-center justify-center p-4 tracking-wide">
      <div className="flex max-w-7xl flex-col items-center justify-center">
        <Title
          title={"Photos"}
          sub={"over the years"}
          img={photos?.find((photo) => photo.id === 0).image}
        />

        <div className="my-8 grid grid-cols-3 gap-8">
          {photos
            .filter((photo) => photo.id !== 0)
            .sort((cur, next) => cur.id - next.id)
            .map((photo) => (
              <div key={photo.id} className="relative aspect-[3/2] w-full h-56">
                <Image
                  src={photo.image}
                  alt=""
                  fill
                  className=" rounded-xl object-cover"
                  key={photo.id}
                />
              </div>
            ))}
        </div>

        <Paragraph>
          Feel free to check out more photos on my{" "}
          <Link
            href="https://www.flickr.com/photos/yuan-jia/"
            className="underline decoration-dotted decoration-1 underline-offset-4"
          >
            flickr.
          </Link>{" "}
        </Paragraph>
      </div>
    </div>
  );
}
