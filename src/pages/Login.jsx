import { useContext, useState } from "react";
import loginIcon from "../asset/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../../common";
import { toast } from "react-toastify";
import Context from "../context/index";
function Login() {
  const navigate = useNavigate();

  const { fetchUserDetails, fetchUserProductsInCartCount } =
    useContext(Context);

  const [showPassword, setShowPassword] = useState(false);
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });

  function handleOnChange(e) {
    const { name, value } = e.target;

    setUserLoginData((CurrUserData) => {
      return {
        ...CurrUserData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const dataResponse = await fetch(summaryApi.signIn.url, {
      method: summaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userLoginData),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserProductsInCartCount();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  }

  console.log("data login", userLoginData);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="Login icon" />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={userLoginData.email}
                  onChange={handleOnChange}
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
                  value={userLoginData.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((show) => !show)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-blue-900"
              >
                Forgot password ?
              </Link>
            </div>

            <button className="bg-slate-600 hover:bg-slate-700 w-full text-white px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all block mx-auto mt-6">
              Login
            </button>
          </form>

          <p className="my-4">
            Don&apos;t have an account ?&nbsp;
            <Link
              to={"/sign-up"}
              className="text-blue-800 hover:text-blue-900 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
