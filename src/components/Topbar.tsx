import Bars from "../assets/icons/Bars";
import Avatar from "../assets/images/man.png";
const Topbar = ({ setSidebar, user }: { setSidebar: React.Dispatch<React.SetStateAction<boolean>>; user: any }) => {
  return (
    <div className="flex flex-row items-center justify-between xl:justify-end p-5">
      <button onClick={() => setSidebar(true)} className="flex xl:hidden">
        <Bars color="#4942E4" height="1.5em" />
      </button>
      <img src={user != undefined ? user.thumbnail : Avatar} alt="avatar" className="w-8 rounded-full" />
    </div>
  );
};

export default Topbar;
