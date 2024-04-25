import Paragraph from "../ui/Paragraph";
import { Link } from "react-router-dom";
import { usePhotos } from "../util/Photo/usePhotos";
import { Spinner } from "flowbite-react";
import Header from "../ui/Header";

function Photo() {
  const { photos, isLoading } = usePhotos();

  return (
    <div className="m-20 p-4 flex flex-col justify-center items-center tracking-wide">
      <div className="flex flex-col items-center justify-center max-w-7xl">
        <Header
          title={"Photos"}
          sub={"over the years"}
          img={photos?.find((photo) => photo.id === 0).image}
          isLoading={isLoading}
        />

        {isLoading ? (
          <div className="my-40">
            <Spinner className="fill-zinc-600 w-48 h-48" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 my-8 gap-8">
              {photos
                .filter((photo) => photo.id !== 0)
                .map((photo) => (
                  <img
                    src={photo.image}
                    className="rounded-xl"
                    key={photo.id}
                  />
                ))}
            </div>

            <Paragraph>
              Feel free to check out more photos on my{" "}
              <Link
                to="https://www.flickr.com/photos/yuan-jia/"
                className="underline decoration-1 decoration-dotted underline-offset-4"
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
