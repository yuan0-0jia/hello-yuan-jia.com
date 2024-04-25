// import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "../util/useLogout";
import { Spinner } from "flowbite-react";
import Button from "./Button";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <Button type="small" disabled={isLoading} onClick={logout}>
      {!isLoading ? "Log Out" : <Spinner className="fill-zinc-600" />}
    </Button>
  );
}

export default Logout;
