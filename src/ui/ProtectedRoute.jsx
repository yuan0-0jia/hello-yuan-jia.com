import { useUser } from "../util/useUser";
import { Spinner } from "flowbite-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, fetchStatus } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== "fetching") {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, fetchStatus, navigate]
  );

  if (isLoading)
    return (
      <div className="flex items-center align-center justify-center h-screen">
        <div>
          <Spinner className="fill-zinc-600 w-32 h-32" />
        </div>
      </div>
    );

  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRoute;
