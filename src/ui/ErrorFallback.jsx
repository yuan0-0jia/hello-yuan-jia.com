import PropTypes from "prop-types";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <div>
        <h1>Something went wrong 🧐</h1>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};

export default ErrorFallback;
