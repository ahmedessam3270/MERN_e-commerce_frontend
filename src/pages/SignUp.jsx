import { useState } from "react";
import loginIcon from "../asset/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64";
import summaryApi from "../../common";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userSignupData, setUserSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    profilePic: "",
  });

  function handleOnChange(e) {
    const { name, value } = e.target;

    setUserSignupData((CurrUserData) => {
      return {
        ...CurrUserData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (userSignupData.password === userSignupData.confirmPassword) {
      const dataResponse = await fetch(summaryApi.signUp.url, {
        method: summaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userSignupData),
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Password and confirm password are not identical");
    }
  }

  async function handleUploadPic(e) {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setUserSignupData((prevProfilePic) => {
      return {
        ...prevProfilePic,
        profilePic: imagePic,
      };
    });
  }

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img
                src={userSignupData.profilePic || loginIcon}
                alt="Login icon"
              />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 text-center absolute cursor-pointer w-full bottom-0">
                  Upload Photo
                </div>
                <input type="file" hidden onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={userSignupData.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={userSignupData.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Password: </label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={userSignupData.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((show) => !show)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div className="grid">
              <label>Confirm Password: </label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={userSignupData.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((show) => !show)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-slate-600 hover:bg-slate-700 w-full text-white px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all block mx-auto mt-6">
              Sign Up
            </button>
          </form>

          <p className="my-4">
            Already have an account ?&nbsp;
            <Link
              to={"/login"}
              className="text-blue-800 hover:text-blue-900 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
