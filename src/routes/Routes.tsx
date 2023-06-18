import { RouteMap } from "../utils/interface/route";
import Home from "../pages/Home";
import Provider from "../pages/Provider";
import AddProvider from "../pages/Provider/Add";

const routes: RouteMap[] = [
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
];

export default routes;
