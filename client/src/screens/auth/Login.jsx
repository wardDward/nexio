import Nexio from "../../assets/images/image_icon/nexio.png";
import Google from "../../assets/images/image_icon/google.png";
import Facebook from "../../assets/images/image_icon/facebook.png";
import { useDispatch, useSelector } from "react-redux";
import { clearState, login } from "../../redux/feature/userSlice";
import { useEffect, useState } from "react";
import { handleInputChanges } from "../../utils/inputHelper.js";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    handleInputChanges(e, formData, setFormData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(formData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };



  return (
    <div className="h-screen flex justify-center items-center login">
      <div className="min-h-[500px] border border-gray-500 shadow-lg bg-white/95 w-[450px] rounded-md">
        <div className="flex justify-center flex-col p-6">
          <div className="flex justify-center flex-col items-center">
            <img src={Nexio} alt="nexio_logo" className="h-[50px] w-[50px]" />
            <p className="mt-2 text-lg font-bold tracking-wide">
              Welcome To Nexio
            </p>
          </div>
          <div className="mt-[30px]">
            <form onSubmit={handleLogin} autoComplete="off">
              <div className="w-full flex flex-col">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  className="border w-full mt-1 border-gray-400 py-[6px] px-2 rounded-md"
                  placeholder="Enter your email..."
                />
                {errorMessage?.email && (
                  <p className="text-red-500 text-sm">
                    {errorMessage.email[0]}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col my-4">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  className="border w-full mt-1 border-gray-400 py-[6px] px-2 rounded-md"
                  placeholder="Enter your Password..."
                />
                {errorMessage?.password && (
                  <p className="text-red-500 text-sm">
                    {errorMessage.password[0]}
                  </p>
                )}
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-black text-white py-1 rounded-md hover:bg-gray-700 flex items-center justify-center"
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
                Sign in
              </button>
              <div className="flex items-center my-4">
                <div className="flex-1 border border-gray-500"></div>
                <div className="text-sm mx-5">OR</div>
                <div className="flex-1 border border-gray-500"></div>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <button
                  type="button"
                  className="border p-1 rounded-md mx-2 flex items-center hover:bg-slate-100"
                >
                  <span className="ml-1 text-sm">Sign in using</span>
                  <img src={Google} alt="" className="ml-2 h-[25px] w-[30px]" />
                </button>
                <button
                  type="button"
                  className="border p-1 rounded-md mx-2 flex items-center hover:bg-slate-100"
                >
                  <span className="text-sm">Sign in using</span>
                  <img
                    src={Facebook}
                    alt=""
                    className="ml-2 h-[25px] w-[30px]"
                  />
                </button>
              </div>
              <div className="text-center my-4">
                <a href="#" className="text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>
            </form>
            <hr />
            <div className="text-sm text-center mt-4">
              {"Don't"} have an account?
              <Link
                to="/register"
                className="hover:text-blue-500 hover:underline text-blue-400"
              >
                {" "}
                Sign Up.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
