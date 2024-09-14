import Image from "next/image";
import { Suspense } from "react";
import Button from "./_components/Button";
import Projects from "./_components/Projects";
import Spinner from "./_components/Spinner";
import { getAvatar } from "./_lib/data-service";

export default async function Home() {
  const avatar = await getAvatar();

  return (
    <>
      <div className="my-40 px-4 py-4">
        <div className="flex flex-row items-center justify-center gap-16">
          <>
            <div className="relative h-60 w-60 aspect-square md:h-80 md:w-80">
              <Image
                alt="Yuan"
                src={avatar?.find((photo) => photo.id === 1).image}
                fill
                priority={true}
                quality={75}
                sizes="564px"
                className="object-cover rounded-full"
              />
            </div>
            <div className="items-center">
              <h1 className="mb-8 text-4xl font-semibold">
                Hi, I&apos;m Yuan
                <br />
                <span className="text-xl font-light text-stone-500 dark:text-stone-300">
                  Thank you for visiting my site!
                </span>
              </h1>
              <Button type="primary" to="/about">
                About me
              </Button>
            </div>
          </>
        </div>
      </div>

      <div className="mt-40 bg-zinc-100 px-4 py-4 tracking-wide dark:bg-zinc-950">
        <div className="text-center">
          <header>
            <h2 className="before:h-1px text-4xl font-extralight tracking-wide before:mx-auto before:my-8 before:block before:w-16 before:border-t before:border-slate-500 before:opacity-35">
              Projects
            </h2>
            <p className=" text-md p-2 font-extralight text-stone-500 dark:text-stone-300">
              Here are some projects I did over the years.
            </p>
          </header>
        </div>

        <Suspense
          fallback={
            <div className="py-10">
              <Spinner />
            </div>
          }
        >
          <Projects />
        </Suspense>
      </div>
    </>
  );
}
