import { Link } from "react-router-dom";
import { BiSolidTimer } from "react-icons/bi";

const Logo = () => {
  return (
    <>
      <Link
        to={"/"}
        className="flex title-font font-medium items-center hover:scale-102"
      >
        <BiSolidTimer className="text-4xl text-amber-900" />
        <span className="ml-2 font-bold font-serif text-2xl text-amber-900">
          Event Tracker
        </span>
      </Link>
    </>
  );
};

export default Logo;
