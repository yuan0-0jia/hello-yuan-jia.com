import Image from "next/image";

export default function Header({
  title,
  sub,
  img,
}: {
  title: string;
  sub: string;
  img: string;
}) {
  return (
    <>
      <header className="pb-3 text-center">
        <h1 className="before:h-1px text-4xl font-light before:mx-auto before:my-4 before:block before:w-16 before:border-t  before:border-slate-500 before:opacity-35">
          {title}
        </h1>
        <p className="p-3 text-xl font-extralight text-stone-600 dark:text-stone-300">
          {sub}
        </p>
      </header>

      <div className="relative h-[700px] w-full mb-5">
        <Image alt="" src={img} fill className="rounded-xl" />
      </div>
    </>
  );
}
