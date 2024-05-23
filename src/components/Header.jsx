import Logo from "./Logo";
import Search from "./Search";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import ROLE from "../../common/role";
import Context from "../context";
function Header() {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productsInCartCount } = useContext(Context);

  async function handleLogout() {
    const logoutData = await fetch(summaryApi.logout_user.url, {
      method: summaryApi.logout_user.method,
      credentials: "include",
    });
    const dataJson = await logoutData.json();
    if (dataJson.success) {
      toast.success(dataJson.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (dataJson.error) {
      toast.error(dataJson.message);
    }
  }

  return (
    <header className="h-16 shadow-md bg-white fixed z-40 w-full">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo width={90} height={50} />
          </Link>
        </div>

        <Search />

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer flex relative justify-center"
                onClick={() => setMenuDisplay((display) => !display)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded hidden md:block">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hover:bg-slate-100 p-2 "
                      onClick={() => setMenuDisplay((display) => !display)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-slate-600 text-white w-5 h-5 flex rounded-full p-1 items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{productsInCartCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-slate-600 hover:bg-slate-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-slate-600 hover:bg-slate-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
