import React, { useState } from "react";
import { handleError, handleSuccess } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">DUMMY PAGE ON LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
