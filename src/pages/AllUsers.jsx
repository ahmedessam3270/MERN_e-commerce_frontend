import { useEffect, useState } from "react";
import summaryApi from "../../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

function AllUsers() {
  const [allUsersData, setAllUsersData] = useState([]);
  const [openUpdateUserRole, setOpenUpdateUserRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    _id: "",
    role: "",
  });
  async function getAllUsersData() {
    const dataFetched = await fetch(summaryApi.allUsers.url, {
      method: summaryApi.allUsers.method,
      credentials: "include",
    });

    const dataResponse = await dataFetched.json();
    if (dataResponse.success) {
      setAllUsersData(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  }

  useEffect(function () {
    getAllUsersData();
  }, []);
  return (
    <div className="bg-white pb-4">
      <table className="w-full user-table">
        <thead>
          <tr className="bg-slate-950 text-white">
            <th>Serial No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsersData.map((el, idx) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="bg-green-200 p-2 rounded-full hover:bg-green-400 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateUserRole((open) => !open);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateUserRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateUserRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          getAllUsersData={getAllUsersData}
        />
      )}
    </div>
  );
}

export default AllUsers;
