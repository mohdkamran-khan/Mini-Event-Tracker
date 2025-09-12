import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { taskCategories } from "../utils/constant";
import Loader from "../components/Loader";
import { useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { toast } from "react-toastify";
import { useMainContext } from "../context/MainContext";

const EventUpdateView = ({ data, fetchData, close }) => {
  const [isLoading, setLoading] = useState(false);

  const categories = Object.keys(taskCategories);
  const { fetchAllEvents } = useMainContext();
  const initialValues = {
    title: data.title || "",
    category: data.category || "",
    description: data.description || "",
    location: data.location || "",
    date: data.date || "",
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is Required"),
    category: yup
      .string()
      .required("Category is Required")
      .oneOf(categories, "Choose A Category"),
    date: yup
      .date()
      .required("Date is Required")
      .typeError("Invalid date format")
      .min(new Date(), "Enter A Valid Date"),
    location: yup.string().required("Location is Required"),
  });

  const onSubmitHandler = async (values) => {
    try {
      setLoading(true);
      const response = await axiosClient.put("/event/" + data._id, values, {
        headers: {
          user: localStorage.getItem("user") || "",
        },
      });
      const res = await response.data;
      toast.success(res.message);
      await fetchAllEvents();
      await fetchData();
      close();
    } catch (error) {
      toast.error(error.response.data.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        <Form className="bg-amber-100 mx-auto py-6 px-7">
          <div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="title"
                  className="ml-2 text-xl font-bold text-amber-900 text-start"
                >
                  Title:
                </label>
                <Field
                  name="title"
                  type="text"
                  className="py-2 px-4 border rounded-xl border-amber-900 w-[80%] m-5"
                  placeholder="Enter Event Name"
                />
              </div>
              <ErrorMessage
                name="title"
                className="text-red-600 text-xs"
                component={"p"}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="description"
                  className="ml-2 text-xl font-bold text-amber-900 text-start"
                >
                  Description:
                </label>
                <Field
                  as="textarea"
                  name="description"
                  type="text"
                  className="py-2 px-4 border rounded-xl border-amber-900 w-[80%] m-5"
                  placeholder="Enter Event Description (optional)"
                />
              </div>
              <ErrorMessage
                name="description"
                className="text-red-600 text-xs"
                component={"p"}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="location"
                  className="ml-2 text-xl font-bold text-amber-900 text-start"
                >
                  Location:
                </label>
                <Field
                  name="location"
                  type="text"
                  className="py-2 px-4 border rounded-xl border-amber-900 w-[80%] m-5"
                  placeholder="Enter Event Location"
                />
              </div>
              <ErrorMessage
                name="location"
                className="text-red-600 text-xs"
                component={"p"}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="category"
                  className="ml-2 text-xl font-bold text-amber-900 text-start"
                >
                  Category:
                </label>
                <Field
                  name="category"
                  as="select"
                  className="py-2 px-4 border rounded-xl border-amber-900 w-[80%] m-5"
                >
                  <option value="" disabled className="text-gray-300">
                    -- Select a Category --
                  </option>
                  {categories.map((curr, i) => {
                    return (
                      <option key={i} value={curr}>
                        {curr}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <ErrorMessage
                name="category"
                className="text-red-600 text-xs"
                component={"p"}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="date"
                  className="ml-2 text-xl font-bold text-amber-900 text-start"
                >
                  Event Date:
                </label>
                <Field
                  type="date"
                  name="date"
                  className="py-2 px-4 border rounded-xl border-amber-900 w-[80%] m-5"
                />
              </div>
              <ErrorMessage
                name="date"
                component={"p"}
                className="text-red-600 text-xs"
              />
            </div>

            <div className="mb-3 text-xl">
              <Loader isLoading={isLoading} text={"Update Event"} />
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default EventUpdateView;
