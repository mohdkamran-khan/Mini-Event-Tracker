import { useState } from "react";
import { FaArrowRight, FaEdit, FaEye } from "react-icons/fa";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import EventUpdateView from "./EventUpdateView";
import EventView from "./EventView";
import { toast } from "react-toastify";
import LoaderComponent from "./LoaderComponent";
import { axiosClient } from "../utils/axiosClient";

const EventViewModel = ({ id }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [event, setEvent] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/event/" + id, {
        headers: {
          user: localStorage.getItem("user") || "",
        },
      });
      const data = await response.data;
      setEvent(data);
    } catch (error) {
      toast.error(error.message.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  async function open() {
    await fetchData();
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={open}
        className="px-3 h-7 text-xs text-white rounded flex items-center justify-center gap-x-2 bg-indigo-500 cursor-pointer hover:scale-105 hover:shadow-2xl"
      >
        <span>View</span>
        <FaArrowRight />
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-2xl bg-amber-400 shadow-2xl p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="div"
                className="text-base/7 font-medium text-amber-900 flex items-center justify-between p-2 mb-3"
              >
                <h1 className="text-2xl cursor-context-menu flex items-center justify-center">
                  Event {isUpdate ? "Edit" : "Details"}
                  <button
                    onClick={() => setIsUpdate(!isUpdate)}
                    title="update"
                    className="ml-3 cursor-pointer hover:scale-110 hover:shadow-2xl"
                  >
                    {isUpdate ? <FaEye /> : <FaEdit />}
                  </button>
                </h1>
                <button
                  onClick={close}
                  className="text-xl p-1 bg-amber-900 rounded-2xl text-amber-300 cursor-pointer hover:scale-110 hover:shadow-2xl"
                >
                  <MdClose />
                </button>
              </DialogTitle>
              {isLoading ? (
                <>
                  <div className="w-full min-h-[40vh] flex items-center justify-center">
                    <LoaderComponent />
                  </div>
                </>
              ) : (
                <section className="w-full min-h-[40vh] bg-amber-100 rounded-xl p-2">
                  {isUpdate ? (
                    <EventUpdateView
                      data={event}
                      fetchData={fetchData}
                      close={close}
                    />
                  ) : (
                    <EventView data={event} close={close} />
                  )}
                </section>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EventViewModel;
