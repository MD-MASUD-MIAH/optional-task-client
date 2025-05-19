import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Updateuser = () => {
  const data = useLoaderData();
  const { _id } = data;
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setGender(data.gender?.trim() || "");
      setStatus(data.status?.trim() || "");
    }
  }, [data]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;
    // const updateUser = {
    //   name: form.name.value,
    //   email: form.email.value,
    //   gender,
    //   status
    // };

    const user = new FormData(form);

    const update = Object.fromEntries(user.entries());

    fetch(`https://optional-task-server.vercel.app/user/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Coffee Updated!",
            icon: "success",
            draggable: true,
            timer: 1500,
          });

          navigate("/alluser");
        }
        console.log("after update", data);
      });

    // Send to backend if needed
  };

  return (
    <div className="flex items-center justify-center w-11/12 mx-auto py-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-2">Update User</h2>
        <p className="text-center text-gray-500 mb-6">
          Use the below form to Update account
        </p>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Name */}
          <div>
            <label className="flex text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                defaultValue={data.name}
                name="name"
                type="text"
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex">
              Email
            </label>
            <div className="relative">
              <MdEmail className="absolute top-3 left-3 text-gray-400" />
              <input
                name="email"
                type="email"
                defaultValue={data.email}
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="flex text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="radio radio-sm radio-primary"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="radio radio-sm radio-primary"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="flex text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  className="radio radio-sm radio-success"
                  value="Active"
                  checked={status === "Active"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                Active
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  className="radio radio-sm radio-success"
                  value="Inactive"
                  checked={status === "Inactive"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                Inactive
              </label>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button className="btn btn-success w-full mt-4">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updateuser;
