import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axiosInstace from "../axios/axios";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../redux/slices/taskSlice";

const EditTaskPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState();

  const fetchData = async () => {
    try {
      const { data } = await axiosInstace.get("/task/findOne", {
        params: { id },
        headers: { authorization: `Bearer ${user?.token}` },
      });
      setTask(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getFormattedDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    return formattedDate;
  };
  
  

  const { handleChange, handleSubmit } = useFormik({
    initialValues: task || {
      title: "",
      description: "",
      priority: "easy",
      dueDate: task? getFormattedDate(task?.dueDate) : "",
      category: "",
      status: "pending",
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      try {
        console.log(values);
        const { data } = await axiosInstace.post(
          "/task/edit",
          { task: values, id },
          {
            headers: { authorization: `Bearer ${user?.token}` },
          }
        );
        dispatch(updateTask(data));
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  useEffect(() => {
    if (user.token) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Edit Task
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            action="#"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  defaultValue={task?.title}
                  type="text"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  description
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  defaultValue={task?.description}
                  id="description"
                  name="description"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="category"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  category
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="category"
                  name="category"
                  defaultValue={task?.category}
                  type="text"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="dueDate"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  dueDate
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="dueDate"
                  name="dueDate"
                  value={task?.dueDate}
                  type="date"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="priority"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  priority
                </label>
              </div>
              <div className="mt-2">
                <select
                  name="priority"
                  onChange={handleChange}
                  className="p-2 rounded-md "
                >
                  <option
                    selected={task?.priority === "easy" ? true : false}
                    onChange={handleChange}
                    name="priority"
                    value="easy"
                  >
                    Easy
                  </option>
                  <option
                    selected={task?.priority === "medium" ? true : false}
                    onChange={handleChange}
                    name="priority"
                    value="medium"
                  >
                    Medium
                  </option>
                  <option
                    selected={task?.priority === "hard" ? true : false}
                    onChange={handleChange}
                    name="priority"
                    value="hard"
                  >
                    Hard
                  </option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="priority"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  status
                </label>
              </div>
              <div className="mt-2">
                <select
                  name="status"
                  onChange={handleChange}
                  className="p-2 rounded-md "
                >
                  <option
                    selected={task?.status === "pending" ? true : false}
                    onChange={handleChange}
                    name="status"
                    value="pending"
                  >
                    Pending
                  </option>
                  <option
                    selected={task?.status === "progress" ? true : false}
                    onChange={handleChange}
                    name="status"
                    value="progress"
                  >
                    Progress
                  </option>
                  <option
                    selected={task?.status === "completed" ? true : false}
                    onChange={handleChange}
                    name="status"
                    value="completed"
                  >
                    Completed
                  </option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTaskPage;
