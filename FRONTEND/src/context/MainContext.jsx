import React, { createContext, useContext } from "react";
import { useEffect } from "react";
import { axiosClient } from "../utils/axiosClient";
import LoaderComponent from "../components/LoaderComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

export const mainContext = createContext();

export const useMainContext = () => useContext(mainContext);

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const fetchAllEvents = async () => {
    try {
      const response = await axiosClient.get("/all-events", {
        headers: {
          user: localStorage.getItem("user") || "",
        },
      });
      const data = response.data;
      setEvents(data);
    } catch (error) {
      toast.error(error.response.data.error || error.message);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    toast.success("Logged Out Successfully");
    navigate("/");
    setUser(null);
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("user") || "";
      if (!token) return;

      const response = await axiosClient.get("/profile", {
        headers: {
          user: token,
        },
      });
      const data = await response.data;
      setUser(data);
      await fetchAllEvents();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <mainContext.Provider
      value={{ user, logoutHandler, fetchProfile, fetchAllEvents, events }}
    >
      {children}
    </mainContext.Provider>
  );
};
