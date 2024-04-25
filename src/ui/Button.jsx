import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block text-sm rounded-full bg-transparent font-semibold uppercase tracking-wide border-2 border-zinc-600 text-zinc-600 transition-colors duration-300 hover:bg-zinc-100 focus:outline-none focus:ring focus:ring-slate-100 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-3 py-1 md:px-4 md:py-1.5 text-xs",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-600 font-semibold uppercase tracking-wide text-stone-600 transition-colors duration-300 hover:bg-stone-200 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 focus:text-stone-700 disabled:cursor-not-allowed px-4 py-1.5 md:px-5 md:py-2.5",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
