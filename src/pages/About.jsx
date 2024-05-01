import Header from "../ui/Header";
import Paragraph from "../ui/Paragraph";
import { Link } from "react-router-dom";
import { useAbout } from "../util/About/useAbout";
import { Spinner } from "flowbite-react";

function About() {
  const { isLoading, about } = useAbout();

  return (
    <>
      <div className="m-20 flex flex-col items-center justify-center p-4 tracking-wide">
        <div className="flex max-w-7xl flex-col items-center justify-center">
          <Header
            title={"About Me"}
            sub={"Yuan Jia"}
            img={about?.find((photo) => photo.id === 0).photo}
            isLoading={isLoading}
          />

          {isLoading ? (
            <div className="my-40">
              <Spinner className="h-48 w-48 fill-zinc-600" />
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
                When I&apos;m not writing code, I love exploring Santa Cruz with
                my camera. You can spot me wandering around, capturing moments
                that catch my eye. Check out some of my photos on the{" "}
                <Link
                  to="/photos"
                  className="underline decoration-dotted decoration-1 underline-offset-4"
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
