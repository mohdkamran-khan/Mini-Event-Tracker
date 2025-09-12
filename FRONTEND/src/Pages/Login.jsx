import React from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import { axiosClient } from "../utils/axiosClient";
import { useMainContext } from "../context/MainContext";

const Login = () => {
  const [isHide, setIsHide] = React.useState(true);
  const navigate = useNavigate();
  const { fetchProfile } = useMainContext();

  const [isLoading, setLoading] = React.useState(false);

  const onSubmitHandler = async (values, helpers) => {
    try {
      setLoading(true);
      const response = await axiosClient.post("/login", values);
      const data = await response.data;
      toast.success(data.message);
      localStorage.setItem("user", data.token);
      helpers.resetForm();
      await fetchProfile();
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid Email")
      .required("Email is Required"),
    password: yup
      .string()
      .required("Password is Required")
      .min(4, "password must be atleast 4 characters long"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <>
      <div className="min-h-[60vh] flex items-center justify-center flex-col text-xs">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          <Form
            action=""
            className="w-[95%] md:w-1/2 lg:w-1/3 bg-amber-100 p-6 my-10 rounded-xl shadow-lg"
          >
            <div className="mb-3 flex items-center justify-center">
              <Logo />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                id="email"
                type="text"
                className="w-full py-2 px-3 rounded border outline-none"
                placeholder="Enter Your Email"
              />
              <ErrorMessage
                name="email"
                component={"p"}
                className="text-red-600 text-xs mt-1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <div className="w-full py-2 px-3 rounded border flex">
                <Field
                  name="password"
                  id="password"
                  type={isHide ? "password" : "text"}
                  className="w-full"
                  placeholder="Enter Your Password"
                />
                <button
                  onClick={() => setIsHide(!isHide)}
                  type="button"
                  className="text-zinc-500 cursor-pointer"
                >
                  {isHide ? "Show" : "Hide"}
                </button>
              </div>

              <ErrorMessage
                name="password"
                component={"p"}
                className="text-red-600 text-xs mt-1"
              />
            </div>

            <div className="mb-3 py-2 text-xl">
              <Loader isLoading={isLoading} text="Login" />
            </div>
          </Form>
        </Formik>
        <span className="mb-8">
          Dont't have an account?{" "}
          <Link
            to={"/register"}
            className="text-blue-600 font-bold hover:underline cursor-pointer"
          >
            Register
          </Link>
        </span>
      </div>
    </>
  );
};

export default Login;
