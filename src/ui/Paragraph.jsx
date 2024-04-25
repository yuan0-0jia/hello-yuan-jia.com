import PropTypes from "prop-types";

function Paragraph({ img, children, reverse }) {
  return (
    <section
      className={`flex ${reverse ? "flex-row-reverse" : "flex-row"} gap-8 py-5 items-center`}
    >
      <div className="font-extralight text-lg tracking-wide">{children}</div>
      {img && <img className="w-1/6 rounded-lg" src={img} />}
    </section>
  );
}

Paragraph.propTypes = {
  img: PropTypes.string,
  children: PropTypes.any,
  reverse: PropTypes.bool,
};
export default Paragraph;
