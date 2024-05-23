import { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../../common/role";

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (user?.role !== ROLE.ADMIN) {
        navigate("/");
      }
    },
    [user, navigate]
  );
  return (
    <div className="min-h-[calc(100vh-120px)] hidden md:flex">
      <aside className="bg-white min-h-full w-full max-w-60 aside-shadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer flex relative justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full mt-2"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        {/* NAVIGATION */}
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
