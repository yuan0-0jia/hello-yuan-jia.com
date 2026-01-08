import Link from "next/link";
import { Suspense } from "react";
import { getAbout } from "../_lib/data-service";
import Paragraph from "../_components/Paragraph";
import Title from "../_components/Title";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "About",
};

export const revalidate = 3600;

async function AboutContent() {
  const about = await getAbout();

  return (
    <>
      <Title
        title={"About Me"}
        sub={"Yuan Jia"}
        img={about?.find((photo) => photo.id === 0).photo}
      />

      <div className="space-y-2">
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
          camera. You can spot me wandering around, capturing moments that catch
          my eye. Check out some of my photos on the{" "}
          <Link
            href="/photos"
            className="text-sepia-600 dark:text-sepia-400 underline decoration-sepia-400/50 decoration-1 underline-offset-4 hover:decoration-sepia-500 transition-colors"
          >
            Photos
          </Link>{" "}
          page.
        </Paragraph>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <div className="mx-4 md:mx-12 lg:mx-20 my-12 md:my-20 flex flex-col items-center justify-center p-4 tracking-wide">
      <div className="flex max-w-5xl w-full flex-col items-center justify-center">
        <Suspense
          fallback={
            <div className="py-20">
              <Spinner />
            </div>
          }
        >
          <AboutContent />
        </Suspense>
      </div>
    </div>
  );
}
