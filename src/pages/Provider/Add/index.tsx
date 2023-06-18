import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
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
      <div className="flex flex-col grow">
        <Topbar setSidebar={setSidebar} />
        <main className="w-full h-full flex flex-row justify-center items-center">
          <h1 className="font-bold text-xl">Add Provider</h1>
        </main>
      </div>
    </div>
  );
};

export default index;
