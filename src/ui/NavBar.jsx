import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";

function NavBar() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-[#f7f7f7] px-4 py-3  uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Yuan Jia
      </Link>

      <div className="flex flex-row space-x-4 font-light text-sm items-center justify-between">
        <Link to="/about" className="tracking-widest">
          About
        </Link>
        <Link to="/photos" className="tracking-widest">
          Photos
        </Link>
        <Link to="/settings" className="text-xs">
          <FaRegUser />
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
