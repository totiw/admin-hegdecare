import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import User from "/user.svg";
import Close from "../assets/icons/Close";
// import House from "../assets/icons/House";
import Providers from "../assets/icons/Providers";
import axios from "../api/axios";
// import AddProvider from "../assets/icons/AddProvider";
const Sidebar = ({
  sidebar,
  setSidebar,
  user,
}: {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
}) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const logout = async () => {
    console.log("OK");
    try {
      const response = await axios.delete("/auth/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      alert(response.data.message);
      navigate("/login", { replace: true });
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <>
      {/* MOBILE VERSION */}
      <div
        className={`${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } dark absolute z-10 h-full w-full xl:hidden flex flex-col py-5 transition-all ease-in-out duration-300`}
      >
        {/* USER INFORMATION */}
        <div className="flex flex-col gap-5 px-6">
          <div className="flex flex-row items-center justify-between">
            <img src={user != undefined ? user.thumbnail : User} alt="user icon" className="w-10" />
            <button onClick={() => setSidebar(false)} className="xl:hidden">
              <Close color="#ffffff" height="1em" />
            </button>
          </div>
          <div className="bg-[#ffffff09] text-white p-3 flex flex-col rounded-md">
            <h2 className="font-semibold">
              {user && (
                <>
                  {user.first_name} {user.last_name}
                </>
              )}
            </h2>
            <p className="text-[#9da4ae] text-sm">
              <button onClick={logout}>Logout</button>
            </p>
          </div>
        </div>

        <hr className="my-6 border-[#ffffff10]" />

        {/* NAVIGATION */}
        <div className="flex flex-col px-6 gap-1">
          {/* <Link
            to="/"
            className={`${
              location.pathname == "/" && "bg-[#ffffff10]"
            } flex flex-row items-center gap-2 px-3 py-2 rounded-md hover:bg-[#ffffff10]`}
          >
            <House color={location.pathname == "/" ? "#4942E4" : "#9da4ae"} height="1em" />
            <p className={`${location.pathname == "/" ? "text-white" : "text-[#9da4ae]"} text-sm font-semibold`}>
              Hedgecare
            </p>
          </Link> */}
          <Link
            to="/provider"
            className={`${
              location.pathname == "/provider" && "bg-[#ffffff10]"
            } flex flex-row items-center gap-2 px-3 py-2 rounded-md hover:bg-[#ffffff10]`}
          >
            <Providers color={location.pathname == "/provider" ? "#4942E4" : "#9da4ae"} height="1em" />
            <p
              className={`${location.pathname == "/provider" ? "text-white" : "text-[#9da4ae]"} text-sm font-semibold`}
            >
              Providers
            </p>
          </Link>
          {/* <Link
            to="/provider/add"
            className={`${
              location.pathname == "/provider/add" && "bg-[#ffffff10]"
            } flex flex-row items-center gap-2 px-3 py-2 rounded-md hover:bg-[#ffffff10]`}
          >
            <AddProvider color={location.pathname == "/provider/add" ? "#4942E4" : "#9da4ae"} height="1em" />
            <p
              className={`${
                location.pathname == "/provider/add" ? "text-white" : "text-[#9da4ae]"
              } text-sm font-semibold`}
            >
              Add Provider
            </p>
          </Link> */}
        </div>
      </div>
      {/* DESKTOP VERSION */}
      <div className={`hidden dark h-full w-[300px] xl:flex flex-col py-5`}>
        {/* USER INFORMATION */}
        <div className="flex flex-col gap-5 px-6">
          <div className="flex flex-row items-center justify-between">
            <img src={user != undefined ? user.thumbnail : User} alt="user icon" className="w-10 rounded-full" />
            <button onClick={() => setSidebar(false)} className="xl:hidden">
              <Close color="#ffffff" height="1em" />
            </button>
          </div>
          <div className="bg-[#ffffff09] text-white p-3 flex flex-col rounded-md">
            <h2 className="font-semibold">
              {user && (
                <>
                  {user.first_name} {user.last_name}
                </>
              )}
            </h2>
            <p className="text-[#9da4ae] text-sm">
              <button onClick={logout}>Logout</button>
            </p>
          </div>
        </div>

        <hr className="my-6 border-[#ffffff10]" />

        {/* NAVIGATION */}
        <div className="flex flex-col px-6 gap-1">
          {/* <Link
            to="/"
            className={`${
              location.pathname == "/" && "bg-[#ffffff10]"
            } flex flex-row items-center gap-2 px-3 py-2 rounded-md hover:bg-[#ffffff10]`}
          >
            <House color={location.pathname == "/" ? "#4942E4" : "#9da4ae"} height="1em" />
            <p className={`${location.pathname == "/" ? "text-white" : "text-[#9da4ae]"} text-sm font-semibold`}>
              Hedgecare
            </p>
          </Link> */}
          <Link
            to="/provider"
            className={`${
              location.pathname == "/provider" && "bg-[#ffffff10]"
            } flex flex-row items-center gap-2 px-3 py-2 rounded-md hover:bg-[#ffffff10]`}
          >
            <Providers color={location.pathname == "/provider" ? "#4942E4" : "#9da4ae"} height="1em" />
            <p
              className={`${location.pathname == "/provider" ? "text-white" : "text-[#9da4ae]"} text-sm font-semibold`}
            >
              Providers
            </p>
          </Link>
          {/* <Link
            to="/provider/add"
            className={`${
              location.pathname == "/provider/add" && "bg-[#ffffff10]"
            } flex flex-row items-center gap-2 px-3 py-2 rounded-md hover:bg-[#ffffff10]`}
          >
            <AddProvider color={location.pathname == "/provider/add" ? "#4942E4" : "#9da4ae"} height="1em" />
            <p
              className={`${
                location.pathname == "/provider/add" ? "text-white" : "text-[#9da4ae]"
              } text-sm font-semibold`}
            >
              Add Provider
            </p>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
