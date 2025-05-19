import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const NewUserForm = () => {
  const [gander, setgander] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const handlePost = (e) => {
    e.preventDefault();

    const frm = e.target;

    const newser = new FormData(frm);
    const users = Object.fromEntries(newser.entries());

    fetch("https://optional-task-server.vercel.app/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Added Successfully!",
          icon: "success",
          draggable: true,
          timer: 1500,
        });

        console.log("after add data", data);
        e.target.reset();
        navigate("/alluser");
      });
  };
  return (
    <div className="flex items-center justify-center w-11/12 mx-auto py-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-2">New User</h2>
        <p className="text-center text-gray-500 mb-6">
          Use the below form to create a new account
        </p>

        <form onSubmit={handlePost} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="flex text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                name="name"
                type="text"
                placeholder="Jaya Dakhale"
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-1 flex">
              Email
            </label>
            <div className="relative">
              <MdEmail className="absolute top-3 left-3 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="jaya@gmail.com"
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          {/* Gender Field */}
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
                  checked={gander === "Male"}
                  onChange={(e) => setgander(e.target.value)}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="radio radio-sm radio-primary"
                  value=" Female"
                  checked={gander === " Female"}
                  onChange={(e) => setgander(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>

          {/* Status Field */}
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
                  value=" Active"
                  checked={status === " Active"}
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

          {/* Submit Button */}
          <div>
            <button className="btn btn-success w-full mt-4">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;
