import PropTypes from "prop-types";

function ConfirmDelete({ name, disabled, onConfirm, onCloseModal }) {
  return (
    <div>
      <h1 className="capitalize font-semibold text-xl">Delete {name}</h1>
      <p className="mb-5">
        Are you sure you want to delete {name} permanently?
      </p>

      <div className="flex justify-center gap-4">
        <button
          className="hover:underline transition-all duration-100"
          onClick={onCloseModal}
          disabled={disabled}
        >
          Cancel
        </button>
        <button
          className="border rounded-md p-2 bg-red-600 text-stone-50 hover:bg-red-500 transition-all duration-100"
          onClick={onConfirm}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

ConfirmDelete.propTypes = {
  name: PropTypes.string,
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default ConfirmDelete;
