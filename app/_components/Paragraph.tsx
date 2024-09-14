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
      <div className="text-lg font-extralight tracking-wide">{children}</div>
      {img && <img className="w-1/6 rounded-lg md:h-52 md:w-52" src={img} />}
    </section>
  );
}
