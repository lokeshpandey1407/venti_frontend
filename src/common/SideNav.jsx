import React from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.svg";

const SideNav = () => {
  const locationapp = useLocation();
  const path = locationapp.pathname;
  const navigate = useNavigate();

  const projectId = localStorage.getItem("projId");

  return (
    <div className="w-[5rem] lg:w-[14vw] max-w-[15rem] h-full z-10 bg-secondary flex flex-col justify-start items-center font-roboto">
      <div className="flex flex-col justify-start items-center gap-8 w-full h-full">
        <div className="w-full h-[6rem] flex justify-center items-center ">
          <NavLink
            to="/dashboard"
            className="text-transparent text-[2rem] bg-gradient-to-r from-[#FFF2D1] to-[#FF9F10] bg-clip-text font-bold mt-8"
          >
            <img src={logo} alt="logo" className="w-[3.8rem] lg:w-[8rem]" />
          </NavLink>
        </div>
        {projectId ? (
          <div className="w-full h-full flex flex-col justify-center lg:justify-start items-center gap-2 text-text-inactive font-medium text-ellipsis overflow-hidden ">
            <p className="hidden lg:block w-full text-left px-4">Project</p>

            <NavLink
              to={`/dashboard/project/${projectId}/apps`}
              className={({ isActive }) =>
                isActive
                  ? "bg-accent! text-text! w-[4.5rem]! lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                  : "bg-transparent! text-text-inactive! w-[4.5rem]! hover:bg-text/20! lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300  hover:text-text gap-2"
              }
              title="Experience"
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
              <p className="hidden lg:block">Experience</p>
            </NavLink>

            <NavLink
              to={`/dashboard/project/${projectId}/manageAttendee`}
              className={({ isActive }) =>
                isActive
                  ? "bg-accent! text-text! w-[4.5rem]! lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                  : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4.5rem]!  lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300  hover:text-text gap-2"
              }
              s
              title="Attendee"
            >
              {/* form svg  */}
              <svg
                className="w-[1.3rem]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3.46776C17.4817 4.20411 18.5 5.73314 18.5 7.5C18.5 9.26686 17.4817 10.7959 16 11.5322M18 16.7664C19.5115 17.4503 20.8725 18.565 22 20M2 20C3.94649 17.5226 6.58918 16 9.5 16C12.4108 16 15.0535 17.5226 17 20M14 7.5C14 9.98528 11.9853 12 9.5 12C7.01472 12 5 9.98528 5 7.5C5 5.01472 7.01472 3 9.5 3C11.9853 3 14 5.01472 14 7.5Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="hidden lg:block">Attendee</p>
            </NavLink>
            <NavLink
              to={`/dashboard/project/${projectId}/manageCategory`}
              className={({ isActive }) =>
                isActive
                  ? "bg-accent! text-text! w-[4.5rem]! lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                  : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4.5rem]!  lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:text-text gap-2"
              }
              title="Manage Categories"
            >
              {/* Invitee svg  */}
              <svg
                className="w-[1.3rem]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="hidden lg:block">Category</p>
            </NavLink>
            <NavLink
              to={`/dashboard/project/${projectId}/manageFormFields`}
              className={({ isActive }) =>
                isActive
                  ? "bg-accent! text-text! w-[4.5rem]! lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                  : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4.5rem]!  lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:text-text gap-2"
              }
              title="Organization settings"
            >
              <svg
                className="w-[1.3rem]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10H6.01M8 14H8.01M10 10H10.01M12 14H12.01M14 10H14.01M16 14H16.01M18 10H18.01M5.2 18H18.8C19.9201 18 20.4802 18 20.908 17.782C21.2843 17.5903 21.5903 17.2843 21.782 16.908C22 16.4802 22 15.9201 22 14.8V9.2C22 8.0799 22 7.51984 21.782 7.09202C21.5903 6.71569 21.2843 6.40973 20.908 6.21799C20.4802 6 19.9201 6 18.8 6H5.2C4.07989 6 3.51984 6 3.09202 6.21799C2.71569 6.40973 2.40973 6.71569 2.21799 7.09202C2 7.51984 2 8.07989 2 9.2V14.8C2 15.9201 2 16.4802 2.21799 16.908C2.40973 17.2843 2.71569 17.5903 3.09202 17.782C3.51984 18 4.0799 18 5.2 18Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="hidden lg:block">Fields</p>
            </NavLink>
            <NavLink
              to={`/dashboard/project/${projectId}/manageCategoryFields`}
              className={({ isActive }) =>
                isActive
                  ? "bg-accent! text-text! w-[4.5rem]! lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                  : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4.5rem]!  lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:text-text gap-2"
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
              <p className="hidden lg:block">Category Fields</p>
            </NavLink>
            <NavLink
              to={`/dashboard/project/${projectId}/settings`}
              className={({ isActive }) =>
                isActive
                  ? "bg-accent! text-text! w-[4.5rem]! lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                  : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4.5rem]!  lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:text-text gap-2"
              }
              title="Project settings"
            >
              <svg
                className="w-[1.3rem]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.7273 14.7273C18.6063 15.0015 18.5702 15.3056 18.6236 15.6005C18.6771 15.8954 18.8177 16.1676 19.0273 16.3818L19.0818 16.4364C19.2509 16.6052 19.385 16.8057 19.4765 17.0265C19.568 17.2472 19.6151 17.4838 19.6151 17.7227C19.6151 17.9617 19.568 18.1983 19.4765 18.419C19.385 18.6397 19.2509 18.8402 19.0818 19.0091C18.913 19.1781 18.7124 19.3122 18.4917 19.4037C18.271 19.4952 18.0344 19.5423 17.7955 19.5423C17.5565 19.5423 17.3199 19.4952 17.0992 19.4037C16.8785 19.3122 16.678 19.1781 16.5091 19.0091L16.4545 18.9545C16.2403 18.745 15.9682 18.6044 15.6733 18.5509C15.3784 18.4974 15.0742 18.5335 14.8 18.6545C14.5311 18.7698 14.3018 18.9611 14.1403 19.205C13.9788 19.4489 13.8921 19.7347 13.8909 20.0273V20.1818C13.8909 20.664 13.6994 21.1265 13.3584 21.4675C13.0174 21.8084 12.5549 22 12.0727 22C11.5905 22 11.1281 21.8084 10.7871 21.4675C10.4461 21.1265 10.2545 20.664 10.2545 20.1818V20.1C10.2475 19.7991 10.1501 19.5073 9.97501 19.2625C9.79991 19.0176 9.55521 18.8312 9.27273 18.7273C8.99853 18.6063 8.69437 18.5702 8.39947 18.6236C8.10456 18.6771 7.83244 18.8177 7.61818 19.0273L7.56364 19.0818C7.39478 19.2509 7.19425 19.385 6.97353 19.4765C6.7528 19.568 6.51621 19.6151 6.27727 19.6151C6.03834 19.6151 5.80174 19.568 5.58102 19.4765C5.36029 19.385 5.15977 19.2509 4.99091 19.0818C4.82186 18.913 4.68775 18.7124 4.59626 18.4917C4.50476 18.271 4.45766 18.0344 4.45766 17.7955C4.45766 17.5565 4.50476 17.3199 4.59626 17.0992C4.68775 16.8785 4.82186 16.678 4.99091 16.5091L5.04545 16.4545C5.25503 16.2403 5.39562 15.9682 5.4491 15.6733C5.50257 15.3784 5.46647 15.0742 5.34545 14.8C5.23022 14.5311 5.03887 14.3018 4.79497 14.1403C4.55107 13.9788 4.26526 13.8921 3.97273 13.8909H3.81818C3.33597 13.8909 2.87351 13.6994 2.53253 13.3584C2.19156 13.0174 2 12.5549 2 12.0727C2 11.5905 2.19156 11.1281 2.53253 10.7871C2.87351 10.4461 3.33597 10.2545 3.81818 10.2545H3.9C4.2009 10.2475 4.49273 10.1501 4.73754 9.97501C4.98236 9.79991 5.16883 9.55521 5.27273 9.27273C5.39374 8.99853 5.42984 8.69437 5.37637 8.39947C5.3229 8.10456 5.18231 7.83244 4.97273 7.61818L4.91818 7.56364C4.74913 7.39478 4.61503 7.19425 4.52353 6.97353C4.43203 6.7528 4.38493 6.51621 4.38493 6.27727C4.38493 6.03834 4.43203 5.80174 4.52353 5.58102C4.61503 5.36029 4.74913 5.15977 4.91818 4.99091C5.08704 4.82186 5.28757 4.68775 5.50829 4.59626C5.72901 4.50476 5.96561 4.45766 6.20455 4.45766C6.44348 4.45766 6.68008 4.50476 6.9008 4.59626C7.12152 4.68775 7.32205 4.82186 7.49091 4.99091L7.54545 5.04545C7.75971 5.25503 8.03183 5.39562 8.32674 5.4491C8.62164 5.50257 8.9258 5.46647 9.2 5.34545H9.27273C9.54161 5.23022 9.77093 5.03887 9.93245 4.79497C10.094 4.55107 10.1807 4.26526 10.1818 3.97273V3.81818C10.1818 3.33597 10.3734 2.87351 10.7144 2.53253C11.0553 2.19156 11.5178 2 12 2C12.4822 2 12.9447 2.19156 13.2856 2.53253C13.6266 2.87351 13.8182 3.33597 13.8182 3.81818V3.9C13.8193 4.19253 13.906 4.47834 14.0676 4.72224C14.2291 4.96614 14.4584 5.15749 14.7273 5.27273C15.0015 5.39374 15.3056 5.42984 15.6005 5.37637C15.8954 5.3229 16.1676 5.18231 16.3818 4.97273L16.4364 4.91818C16.6052 4.74913 16.8057 4.61503 17.0265 4.52353C17.2472 4.43203 17.4838 4.38493 17.7227 4.38493C17.9617 4.38493 18.1983 4.43203 18.419 4.52353C18.6397 4.61503 18.8402 4.74913 19.0091 4.91818C19.1781 5.08704 19.3122 5.28757 19.4037 5.50829C19.4952 5.72901 19.5423 5.96561 19.5423 6.20455C19.5423 6.44348 19.4952 6.68008 19.4037 6.9008C19.3122 7.12152 19.1781 7.32205 19.0091 7.49091L18.9545 7.54545C18.745 7.75971 18.6044 8.03183 18.5509 8.32674C18.4974 8.62164 18.5335 8.9258 18.6545 9.2V9.27273C18.7698 9.54161 18.9611 9.77093 19.205 9.93245C19.4489 10.094 19.7347 10.1807 20.0273 10.1818H20.1818C20.664 10.1818 21.1265 10.3734 21.4675 10.7144C21.8084 11.0553 22 11.5178 22 12C22 12.4822 21.8084 12.9447 21.4675 13.2856C21.1265 13.6266 20.664 13.8182 20.1818 13.8182H20.1C19.8075 13.8193 19.5217 13.906 19.2778 14.0676C19.0339 14.2291 18.8425 14.4584 18.7273 14.7273Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="hidden lg:block">Settings</p>
            </NavLink>
            <button
              className="mt-auto mb-10 border-2 border-red-400 p-2 rounded-lg cursor-pointer hover:bg-background-primary transition-colors duration-200 ease-in-out "
              onClick={() => {
                localStorage.removeItem("projId");
                navigate("/dashboard/project");
              }}
            >
              {"Exit Project"}
            </button>
          </div>
        ) : (
          <div className="w-full h-[15rem] flex flex-col justify-center lg:justify-start items-center gap-2 text-text-inactive font-medium text-ellipsis overflow-hidden">
            <p className="hidden lg:block w-full text-left px-4">Dashboard</p>
            <NavLink
              to="/dashboard/project"
              className={({ isActive }) =>
                isActive
                  ? "bg-accent! text-text! w-[4.5rem]! lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                  : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4.5rem]!  lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:text-text gap-2"
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
                  ? "bg-accent! text-text! w-[4.5rem]! lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                  : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4.5rem]!  lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:text-text gap-2"
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
                  ? "bg-accent! text-text! w-[4.5rem]! lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left! lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 gap-2"
                  : "bg-transparent! text-text-inactive! hover:bg-text/20! w-[4.5rem]!  lg:w-[90%]! h-[4rem]! lg:h-[2.5rem]! rounded-2xl! lg:rounded-full! text-left lg:px-3 flex lg:justify-start justify-center items-center transition ease-in-out duration-300 hover:text-text gap-2"
              }
              title="Organization settings"
            >
              <svg
                className="w-[1.3rem]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.7273 14.7273C18.6063 15.0015 18.5702 15.3056 18.6236 15.6005C18.6771 15.8954 18.8177 16.1676 19.0273 16.3818L19.0818 16.4364C19.2509 16.6052 19.385 16.8057 19.4765 17.0265C19.568 17.2472 19.6151 17.4838 19.6151 17.7227C19.6151 17.9617 19.568 18.1983 19.4765 18.419C19.385 18.6397 19.2509 18.8402 19.0818 19.0091C18.913 19.1781 18.7124 19.3122 18.4917 19.4037C18.271 19.4952 18.0344 19.5423 17.7955 19.5423C17.5565 19.5423 17.3199 19.4952 17.0992 19.4037C16.8785 19.3122 16.678 19.1781 16.5091 19.0091L16.4545 18.9545C16.2403 18.745 15.9682 18.6044 15.6733 18.5509C15.3784 18.4974 15.0742 18.5335 14.8 18.6545C14.5311 18.7698 14.3018 18.9611 14.1403 19.205C13.9788 19.4489 13.8921 19.7347 13.8909 20.0273V20.1818C13.8909 20.664 13.6994 21.1265 13.3584 21.4675C13.0174 21.8084 12.5549 22 12.0727 22C11.5905 22 11.1281 21.8084 10.7871 21.4675C10.4461 21.1265 10.2545 20.664 10.2545 20.1818V20.1C10.2475 19.7991 10.1501 19.5073 9.97501 19.2625C9.79991 19.0176 9.55521 18.8312 9.27273 18.7273C8.99853 18.6063 8.69437 18.5702 8.39947 18.6236C8.10456 18.6771 7.83244 18.8177 7.61818 19.0273L7.56364 19.0818C7.39478 19.2509 7.19425 19.385 6.97353 19.4765C6.7528 19.568 6.51621 19.6151 6.27727 19.6151C6.03834 19.6151 5.80174 19.568 5.58102 19.4765C5.36029 19.385 5.15977 19.2509 4.99091 19.0818C4.82186 18.913 4.68775 18.7124 4.59626 18.4917C4.50476 18.271 4.45766 18.0344 4.45766 17.7955C4.45766 17.5565 4.50476 17.3199 4.59626 17.0992C4.68775 16.8785 4.82186 16.678 4.99091 16.5091L5.04545 16.4545C5.25503 16.2403 5.39562 15.9682 5.4491 15.6733C5.50257 15.3784 5.46647 15.0742 5.34545 14.8C5.23022 14.5311 5.03887 14.3018 4.79497 14.1403C4.55107 13.9788 4.26526 13.8921 3.97273 13.8909H3.81818C3.33597 13.8909 2.87351 13.6994 2.53253 13.3584C2.19156 13.0174 2 12.5549 2 12.0727C2 11.5905 2.19156 11.1281 2.53253 10.7871C2.87351 10.4461 3.33597 10.2545 3.81818 10.2545H3.9C4.2009 10.2475 4.49273 10.1501 4.73754 9.97501C4.98236 9.79991 5.16883 9.55521 5.27273 9.27273C5.39374 8.99853 5.42984 8.69437 5.37637 8.39947C5.3229 8.10456 5.18231 7.83244 4.97273 7.61818L4.91818 7.56364C4.74913 7.39478 4.61503 7.19425 4.52353 6.97353C4.43203 6.7528 4.38493 6.51621 4.38493 6.27727C4.38493 6.03834 4.43203 5.80174 4.52353 5.58102C4.61503 5.36029 4.74913 5.15977 4.91818 4.99091C5.08704 4.82186 5.28757 4.68775 5.50829 4.59626C5.72901 4.50476 5.96561 4.45766 6.20455 4.45766C6.44348 4.45766 6.68008 4.50476 6.9008 4.59626C7.12152 4.68775 7.32205 4.82186 7.49091 4.99091L7.54545 5.04545C7.75971 5.25503 8.03183 5.39562 8.32674 5.4491C8.62164 5.50257 8.9258 5.46647 9.2 5.34545H9.27273C9.54161 5.23022 9.77093 5.03887 9.93245 4.79497C10.094 4.55107 10.1807 4.26526 10.1818 3.97273V3.81818C10.1818 3.33597 10.3734 2.87351 10.7144 2.53253C11.0553 2.19156 11.5178 2 12 2C12.4822 2 12.9447 2.19156 13.2856 2.53253C13.6266 2.87351 13.8182 3.33597 13.8182 3.81818V3.9C13.8193 4.19253 13.906 4.47834 14.0676 4.72224C14.2291 4.96614 14.4584 5.15749 14.7273 5.27273C15.0015 5.39374 15.3056 5.42984 15.6005 5.37637C15.8954 5.3229 16.1676 5.18231 16.3818 4.97273L16.4364 4.91818C16.6052 4.74913 16.8057 4.61503 17.0265 4.52353C17.2472 4.43203 17.4838 4.38493 17.7227 4.38493C17.9617 4.38493 18.1983 4.43203 18.419 4.52353C18.6397 4.61503 18.8402 4.74913 19.0091 4.91818C19.1781 5.08704 19.3122 5.28757 19.4037 5.50829C19.4952 5.72901 19.5423 5.96561 19.5423 6.20455C19.5423 6.44348 19.4952 6.68008 19.4037 6.9008C19.3122 7.12152 19.1781 7.32205 19.0091 7.49091L18.9545 7.54545C18.745 7.75971 18.6044 8.03183 18.5509 8.32674C18.4974 8.62164 18.5335 8.9258 18.6545 9.2V9.27273C18.7698 9.54161 18.9611 9.77093 19.205 9.93245C19.4489 10.094 19.7347 10.1807 20.0273 10.1818H20.1818C20.664 10.1818 21.1265 10.3734 21.4675 10.7144C21.8084 11.0553 22 11.5178 22 12C22 12.4822 21.8084 12.9447 21.4675 13.2856C21.1265 13.6266 20.664 13.8182 20.1818 13.8182H20.1C19.8075 13.8193 19.5217 13.906 19.2778 14.0676C19.0339 14.2291 18.8425 14.4584 18.7273 14.7273Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="hidden lg:block">Settings</p>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
