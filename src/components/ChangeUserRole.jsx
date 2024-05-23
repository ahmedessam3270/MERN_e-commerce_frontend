import { useState } from "react";
import ROLE from "../../common/role";
import { IoMdClose } from "react-icons/io";
import summaryApi from "../../common";
import { toast } from "react-toastify";
function ChangeUserRole({
  name,
  email,
  role,
  onClose,
  userId,
  getAllUsersData,
}) {
  const [userRole, setUserRole] = useState(role);

  function handleSelectChange(e) {
    setUserRole(e.target.value);
    console.log(e.target.value);
  }

  async function UpdateUserRole() {
    const fetchedResponse = await fetch(summaryApi.updateUser.url, {
      method: summaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchedResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      getAllUsersData();
    }
    console.log("response data", responseData);
  }
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className="pb-4 textlg font-medium">Change User Role</h2>
        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <div className="flex items-center justify-between">
          <p>Role: </p>
          <select
            className="border px-4 py-1 my-4"
            value={userRole}
            onChange={handleSelectChange}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-slate-600 hover:bg-slate-700 text-white"
          onClick={UpdateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
}

export default ChangeUserRole;
