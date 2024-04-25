import Button from "../ui/Button";
import Projects from "../ui/Projects";
import { Spinner } from "flowbite-react";
import { useAva } from "../util/useAva";

function Homepage() {
  const { ava, isLoading } = useAva();

  return (
    <>
      <div className="my-40 px-4 py-4">
        <div className="flex flex-row items-center justify-center gap-16">
          {isLoading ? (
            <div className="m-24">
              <Spinner className="fill-zinc-600 w-32 h-32" />
            </div>
          ) : (
            <>
              <span className="w-80 block ">
                <img
                  src={ava?.find((photo) => photo.id === 1).image}
                  className={`rounded-full`}
                />
              </span>
              <div className="items-center">
                <h1 className="mb-8 text-4xl font-semibold">
                  Hi, I&apos;m Yuan
                  <br />
                  <span className="text-stone-500 font-light text-xl">
                    Thank you for visiting my site!
                  </span>
                </h1>
                <Button type="primary" to="/about">
                  About me
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <Projects />
    </>
  );
}

export default Homepage;
