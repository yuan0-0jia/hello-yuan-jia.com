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
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } mx-4 md:mx-12 lg:mx-20 my-8 md:my-12 justify-center items-center gap-6 md:gap-10 lg:gap-14 max-w-6xl lg:mx-auto card-hover p-6 md:p-8 bg-cream/50 dark:bg-warmGray-800/30 vintage-border rounded-sm`}
    >
      {/* Content */}
      <div className="max-w-md text-center md:text-left">
        <header className="relative">
          <div className="w-12 h-px bg-sepia-300 dark:bg-sepia-600 mb-4 mx-auto md:mx-0" />
          <h3 className="font-typewriter text-xl md:text-2xl text-warmGray-800 dark:text-cream tracking-wide">
            {header}
          </h3>
        </header>
        <p className="mt-4 mb-6 font-typewriter text-sm md:text-base text-warmGray-700 dark:text-warmGray-200 leading-loose tracking-wide">
          {desc}
        </p>
        <Button type="secondary" to={to}>
          {button}
        </Button>
      </div>

      {/* Image with vintage styling */}
      <div className="relative w-full md:w-96 h-56 md:h-64 img-vintage rounded-sm overflow-hidden vintage-border">
        {image ? (
          <Image
            alt={header}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover"
            src={image}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-parchment dark:bg-warmGray-800">
            <span className="font-typewriter text-warmGray-400 dark:text-warmGray-500">
              No image available
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
