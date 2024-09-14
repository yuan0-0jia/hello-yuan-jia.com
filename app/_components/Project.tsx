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

      <span className="relative w-96 h-60 my-5 max-w-md">
        <Image
          alt={header}
          fill
          quality={75}
          sizes="800x500"
          className="rounded-xl drop-shadow-2xl md:w-96"
          src={image}
        />
      </span>
    </section>
  );
}
