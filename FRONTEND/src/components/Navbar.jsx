import { BiLogInCircle } from "react-icons/bi";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useMainContext } from "../context/MainContext.jsx";

const Navbar = () => {
  const { user, logoutHandler } = useMainContext();

  return (
    <header className="text-gray-600 body-font">
      <div className="mx-auto flex flex-wrap p-6 flex-row items-center justify-between bg-yellow-100">
        <Logo />
        {!user ? (
          <Link
            to={"/login"}
            className="inline-flex items-center bg-amber-400 text-amber-900 border-0 px-3 hover:bg-amber-300 rounded cursor-pointer text-sm py-2 hover:scale-103 hover:shadow-2xl"
          >
            Login <BiLogInCircle className="ml-1" />
          </Link>
        ) : (
          <button
            onClick={logoutHandler}
            className="inline-flex items-center bg-amber-400 text-amber-900 border-0 px-3 hover:bg-amber-300 font-bold rounded cursor-pointer text-sm py-2 hover:scale-103 hover:shadow-2xl"
          >
            LogOut <BiLogOutCircle className="ml-1" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
