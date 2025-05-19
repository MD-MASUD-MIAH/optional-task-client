import { useState } from "react";
import { FaEdit, FaTimes, FaUserPlus } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Alluser = () => {
  const insildata = useLoaderData();

  const [users, setUsers] = useState(insildata);

  const handleDelte = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://optional-task-server.vercel.app/user/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const ramidata = users.filter((res) => res._id !== id);
              setUsers(ramidata);

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            console.log("delelte", data);
          });
      }
    });
  };

  return (
    <div className="min-h-scree py-10 ">
      {/* Header */}
      <div className="bg-green-400 text-center py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          User Management System
        </h1>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col items-center">
        {/* New User Button */}
        <div className="self-start mb-4">
          <Link
            to="/adduser"
            className="btn btn-sm btn-outline btn-primary shadow-md"
          >
            Add New User <FaUserPlus className="ml-2" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="table w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>@Email</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} user={user}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td className="text-blue-600">{user.email}</td>
                  <td>{user.gender}</td>
                  <td className="text-red-500 font-semibold">{user.status}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-xs btn-ghost text-purple-600"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelte(user._id)}
                        className="btn btn-xs btn-ghost text-purple-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-10 text-red-500 text-sm">masudd424@gmail.com</div>
      </div>
    </div>
  );
};

export default Alluser;
