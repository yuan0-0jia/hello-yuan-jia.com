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
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center gap-8 py-5`}
    >
      <div
        className={`text-lg font-extralight tracking-wide ${img && "w-5/6"}`}
      >
        {children}
      </div>

      {img && (
        <div className="relative w-52 h-52">
          <Image alt="" fill className="object-cover rounded-lg" src={img} />
        </div>
      )}
    </section>
  );
}
