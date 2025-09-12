import { CgSpinner } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa";

const Loader = ({ text, isLoading }) => {
  return (
    <>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-400 text-amber-900 disabled:bg-amber-300 mt-5 mb-0 py-2 px-3 rounded cursor-pointer hover:bg-amber-300 flex items-center justify-center gap-x-2"
      >
        <span>{text}</span>
        {isLoading ? (
          <CgSpinner className="text-xs animate-spin" />
        ) : (
          <FaArrowRight className="text-xs" />
        )}
      </button>
    </>
  );
};

export default Loader;
