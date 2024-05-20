import PropTypes from "prop-types";

function Header({ title, sub, img, isLoading }) {
  return (
    <>
      <header className="pb-3 text-center">
        <h1 className="before:h-1px text-4xl font-light before:mx-auto before:my-4 before:block before:w-16 before:border-t  before:border-slate-500 before:opacity-35">
          {title}
        </h1>
        <p className="p-3 text-xl font-extralight text-stone-600">{sub}</p>
      </header>

      {!isLoading && (
        <img src={img} className="mb-5 w-full rounded-xl md:h-[700px]" />
      )}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  sub: PropTypes.string,
  img: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Header;
