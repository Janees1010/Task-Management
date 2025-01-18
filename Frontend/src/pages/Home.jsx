import React, { useEffect } from "react";
import axiosInstace from "../axios/axios";
import { useSelector, useDispatch } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { addTasks } from "../redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { deleteTask } from "../redux/slices/taskSlice";

const Home = () => {
  const user = useSelector((state) => state.user);
  const tasks = useSelector((state) => state.task);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchTasks = async () => {
    const { data } = await axiosInstace.get("/task", {
      headers: { authorization: `Bearer ${user?.token}` },
    });
    dispatch(addTasks(data));
    console.log(data);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosInstace.get("/task/delete", {
        params: { id },
        headers: { authorization: `Bearer ${user?.token}` },
      });
      console.log(data);
      dispatch(deleteTask({ id }));
    } catch (error) {}
  };

  useEffect(() => {
    if (user?.token) {
      fetchTasks();
    }
  }, [user]);
  return (
    <div className="ml-[300px] flex gap-2 flex-wrap">
      {tasks && tasks.length ? (
        tasks.map((task, i) => {
          return (
            <a
              key={task._id}
              href="#"
              className="block max-w-sm p-6 relative min-w-[300px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {task.title}
              </h5>
              <p className="font-normal pb-3 text-gray-700 dark:text-gray-400">
                {task.description}
              </p>
              <p className="text-blue-300">
                <span className="text-gray-400">Category:</span> {task.category}
              </p>
              <p className="text-green-500">
                <span className="text-gray-400">status:</span> {task.status}
              </p>
              <p className="text-red-500">
                <span className="text-gray-400">dueDate:</span>{" "}
                {new Date(task.dueDate).toDateString()}
              </p>
              <FaRegEdit
                onClick={() => handleEdit(task._id)}
                className="absolute top-4 right-4 text-white text-xl"
              />
              <MdOutlineDelete
                onClick={() => handleDelete(task._id)}
                className="absolute top-4 right-10 text-red-500 text-xl"
              />
            </a>
          );
        })
      ) : (
        <h1 className="text-center">No Tasks Yet</h1>
      )}
    </div>
  );
};

export default Home;
