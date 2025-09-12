import { taskCategories } from "../utils/constant";
import TaskViewModel from "./EventViewModel";

const EventCard = ({ data }) => {
  const category = data.category;
  const categoryClass = taskCategories[category];
  return (
    <>
      <div className="w-full bg-amber-50 rounded-xl shadow p-4 hover:scale-102 hover:shadow-2xl">
        <p className="text-xl font-bold capitalize">{data.title}</p>
        <div className="flex justify-between items-center">
          <span className={categoryClass}>{category}</span>
          <TaskViewModel id={data._id} />
        </div>
        <div className="p font-light text-sm text-zinc-500 bg-gray-100 rounded-xl p-2">
          {data.description}
        </div>
        <div className="flex justify-between items-center">
          <span className="bg-yellow-100 text-yellow-800 border border-yellow-800 text-xs rounded px-4 py-1 mt-4 cursor-context-menu">
            {data.location}
          </span>
          <span className="bg-amber-100 text-amber-800 border border-amber-800 text-xs rounded px-4 py-1 mt-4 cursor-context-menu">
            {data.date}
          </span>
        </div>
      </div>
    </>
  );
};

export default EventCard;
