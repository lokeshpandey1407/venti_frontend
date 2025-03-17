import React, { useEffect, useState } from "react";
import PlaceholderSVG from "../assets/placeholder.svg";
import { useNavigate } from "react-router-dom";

const TopHeader = ({ organization }) => {
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
    localStorage.removeItem("authEmail");
    setToken(null);
    navigate("/login");
  };
  return (
    <header className="flex h-[3rem] w-full justify-between items-center py-[2rem] px-[3rem] bg-background/30 ">
      <div className="flex w-full justify-between items-center gap-4">
        <div>
          <label htmlFor="organization" className="text-sm">
            {/* Select Organization */}
          </label>
          <select
            id="organization"
            className=" px-2 flex h-10 w-[12rem] rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
          >
            <option value={organization.id} className="text-black">
              {organization.name}
            </option>
          </select>
        </div>
        <div className="flex flex-row items-center gap-4">
          <p className="font-semibold text-text-inactive text-[0.9rem] uppercase">
            {localStorage.getItem("authEmail")}
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
      </div>
    </header>
  );
};

export default TopHeader;
