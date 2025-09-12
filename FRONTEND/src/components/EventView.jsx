import { taskCategories } from "../utils/constant";
import { axiosClient } from "../utils/axiosClient";
import { toast } from "react-toastify";
import { useMainContext } from "../context/MainContext";
import { FaTrash } from "react-icons/fa";

const EventView = ({ data, close }) => {
  const category = data.category;
  const categoryClass = taskCategories[category];

  const { fetchAllEvents } = useMainContext();

  const deleteHandler = async () => {
    try {
      await axiosClient.delete(`/event/${data._id}`, {
        headers: {
          user: localStorage.getItem("user") || "",
        },
      });
      toast.success("Event deleted successfully");
      fetchAllEvents(); // refresh events list
      close();
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <>
      <div>
        <h3 className="text-3xl font-bold text-amber-900 m-4">
          Title : {data.title}
        </h3>
        <hr />
        <p className="text-xl font-semibold text-amber-800 ml-4 mb-6 mt-3">
          Description : {data.description}
        </p>
        <p className="text-md text-amber-900 ml-1 mb-1">
          Location : {data.location}
        </p>
        <span className={categoryClass}>Category : {category}</span>
        <p className="text-md text-amber-900 ml-1 mt-1">Date : {data.date}</p>
      </div>
      <button
        onClick={deleteHandler}
        className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-red-700 cursor-pointer hover:scale-101 hover:shadow-2xl flex items-center justify-center"
      >
        Delete Event
        <FaTrash className="ml-2 mt-1" />
      </button>
    </>
  );
};

export default EventView;
