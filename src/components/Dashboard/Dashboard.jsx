import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import SideNav from "../../common/SideNav";
// import InviteList from "../components/dashboard/InviteList";
// import Emails from "../components/dashboard/Emails";
// import Analytics from "../components/dashboard/Analytics";
import NotFound from "../../common/NotFound";
import Loader from "../../common/Loader";

import TopHeader from "../../common/TopHeader";
import Home from "../home/Home";
// import Experiences from "../components/dashboard/Experiences";
// import Main from "../components/dashboard/Main";
// import Modal from "../components/dashboard/global/Modal";
// import ExperienceList from "../components/dashboard/ExperienceList";

const Dashboard = (props) => {
  const { showAlert } = props;
  const locationapp = useLocation();
  const path = locationapp.pathname;

  const [data, setData] = useState([]);
  const [dataSent, setDataSent] = useState([]);
  const [badgeData, setBadgeData] = useState([]);
  const [failedData, setFailedData] = useState([]);

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [userEvents, setUserEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [open, setOpen] = useState(false);

  const [eventName, setEventName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventId, setEventId] = useState("");
  const [eventIdAvailable, setEventIdAvailable] = useState(null);
  const [eventIdError, setEventIdError] = useState("");

  const isValidPath = (currentPath) => {
    const validPaths = [
      "/dashboard",
      "/dashboard/invitee",
      "/dashboard/form",
      "/dashboard/emails",
      "/dashboard/analytics",
      "/dashboard/experiences",
      "/dashboard/main",
    ];

    if (validPaths.includes(currentPath)) {
      return true;
    }

    // Check for dynamic routes
    if (currentPath.startsWith("/dashboard/experiences/")) {
      const parts = currentPath.split("/");
      return parts.length === 5; // /dashboard/experiences/:uniqueId/:experienceId
    }

    return false;
  };

  if (!isValidPath(path)) {
    return <NotFound />;
  }

  return (
    <>
      <div className="flex h-[100%] w-full">
        <div className="block">
          <SideNav />
        </div>
        {loader ? (
          <Loader />
        ) : (
          <div className="h-full w-full flex flex-col justify-start items-start text-text bg-gradient-to-b from-primary to-primary-grad">
            <TopHeader />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/invitee"
                element={
                  //   <InviteList showAlert={showAlert} setLoader={setLoader} />
                  <div>this is invitee route</div>
                }
              />
              <Route path="/emails" element={<div>this is email route</div>} />
              <Route
                path="/analytics"
                element={
                  // <Analytics showAlert={showAlert} />
                  <div>This is analytics page</div>
                }
              />
              <Route
                path="/experiences"
                element={
                  //   <ExperienceList
                  //     eventId={selectedEventId}
                  //     showAlert={showAlert}
                  //   />
                  <div>this is experiences list</div>
                }
              />
              <Route
                path="/experiences/:uniqueId/:experienceId"
                element={
                  // <Experiences showAlert={showAlert} />
                  <div>This is experience id page</div>
                }
              />
            </Routes>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
