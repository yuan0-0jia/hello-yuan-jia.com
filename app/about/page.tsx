import Link from "next/link";
import { getAbout } from "../_lib/data-service";
import Paragraph from "../_components/Paragraph";
import Title from "../_components/Title";

export const metadata = {
  title: "About",
};

export default async function Page() {
  const about = await getAbout();

  return (
    <div className="m-20 flex flex-col items-center justify-center p-4 tracking-wide">
      <div className="flex max-w-7xl flex-col items-center justify-center">
        <Title
          title={"About Me"}
          sub={"Yuan Jia"}
          img={about?.find((photo) => photo.id === 0)?.photo || ""}
        />

        <div>
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
            When I&apos;m not writing code, I love exploring Santa Cruz with my
            camera. You can spot me wandering around, capturing moments that
            catch my eye. Check out some of my photos on the{" "}
            <Link
              href="/photos"
              className="underline decoration-dotted decoration-1 underline-offset-4"
            >
              Photos
            </Link>{" "}
            page.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
