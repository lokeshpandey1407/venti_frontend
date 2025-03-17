import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const SideNav = () => {
  const locationapp = useLocation();
  const path = locationapp.pathname;
  console.log(path);

  return (
    <div className="w-[5rem] lg:w-[14vw] max-w-[15rem] h-full z-10 bg-secondary flex flex-col justify-start items-center font-roboto">
      <div className="flex flex-col justify-start items-center gap-8 w-full">
        <div className="w-full h-[6rem] flex justify-center items-center ">
          <NavLink
            to="/dashboard"
            className="text-transparent text-[2rem] bg-gradient-to-r from-[#FFF2D1] to-[#FF9F10] bg-clip-text font-bold mt-8"
          >
            {/* <p className='hidden lg:block'>Venti</p> */}
            {/* <p className='block lg:hidden'>VTI</p> */}
            <img src={logo} alt="logo" className="w-[3.8rem] lg:w-[8rem]" />
          </NavLink>
        </div>
        <div className="w-full h-[15rem] flex flex-col justify-center lg:justify-start items-center gap-2 text-text-inactive font-medium text-ellipsis overflow-hidden">
          <p className="hidden lg:block w-full text-left px-4">Dashboard</p>
          <NavLink
            to="/dashboard/project"
            className={({ isActive }) =>
              isActive
                ? "bg-accent! text-text! w-[4rem]! lg:w-[85%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-6 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4rem]!  lg:w-[85%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full text-left lg:px-6 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:bg-background hover:text-text gap-2"
            }
            s
            title="project"
          >
            {/* form svg  */}
            <svg
              viewBox="0 0 48 48"
              className="w-[1.2rem]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <rect
                  x="6"
                  y="6"
                  width="36"
                  height="36"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></rect>{" "}
                <path
                  d="M6 14H40"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M30 22H42"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M30 30H42"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M23 22H24"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M23 30H24"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M14 6L14 42"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <p className="hidden lg:block">Projects</p>
          </NavLink>
          <NavLink
            to="/dashboard/members"
            className={({ isActive }) =>
              isActive
                ? "bg-accent! text-text! w-[4rem]! lg:w-[85%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-6 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4rem]!  lg:w-[85%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full text-left lg:px-6 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:bg-background hover:text-text gap-2"
            }
            title="Manage members"
          >
            {/* Invitee svg  */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-[2rem] lg:w-[1.3rem]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.83333 11.8333C8.44167 11.8333 9.75 10.525 9.75 8.91667C9.75 7.30833 8.44167 6 6.83333 6C5.225 6 3.91667 7.30833 3.91667 8.91667C3.91667 10.525 5.225 11.8333 6.83333 11.8333ZM21 15.3333V12.8333H23.5V11.1667H21V8.66666H19.3333V11.1667H16.8333V12.8333H19.3333V15.3333H21ZM6.83333 13.2917C4.88333 13.2917 1 14.2667 1 16.2083V17.6667H12.6667V16.2083C12.6667 14.2667 8.78333 13.2917 6.83333 13.2917ZM6.83333 14.9583C5.34166 14.9583 3.65 15.5167 2.95 16H10.7167C10.0167 15.5167 8.325 14.9583 6.83333 14.9583ZM8.08333 8.91667C8.08333 8.225 7.525 7.66667 6.83333 7.66667C6.14167 7.66667 5.58333 8.225 5.58333 8.91667C5.58333 9.60833 6.14167 10.1667 6.83333 10.1667C7.525 10.1667 8.08333 9.60833 8.08333 8.91667ZM11 11.8333C12.6083 11.8333 13.9167 10.525 13.9167 8.91667C13.9167 7.30833 12.6083 6 11 6C10.8 6 10.6 6.01667 10.4083 6.05833C11.0417 6.84167 11.4167 7.83333 11.4167 8.91667C11.4167 10 11.025 10.9833 10.3917 11.7667C10.5917 11.8083 10.7917 11.8333 11 11.8333ZM14.3333 16.2083C14.3333 15.075 13.7667 14.1917 12.9333 13.5167C14.8 13.9083 16.8333 14.8 16.8333 16.2083V17.6667H14.3333V16.2083Z"
                  fill="currentColor"
                ></path>{" "}
              </g>
            </svg>
            <p className="hidden lg:block">Members</p>
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive
                ? "bg-accent! text-text! w-[4rem]! lg:w-[85%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-6 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4rem]!  lg:w-[85%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full text-left lg:px-6 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:bg-background hover:text-text gap-2"
            }
            title="Organization settings"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[1.3rem]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></rect>{" "}
              </g>
            </svg>
            <p className="hidden lg:block">Settings</p>
          </NavLink>
          {/* <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              isActive
                ? "bg-accent text-text w-[4rem] lg:w-[85%] h-[4rem] lg:h-[2.5rem] rounded-2xl lg:rounded-full text-left lg:px-6 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                : "bg-transparent text-text-inactive hover:bg-text/20 w-[4rem]  lg:w-[85%] h-[4rem] lg:h-[2.5rem] rounded-2xl lg:rounded-full text-left lg:px-6 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:bg-background hover:text-text gap-2"
            }
            title="Analytics"
          >
            <svg
              fill="currentColor"
              className="w-[1.2rem]"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M746.667 106.667H1173.33V1493.33H746.667V106.667ZM533.333 533.333H106.667V1493.33H533.333V533.333ZM1920 1706.67H0V1824H1920V1706.67ZM1813.33 746.667H1386.67V1493.33H1813.33V746.667Z"></path>{" "}
              </g>
            </svg>
            <p className="hidden lg:block">Analytics</p>
          </NavLink>
          <NavLink
            to="/dashboard/experiences"
            className={({ isActive }) =>
              isActive
                ? "bg-accent text-text w-[4rem] lg:w-[85%] h-[4rem] lg:h-[2.5rem] rounded-2xl lg:rounded-full text-left lg:px-6 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                : "bg-transparent text-text-inactive hover:bg-text/20 w-[4rem]  lg:w-[85%] h-[4rem] lg:h-[2.5rem] rounded-2xl lg:rounded-full text-left lg:px-6 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:bg-background hover:text-text gap-2"
            }
            title="Analytics"
          >
            <svg
              fill="currentColor"
              className="w-[1.2rem]"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 485.238 485.238"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M229.958,23.812l-71.72,18.363l-11.521-17.281l-3.648-0.653L1.06,127.498L0,129.575v329.284l2.57,2.568h95.941 l2.569-2.568V130.885L232.03,28.398L229.958,23.812z"></path>{" "}
                    <path d="M352.729,23.812l-71.72,18.363l-11.521-17.281l-3.649-0.653L123.832,137.498l-1.059,2.077v319.284l2.57,2.568h95.94 l2.569-2.568V130.885l130.95-102.486L352.729,23.812z"></path>{" "}
                    <path d="M482.106,24.654l-77.974,17.521l-11.521-17.281l-3.648-0.653l-142.01,113.257l-1.06,2.077v319.284l2.57,2.568h95.94 l1.237-1.238l0.32,0.42l137.924-105.226l1.012-2.039l0.34-326.18L482.106,24.654z M466.14,55.739l0.016,287.09l-119.179,92.01 V145.261L466.14,55.739z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
            <p className="hidden lg:block">Experiences</p>
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
