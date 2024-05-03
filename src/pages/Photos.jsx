import Paragraph from "../ui/Paragraph";
import { Link } from "react-router-dom";
import { usePhotos } from "../util/Photo/usePhotos";
import { Spinner } from "flowbite-react";
import Header from "../ui/Header";

function Photo() {
  const { photos, isLoading } = usePhotos();

  return (
    <div className="m-20 flex flex-col items-center justify-center p-4 tracking-wide">
      <div className="flex max-w-7xl flex-col items-center justify-center">
        <Header
          title={"Photos"}
          sub={"over the years"}
          img={photos?.find((photo) => photo.id === 0).image}
          isLoading={isLoading}
        />

        {isLoading ? (
          <div className="my-40">
            <Spinner className="h-48 w-48 fill-zinc-600" />
          </div>
        ) : (
          <>
            <div className="my-8 grid grid-cols-3 gap-8">
              {photos
                .filter((photo) => photo.id !== 0)
                .sort((cur, next) => cur.id - next.id)
                .map((photo) => (
                  <img
                    src={photo.image}
                    className="aspect-[3/2] w-full rounded-xl object-cover"
                    key={photo.id}
                  />
                ))}
            </div>

            <Paragraph>
              Feel free to check out more photos on my{" "}
              <Link
                to="https://www.flickr.com/photos/yuan-jia/"
                className="underline decoration-dotted decoration-1 underline-offset-4"
              >
                flickr.
              </Link>{" "}
            </Paragraph>
          </>
        )}
      </div>
    </div>
  );
}

export default Photo;
