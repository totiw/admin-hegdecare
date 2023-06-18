import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AddProvider from "../../assets/icons/AddProvider";
import Table from "./Table";

// REACT TABLE COMPONENT

const index = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebar, setSidebar] = useState<boolean>(false);

  useEffect(() => {
    if (windowWidth >= 1280) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="w-full h-screen flex flex-row">
      {/* SIDEBAR */}
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} windowWidth={windowWidth} />

      {/* HOME */}
      <div className="w-[80vw] flex flex-col grow">
        <Topbar setSidebar={setSidebar} />
        <main className="w-full max-h-[90vh] overflow-auto flex flex-col gap-6 px-20 py-10">
          <h1 className="font-bold text-3xl">Providers</h1>
          <div className="w-full flex flex-row justify-between">
            <input
              type="text"
              name="provider"
              id="provider"
              placeholder="search provider.."
              className="border basis-1/2 xl:basis-1/4 px-3"
            />
            <button className="bg-[#4942E4] flex flex-row items-center gap-2 px-4 py-3 rounded-md text-white text-sm font-bold">
              <AddProvider color="#ffffff" height=".9em" /> Add Provider
            </button>
          </div>
          <Table />
        </main>
      </div>
    </div>
  );
};

export default index;
