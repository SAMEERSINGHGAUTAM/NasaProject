import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userIPAddress, setUserIPAddress] = useState("");

  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIPAddress(data.ip);
        console.log("User location fetched successfully");
      } catch (error) {
        console.log("Failed to fetch user location:", error.message);
      }
    };
    fetchUserIP();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-center text-xl font-bold">
        Your IP Address: <span>{userIPAddress}</span>
      </h2>
    </div>
  );
};

export default Profile;
