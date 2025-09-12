import { Outlet, useNavigate } from "react-router-dom";
import LoaderComponent from "../components/LoaderComponent";
import { useEffect } from "react";
import { useMainContext } from "../context/MainContext";
import { useState } from "react";

const ProtectedLayout = () => {
  const { user } = useMainContext();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
