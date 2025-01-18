import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstace from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { replaceTask } from "../redux/slices/taskSlice";

const SideBar = ({ fetchTasks }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchTasksByStatus = async (status) => {
    try {
      const { data } = await axiosInstace.get(`/task/status`, {
        params: { status },
        headers: { authorization: `Bearer ${user?.token}` },
      });
      console.log(data);
      dispatch(replaceTask(data));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  // const fetchTasks = async () => {
  //     const { data } = await axiosInstace.get("/task", {
  //       headers: {"authorization" : `Bearer ${user?.token}`},
  //     });
  //     dispatch(replaceTask(data))
  //     console.log(data);
  //     navigate("/")
  //   };
  return (
    <>
      <div className="flex flex-col gap-4">
        <Link
          to="/add"
          className="bg-blue-950 text-center text-md rounded-md py-2 font-md active:scale-95 transition-all ease-in text-white"
        >
          Add Tasks
        </Link>
        <Link
          onClick={() => fetchTasks()}
          className="bg-blue-950 text-md text-center rounded-md py-2 font-md active:scale-95 transition-all ease-in text-white"
        >
          All Tasks
        </Link>
        <Link
          onClick={() => fetchTasksByStatus("pending")}
          className="bg-blue-950 text-md text-center rounded-md py-2 font-md active:scale-95 transition-all ease-in text-white"
        >
          Pending Tasks
        </Link>
        <button
          onClick={() => fetchTasksByStatus("completed")}
          className="bg-blue-950 text-md text-center rounded-md py-2 font-md active:scale-95 transition-all ease-in text-white"
        >
          Completed Tasks
        </button>
        <button
          onClick={() => fetchTasksByStatus("progress")}
          className="bg-blue-950 text-md text-center rounded-md py-2 font-md active:scale-95 transition-all ease-in text-white"
        >
          Progress Tasks
        </button>
      </div>
      <hr className="text-black" />
    </>
  );
};

export default SideBar;
