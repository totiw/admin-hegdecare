import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import AsyncSelect from "react-select/async";
import axios from "../../../api/axios";

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<any>({});
  const [data, setData] = useState<any>({});
  const [selectedValue, setSelectedValue] = useState<any>([]);
  const [currentData, setCurrentData] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState<any | string>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebar, setSidebar] = useState<boolean>(false);

  // GET CURRENT USER
  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/auth/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
      // console.log(response.data);
    } catch (err: any) {
      alert("You Haven't Login");
      navigate("/login");
    }
  };

  // GET SKILLS
  const getSkills = async (query: string) => {
    try {
      const response = await axios.get(`/skills?search=${query}`);
      return response.data.data.map((item: any) => ({
        ...item,
        value: item.id,
        label: item.name,
      }));
    } catch (err: any) {
      console.log(err.data.message);
    }
  };

  const handleChange = (event: any) => {
    // console.log(event.target);
    const { name, value } = event.target;
    setCurrentData({
      ...currentData,
      [name]: value,
    });
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      formData.append("skills", JSON.stringify(selectedValue.map((item: any) => item.id)));
      formData.append("_method", "PATCH");
      const response = await axios.post(`/providers/${id}`, formData);
      alert(response.data.message);
      navigate("/provider");
    } catch (err: any) {
      console.log(err);
    }
  };

  const getProvider = async () => {
    try {
      const response = await axios.get("/providers");
      setData(response.data.data.filter((provider: any) => provider.id == id)[0]);
      setSelectedValue(response.data.data.filter((provider: any) => provider.id == id)[0].skills);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProvider();
    getCurrentUser();
  }, []);

  useEffect(() => {
    setCurrentData({ ...data });
  }, [data]);

  // useEffect(() => {
  //   console.log(currentData);
  // }, [currentData]);

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
    <>
      {!token && (
        <div className="h-screen flex flex-row justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      {token && (
        <div className="w-full h-screen flex flex-row">
          {/* SIDEBAR */}
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} user={user} />

          {/* PROVIDER */}
          <div className="w-[80vw] flex flex-col grow">
            <Topbar setSidebar={setSidebar} user={user} />
            <main className="w-full max-h-[90vh] overflow-auto flex flex-col gap-10 px-20 py-10">
              {currentData && (
                <>
                  <h1 className="text-2xl font-semibold capitalize">
                    edit provider (
                    {currentData.user ? `${currentData.user.first_name}  ${currentData.user.last_name}` : ""})
                  </h1>
                  <form onSubmit={handleSubmit} className="w-full flex flex-row justify-center">
                    <div className="flex flex-col gap-3 basis-full xl:basis-1/3">
                      <input type="file" id="file" name="thumbnail" onChange={handleFileChange} hidden />
                      <div className="w-40 h-40 xl:w-32 xl:h-32 rounded-full self-center overflow-hidden">
                        <img src={selectedImage ?? `${data.thumbnail}`} alt="profile picture" />
                      </div>
                      <label htmlFor="file" className="self-center border rounded-sm py-2 px-4 cursor-pointer">
                        Select Image
                      </label>
                      <label htmlFor="price">
                        <p>Price</p>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          value={currentData.price}
                          onChange={handleChange}
                          className="w-full border-2 focus:outline-info-100 rounded-md py-3 px-2"
                        />
                      </label>
                      <label htmlFor="about">
                        <p>About</p>
                        <textarea
                          name="about"
                          id="about"
                          value={currentData.about}
                          onChange={handleChange}
                          className="w-full min-h-[100px] border-2 focus:outline-info-100 rounded-md py-3 px-2"
                        ></textarea>
                      </label>
                      <label htmlFor="address">
                        <p>Address</p>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={currentData.address}
                          onChange={handleChange}
                          className="w-full border-2 focus:outline-info-100 rounded-md py-3 px-2"
                        />
                      </label>
                      <label htmlFor="latitude">
                        <p>Latitude</p>
                        <input
                          type="text"
                          name="latitude"
                          id="latitude"
                          value={currentData.latitude}
                          onChange={handleChange}
                          className="w-full border-2 focus:outline-info-100 rounded-md py-3 px-2"
                        />
                      </label>
                      <label htmlFor="longitude">
                        <p>Longitude</p>
                        <input
                          type="text"
                          name="longitude"
                          id="longitude"
                          value={currentData.longitude}
                          onChange={handleChange}
                          className="w-full border-2 focus:outline-info-100 rounded-md py-3 px-2"
                        />
                      </label>
                      <label htmlFor="category">
                        <p>Category</p>
                        <select
                          name="category"
                          id="category"
                          value={currentData.category}
                          onChange={handleChange}
                          className="w-full border-2 focus:outline-info-100 rounded-md py-3 px-2"
                        >
                          <option value="housekeeping" className="capitalize">
                            housekeeping
                          </option>
                          <option value="tutoring" className="capitalize">
                            tutoring
                          </option>
                          <option value="rentafriend" className="capitalize">
                            rentafriend
                          </option>
                          <option value="maintenance" className="capitalize">
                            maintenance
                          </option>
                          <option value="other" className="capitalize">
                            other
                          </option>
                        </select>
                      </label>
                      <AsyncSelect
                        value={
                          selectedValue != null &&
                          selectedValue.map((item: any) => ({
                            ...item,
                            value: item.id,
                            label: item.name,
                          }))
                        }
                        cacheOptions
                        isMulti
                        name="skills"
                        onChange={setSelectedValue}
                        defaultOptions
                        loadOptions={getSkills}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />

                      <button
                        type="submit"
                        className="w-[200px] self-center bg-info-100 text-white px-4 py-2 mt-5 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </>
              )}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default index;
