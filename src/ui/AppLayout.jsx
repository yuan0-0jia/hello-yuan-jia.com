import { Outlet, useNavigation, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Spinner } from "flowbite-react";

function AppLayout() {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      {isLoading && (
        <div className="m-10 items-center justify-center align-middle h-screen">
          <Spinner className="fill-zinc-700 w-28 h-28" />
        </div>
      )}

      <NavBar />

      <div className="overflow-auto">
        <main className="mx-auto">
          <Outlet />
        </main>
        <Footer home={location.pathname === "/"} />
      </div>
    </div>
  );
}

export default AppLayout;
