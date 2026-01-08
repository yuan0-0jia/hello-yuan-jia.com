import Image from "next/image";
import Button from "./Button";

export default function Project({
  header,
  desc,
  to,
  image,
  reverse,
  button,
}: {
  header: string;
  desc: string;
  to: string;
  image: string;
  reverse: boolean;
  button: string;
}) {
  return (
    <section
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } mx-20 my-10 justify-center gap-8`}
    >
      <div className="max-w-md">
        <header className="before:h-1px mx-5 text-2xl font-extralight before:my-4 before:block before:w-10  before:border-t before:border-slate-500 before:opacity-35">
          {header}
        </header>
        <p className="m-5 font-extralight">{desc}</p>
        <div className="m-5">
          <Button type="secondary" to={to}>
            {button}
          </Button>
        </div>
      </div>

      <div className="relative w-96 h-64 my-5 max-w-md">
        {image ? (
          <Image
            alt={header}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="rounded-xl drop-shadow-2xl object-cover"
            src={image}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-zinc-800 rounded-xl">
            <span className="text-stone-400 dark:text-stone-500">
              No image available
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
