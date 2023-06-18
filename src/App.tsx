import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteMap } from "./utils/interface/route";
import routes from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {routes.map((route: RouteMap) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
