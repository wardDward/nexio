import Nexio from "../../assets/images/image_icon/nexio.png";
import Google from "../../assets/images/image_icon/google.png";
import Facebook from "../../assets/images/image_icon/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, register } from "../../redux/feature/userSlice";
import { useEffect, useState } from "react";
import { handleInputChanges } from "../../utils/inputHelper";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  const { errorMessage, isLoading } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInput = (e) => {
    handleInputChanges(e, formData, setFormData);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await dispatch(register(formData));
    if (res.meta.requestStatus === "fulfilled") {
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
      navigate("/verify/email");
    }
  };

  return (
    <div className="h-screen bg-red-50 register flex justify-center items-center">
      <div className="register_overlay"></div>
      <div className="bg-white w-full md:w-[80%] lg:w-[50%] xl:w-[40%] p-4 rounded-md shadow-2xl border border-gray-500 h-full md:max-h-[80%] z-[99999]">
        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            <img src={Nexio} alt="nexio_logo" className="h-[60px] w-[60px]" />
            <p className="font-bold my-2">Hello There, Join Us in Nexio.</p>
            <p className="text-xs max-w-[500px] text-center">
              Embrace the Nexio of innovation, where each step forward
              intertwines the threads of connection and interaction.
            </p>
          </div>
          <form onSubmit={handleRegister} className="px-8 py-5 flex flex-col">
            <div className="flex flex-wrap justify-between">
              <div className="flex flex-col w-full md:w-[49.5%] mb-3 md:mb-5 md:md-0">
                <label htmlFor="name" className="font-semibold">
                  Name
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  placeholder="Enter your name"
                  className="border w-full p-2 rounded-md border-gray-400 placeholder:text-sm outline-none focus:border-black focus:ring-2 focus:ring-black"
                />
                {errorMessage?.name && (
                  <p className="text-red-500 text-sm">{errorMessage.name[0]}</p>
                )}
              </div>
              <div className="flex flex-col w-full md:w-[49.5%] mb-3 md:mb-5 md:md-0">
                <label htmlFor="username" className="font-semibold">
                  Username
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  value={formData.username}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  className="border w-full p-2 rounded-md border-gray-400 placeholder:text-sm outline-none focus:border-black focus:ring-2 focus:ring-black"
                />
                {errorMessage?.username && (
                  <p className="text-red-500 text-sm">
                    {errorMessage.username[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col mb-3 md:mb-5">
              <label htmlFor="name" className="font-semibold">
                Email
              </label>
              <input
                onChange={(e) => handleInput(e)}
                value={formData.email}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="border w-full p-2 rounded-md border-gray-400 placeholder:text-sm outline-none focus:border-black focus:ring-2 focus:ring-black"
              />
              {errorMessage?.email && (
                <p className="text-red-500 text-sm">{errorMessage.email[0]}</p>
              )}
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="flex flex-col w-full md:w-[49.5%] mb-3 md:mb-5">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={formData.password}
                  className="border w-full p-2 rounded-md border-gray-400 placeholder:text-sm outline-none focus:border-black focus:ring-2 focus:ring-black"
                />
                {errorMessage?.password && (
                  <p className="text-red-500 text-sm">
                    {errorMessage.password[0]}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full md:w-[49.5%] mb-3 md:mb-5 md:md-0">
                <label
                  htmlFor="password_confirmation"
                  className="font-semibold"
                >
                  Confirm Password
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  value={formData.password_confirmation}
                  placeholder="Confirm Password"
                  className="border w-full p-2 rounded-md border-gray-400 placeholder:text-sm outline-none focus:border-black focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
            <div className="my-2">
              <button
                disabled={isLoading}
                type="submit"
                className="bg-black text-white w-full py-2 rounded-lg flex items-center justify-center"
              >
                {isLoading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Sign Up
              </button>
            </div>
            <div className="flex items-center my-2">
              <div className="flex-1 border border-gray-500"></div>
              <div className="text-sm mx-5">OR</div>
              <div className="flex-1 border border-gray-500"></div>
            </div>
            <div className="mt-2 flex items-center justify-center">
              <button
                type="button"
                className="border p-1 rounded-md mx-2 flex items-center hover:bg-slate-100"
              >
                <span className="ml-1 text-sm">Sign Up using</span>
                <img src={Google} alt="" className="ml-2 h-[25px] w-[30px]" />
              </button>
              <button
                type="button"
                className="border p-1 rounded-md mx-2 flex items-center hover:bg-slate-100"
              >
                <span className="text-sm">Sign Up using</span>
                <img src={Facebook} alt="" className="ml-2 h-[25px] w-[30px]" />
              </button>
            </div>
          </form>
          <hr />
          <div className="text-sm text-center mt-3">
            Already have an account?
            <Link
              to="/login"
              className="hover:text-blue-500 hover:underline text-blue-400"
            >
              {" "}
              Sign In.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
