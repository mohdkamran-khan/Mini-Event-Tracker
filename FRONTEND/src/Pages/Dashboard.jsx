import EventCard from "../components/EventCard";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useMainContext } from "../context/MainContext";

const Dashboard = () => {
  const { events } = useMainContext();
  const [search, setSearch] = useState("");
  const filterResults =
    events.length > 0
      ? events.filter((cur, i) => {
          const x = search.toLowerCase();
          const y = cur.title.trim().toLowerCase();
          const z = cur.description.trim().toLowerCase();
          return (
            y.includes(x) ||
            y.startsWith(x) ||
            y.endsWith(x) ||
            z.includes(x) ||
            z.startsWith(x) ||
            z.endsWith(x)
          );
        })
      : [];

  // split upcoming vs past
  const now = new Date();
  const upcomingEvents = filterResults
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastEvents = filterResults
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <div className="flex items-center justify-center w-[80%] mx-auto">
        <div className="mt-10 flex items-center justify-center bg-yellow-50 outline-none w-[60%] mx-auto shadow transform hover:scale-102 hover:shadow-2xl px-4 rounded-xl">
          <CiSearch className="text-xl cursor-pointer text-amber-900" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            className="w-full py-3 px-4 outline-none"
            placeholder="Search Tasks"
          />
        </div>
        <Link
          to={"/add-event"}
          className="py-2 mt-10 rounded-xl cursor-pointer bg-amber-400 text-amber-900 hover:scale-105 hover:shadow-2xl px-4 h-12 flex items-center justify-center gap-x-2 text-lg font-bold hover:bg-amber-300"
        >
          <MdFormatListBulletedAdd />
          Add Event
        </Link>
      </div>

      {/* Upcoming Events */}
      <div className="w-[90%] mx-auto p-6 mb-10 bg-amber-400 rounded-xl m-6">
        <h2 className="text-xl font-bold text-amber-900 mb-4">
          Upcoming Events
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:gird-cols-3 gap-5">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((cur, i) => <EventCard data={cur} key={i} />)
          ) : (
            <p className="text-sm text-amber-700">No upcoming events</p>
          )}
        </div>
      </div>

      {/* Past Events */}
      <div className="w-[90%] mx-auto p-6 mb-10 bg-amber-200 rounded-xl m-6">
        <h2 className="text-xl font-bold text-amber-900 mb-4">Past Events</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:gird-cols-3 gap-5">
          {pastEvents.length > 0 ? (
            pastEvents.map((cur, i) => <EventCard data={cur} key={i} />)
          ) : (
            <p className="text-sm text-amber-700">No past events</p>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filterResults.length === 0 && (
        <div className="col-span-3 text-center">
          <h1 className="text-center text-2xl font-bold text-amber-900 p-10">
            No Events Have Been Added
          </h1>
          <p className="text-sm text-amber-700 mb-5">
            Add your upcoming events to manage them easily from anywhere
          </p>
          <div className="flex items-center justify-center text-md text-amber-800 cursor-pointer hover:scale-105 hover:shadow-2xl mt-8 mb-5 hover:underline gap-x-1">
            <a href="/add-event" className="cursor-pointer">
              Add Events
            </a>
            <FaArrowRight className="text-xs" />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
