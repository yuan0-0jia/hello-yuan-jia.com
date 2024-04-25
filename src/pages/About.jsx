import Header from "../ui/Header";
import Paragraph from "../ui/Paragraph";
import { Link } from "react-router-dom";
import { useAbout } from "../util/About/useAbout";
import { Spinner } from "flowbite-react";

function About() {
  const { isLoading, about } = useAbout();

  return (
    <>
      <div className="m-20 p-4 flex flex-col justify-center items-center tracking-wide">
        <div className="flex flex-col items-center justify-center max-w-7xl">
          <Header
            title={"About Me"}
            sub={"Yuan Jia"}
            img={about?.find((photo) => photo.id === 0).photo}
            isLoading={isLoading}
          />

          {isLoading ? (
            <div className="my-40">
              <Spinner className="fill-zinc-600 w-48 h-48" />
            </div>
          ) : (
            <>
              {about
                ?.filter((entry) => entry.id !== 0)
                .sort((cur, next) => cur.id - next.id)
                .map((paragraph) => (
                  <Paragraph
                    key={paragraph.id}
                    img={paragraph.photo}
                    reverse={paragraph.id % 2 !== 0}
                  >
                    {paragraph.desc}
                  </Paragraph>
                ))}

              <Paragraph>
                When I&apos;m not writing code, I enjoy exploring Santa Cruz
                through my camera lens. I love taking photos of the natural
                beauty that surrounds us. You can often find me wandering around
                Santa Cruz with my camera, capturing moments that catch my eyes.
                There are also some photos of Santa Cruz that I took on the{" "}
                <Link
                  to="/photos"
                  className="underline decoration-1 decoration-dotted underline-offset-4"
                >
                  Photos
                </Link>{" "}
                page.
              </Paragraph>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default About;
