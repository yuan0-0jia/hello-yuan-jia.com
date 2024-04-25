import PropTypes from "prop-types";

function Icon({ icon, to }) {
  return (
    <a href={to}>
      <button className="rounded-full border px-2 py-2 border-zinc-600 hover:bg-zinc-100 text-zinc-600 text-lg">
        {icon}
      </button>
    </a>
  );
}

Icon.propTypes = {
  icon: PropTypes.object,
  to: PropTypes.string,
};

export default Icon;
