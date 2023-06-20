import { RouteMap } from "../utils/interface/route";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Provider from "../pages/Provider";
import AddProvider from "../pages/Provider/Add";
import EditProvider from "../pages/Provider/Edit";

const routes: RouteMap[] = [
  {
    name: "login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Provider",
    path: "/provider",
    element: <Provider />,
  },
  {
    name: "Add Provider",
    path: "/provider/add",
    element: <AddProvider />,
  },
  {
    name: "Edit Provider",
    path: "/provider/edit/:id",
    element: <EditProvider />,
  },
];

export default routes;
