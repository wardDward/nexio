import { useDispatch } from "react-redux";
import Nexio from "../../assets/images/image_icon/nexio.png";
import useAuth from "../../hooks/useAuth";
import { resendEmailVerification } from "../../redux/feature/userSlice";
export default function VerifyEmail() {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();

  const resendEmail = (e) => {
    e.preventDefault();
    dispatch(resendEmailVerification());
  };

  return (
    <div className="h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white shadow-lg w-full md:w-[50%] lg:w-[30%] p-5 flex flex-col rounded-md">
        <img src={Nexio} alt="nexio" className="h-[70px] w-[70px]" />
        <hr className="my-[10px]" />
        <p className="mt-[10px] mb-[30px] text-gray-700">
          Please check your email for your email verification. If you do not
          receive any email, Please click the button below.
        </p>
        <div className="flex justify-between items-center">
          <form
            onSubmit={resendEmail}
            className="flex justify-between items-center"
          >
            <button
              disabled={isLoading}
              type="submit"
              className="text-white bg-black py-2 px-10 rounded-md hover:bg-gray-700 flex items-center justify-center"
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
              Resend
            </button>
          </form>
          <form action="">
            <div
              type="submit"
              className="text-gray-600 underline hover:text-gray-800"
            >
              Logout
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
