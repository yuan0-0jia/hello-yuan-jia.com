import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();

  return (
    <div className="h-screen justify-center items-center flex ">
      <div className="m-auto">
        <h1 className="">Something went wrong 😢</h1>
        <p className="">{error.data || error.message}</p>

        <div className="">
          <LinkButton to="/">&larr; Go Home</LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Error;
