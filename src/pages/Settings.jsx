import Logout from "../ui/Logout";
// import CreatePhotoForm from "../ui/CreatePhotoForm";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAva } from "../util/useAva";
import { Spinner } from "flowbite-react";

import { FaCircleUser, FaCode, FaList, FaPhotoFilm } from "react-icons/fa6";
import { useUser } from "../util/useUser";

function Settings() {
  const { ava, isLoading } = useAva();
  const { user } = useUser();

  const { fullName } = user.user_metadata;

  const active = `flex flex-row items-center gap-5 px-8 py-2 rounded text-lg font-light bg-zinc-200`;
  const inactive = `flex flex-row items-center gap-5 px-8 py-2 rounded text-lg font-light hover:bg-zinc-200 transition-all duration-100`;

  return (
    <div className="grid grid-cols-[16rem,1fr] grid-rows-[auto,1fr] h-screen">
      <header className="px-10 py-2 flex gap-8 items-center justify-end border-b border-stone-200 bg-[#f7f7f7]">
        <Link
          to="/"
          className="w-fit text-center text-xs text-zinc-600 hover:underline hover:underline-offset-4"
        >
          GO BACK
        </Link>
        <Logout />
      </header>

      <aside className="flex flex-col items-center row-span-full bg-[#f7f7f7] border-r border-stone-200">
        <>
          {isLoading ? (
            <div className="m-10">
              <Spinner className="fill-zinc-600 w-32 h-32" />
            </div>
          ) : (
            <>
              <div className="m-10 text-center">
                <img
                  src={ava?.find((photo) => photo.id === 1).image}
                  className="rounded-full w-32"
                />
                <p className="m-2 font-semibold">{fullName}</p>
              </div>
            </>
          )}
        </>
        <ul className="flex flex-col gap-2 ">
          <NavLink
            className={({ isActive }) => `${isActive ? active : inactive}`}
            to="/settings/user"
          >
            <FaCircleUser />
            User
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? active : inactive}`}
            to="/settings/projects"
          >
            <FaCode />
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? active : inactive}`}
            to="/settings/about"
          >
            <FaList /> About
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? active : inactive}`}
            to="/settings/photos"
          >
            <FaPhotoFilm />
            Photos
          </NavLink>
        </ul>
      </aside>

      <main className="overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default Settings;
