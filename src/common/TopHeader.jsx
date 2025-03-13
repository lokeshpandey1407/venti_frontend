import React, { useEffect, useState } from "react";
import PlaceholderSVG from "../assets/placeholder.svg";
import { useNavigate } from "react-router-dom";

const TopHeader = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);

    // if (!storedToken) {
    //   navigate("/login");
    // }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUserId");
    setToken(null);
    navigate("/login");
  };
  return (
    <header className="flex h-[3rem] w-full justify-end py-[2rem] px-[3rem] items-center bg-background/30">
      <div className="flex justify-center items-center gap-4">
        <p className="font-semibold text-text-inactive text-[0.9rem] uppercase">
          {localStorage.getItem("authUserId")}
        </p>
        <div className="bg-white/5 rounded-full w-[2.5rem] aspect-square flex justify-center items-center overflow-hidden">
          <img
            className="object-contain"
            src={PlaceholderSVG}
            alt="place_holder"
          />
        </div>

        <button
          className="font-semibold text-text-inactive text-[0.9rem] uppercase px-4 py-2 rounded-md bg-white/10 transition ease-in-out duration-150 hover:bg-white/30 hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
