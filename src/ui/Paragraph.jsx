import PropTypes from "prop-types";

function Paragraph({ img, children, reverse }) {
  return (
    <section
      className={`flex ${reverse ? "flex-row-reverse" : "flex-row"} items-center gap-8 py-5`}
    >
      <div className="text-lg font-extralight tracking-wide">{children}</div>
      {img && <img className="w-1/6 rounded-lg md:h-52 md:w-52" src={img} />}
    </section>
  );
}

Paragraph.propTypes = {
  img: PropTypes.string,
  children: PropTypes.any,
  reverse: PropTypes.bool,
};
export default Paragraph;
