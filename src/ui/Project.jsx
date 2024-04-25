import Button from "./Button";
import PropTypes from "prop-types";

function Project({ header, desc, to, image, reverse, button }) {
  return (
    <section
      className={`flex ${reverse ? "flex-row-reverse" : "flex-row"} justify-center mx-20 my-10 gap-8`}
    >
      <div className="max-w-md">
        <header className="before:my-4 before:block before:w-10 before:h-1px before:border-t before:border-slate-500 before:opacity-35  font-extralight text-2xl mx-5">
          {header}
        </header>
        <p className="font-extralight m-5">{desc}</p>
        <div className="m-5">
          <Button type="secondary" to={to}>
            {button}
          </Button>
        </div>
      </div>

      <span className="max-w-md my-5">
        <img className="rounded-xl drop-shadow-2xl" src={image} />
      </span>
    </section>
  );
}

Project.propTypes = {
  header: PropTypes.string,
  desc: PropTypes.string,
  to: PropTypes.string,
  image: PropTypes.string,
  reverse: PropTypes.bool,
  button: PropTypes.string,
};

export default Project;
