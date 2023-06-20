import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hedgecare from "/hedgecare.svg";
import Login from "/login.svg";
import axios from "../../api/axios";

const index = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name == "email") {
      isValidEmail(value);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/admin/login", formData);
      localStorage.setItem("token", response.data.data.token);
      alert("SUCCESS LOGIN");
      navigate("/");
    } catch (err: any) {
      // console.log(err);
      alert(`Wrong user / password or ${err.response.data.message}`);
    }
  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValid(emailPattern.test(email));
  };
  return (
    <div className="h-screen flex flex-col xl:flex-row">
      <main className="relative xl:basis-1/2 w-full h-full flex flex-col justify-center items-center py-10">
        <img src={Hedgecare} alt="logo hedgecare" className="absolute top-5 left-5" />
        <form onSubmit={handleSubmit} className="w-5/6 xl:w-3/6 flex flex-col gap-10 mt-10 xl:mt-0">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <small className="text-sm">
              Don't have an account? <button className="text-[#4942E4] font-semibold ml-2">Register</button>
            </small>
          </div>
          <div className="flex flex-col gap-5">
            <label htmlFor="email">
              <p className="capitalize mb-2">email</p>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                required
                placeholder="Email Address.."
                className="w-full border-2 focus:outline-info-100 rounded-lg py-3 px-2"
              />
              {!valid && <small>You have to input the valid email</small>}
            </label>
            <label htmlFor="password">
              <p className="capitalize mb-2">password</p>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                required
                placeholder="Password.."
                className="w-full border-2 focus:outline-info-100 rounded-lg py-3 px-2"
              />
            </label>
          </div>
          <button type="submit" className="bg-[#4942E4] text-white font-semibold py-2 rounded-lg">
            login
          </button>
        </form>
      </main>
      <div className="bg-gradient-to-r from-[#1c2536] via-[#354156] to-[#1c2536] basis-1/2 w-full h-full flex flex-col justify-center items-center py-10">
        <img src={Login} alt="login illustration" className="w-3/5" />
      </div>
    </div>
  );
};

export default index;
