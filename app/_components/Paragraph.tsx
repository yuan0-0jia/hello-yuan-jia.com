import Image from "next/image";

export default function Paragraph({
  img,
  children,
  reverse,
}: {
  img?: string;
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-6 md:gap-10 py-6 md:py-8`}
    >
      <div
        className={`font-typewriter text-base md:text-lg text-warmGray-700 dark:text-warmGray-200 tracking-wide leading-loose ${
          img ? "md:w-3/4" : "w-full"
        }`}
      >
        {children}
      </div>

      {img && (
        <div className="relative w-44 h-44 md:w-52 md:h-52 flex-shrink-0 img-vintage vintage-border rounded-sm overflow-hidden">
          <Image alt="" fill className="object-cover" src={img} />
        </div>
      )}
    </section>
  );
}
