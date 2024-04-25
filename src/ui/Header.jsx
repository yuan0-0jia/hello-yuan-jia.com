import PropTypes from "prop-types";

function Header({ title, sub, img, isLoading }) {
  return (
    <>
      <header className="text-center pb-3">
        <h1 className="before:mx-auto before:my-4 before:block before:w-16 before:h-1px before:border-t before:border-slate-500 before:opacity-35  text-4xl font-light">
          {title}
        </h1>
        <p className="p-3 font-extralight text-xl text-stone-600">{sub}</p>
      </header>

      {!isLoading && <img src={img} className="w-full rounded-xl mb-5" />}
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
