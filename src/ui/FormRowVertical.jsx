import PropTypes from "prop-types";

function FormRowVertical({ label, error, children }) {
  return (
    <div className="flex flex-col gap-3 px-5 ">
      {label && (
        <label className="font-medium" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-2xl text-red-500">{error}</span>}
    </div>
  );
}

FormRowVertical.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.any,
};

export default FormRowVertical;
