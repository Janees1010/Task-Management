import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { replaceTask } from "../redux/slices/taskSlice";
import axiosInstace from "../axios/axios";
import SideBar from "./SideBar";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUserDropdown, setShowDropDown] = useState(false);

  const logout = () => {
    console.log("logout");

    localStorage.clear();
    navigate("/signin");
  };

  const fetchTasks = async () => {
    const { data } = await axiosInstace.get("/task", {
      headers: { authorization: `Bearer ${user?.token}` },
    });
    dispatch(replaceTask(data));
    console.log(data);
    navigate("/");
  };
  let timeoutId;
  const handleSearch = async (e) => {
    try {
        if(timeoutId){
            clearTimeout(timeoutId)
        }
      const query = e.target.value;
       timeoutId = setTimeout(async () => {
        if (query.length) {
          const { data } = await axiosInstace("/task/search", {
            params: { query },
            headers: { authorization: `Bearer ${user?.token}` },
          });
          console.log(data);
          dispatch(replaceTask(data));
        } else {
          fetchTasks();
        }
      }, 700);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signin");
    }
    console.log(JSON.parse(user), "user");
    dispatch(addUser(JSON.parse(user)));
  }, []);

  return (
    <>
      <nav className="bg-blue-950 z-[700] flex justify-between items-center p-3 px-5 h-[60px] fixed w-full">
        <div>
          <h1 className="text-xl text-white">Task Management</h1>
        </div>
        <div>
          <input
            onChange={handleSearch}
            className="py-3 px-10 w-[500px] rounded-xl bg-white"
            placeholder="filter by category or Priority"
            type="text"
          />
        </div>

        <div className="relative">
          <button
            className="w-10 text-white text-xl  h-10 rounded-full bg-slate-500"
            onClick={() => setShowDropDown((pre) => !pre)}
          >{user.username ? user.username.slice(0,1) : ""}</button>
          {showUserDropdown ? (
            <div
              className="absolute right-0  mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  {user?.username}
                </a>
              </div>
              <hr />
              {/* <div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Settings
                  </a>
                </div> */}
              <div onClick={logout}>
                <button
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>

      {/* sidebar */}

      <div className="flex w-full">
        <div className="w-[22%]  h-[90vh] fixed  mt-[60px] py-10 px-3 text-gray-700 bg-gray-100">
          <SideBar fetchTasks={fetchTasks} />
        </div>
        <div className="flex-1 mt-[60px] p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
}
