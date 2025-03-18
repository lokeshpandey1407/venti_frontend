import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import SideNav from "../../common/SideNav";
// import InviteList from "../components/dashboard/InviteList";
// import Emails from "../components/dashboard/Emails";
// import Analytics from "../components/dashboard/Analytics";
import NotFound from "../../common/NotFound";
import Loader from "../../common/Loader";

import TopHeader from "../../common/TopHeader";
import Home from "./home/Home";
import OrganizationPage from "../organization/OrganizationPage";
import ProjectPage from "../project/ProjectPage";
import Projects from "../project/Projects";
import OrgMembers from "../members/OrganizationMembers";
import OrganizationSetting from "../organization/OrganizationSetting";
import ManageAttendeePage from "../project/attendee/ManageAttendeePage";
import ManageCategoryPage from "../project/category/ManageCategoryPage";
import Apps from "../App/ExperienceApps";
import AddApp from "../App/AddApp";
import ManageCategoryFormFieldPage from "../project/category/ManageCategoryFormFieldPage";
import ManageFormFields from "../project/formFields/ManageFormField";
import ProjectSettings from "../project/Settings";
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

  const [organization, setOrganization] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("authUserId");
  const token = localStorage.getItem("authToken");

  const fetchOrganization = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/organization/get-organization-by-user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        alert("Some error occurred. Please try again");
      }

      const res = await response.json();
      setOrganization(res.data);
      if (res?.data.length > 0) localStorage.setItem("orgId", res.data[0].id);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error); // Log the error for debugging
      alert("An unexpected error occurred. Please try again."); // Alert a generic error message
    } finally {
      setLoading(false); // Set loading to false in the finally block
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  const isValidPath = (currentPath) => {
    const validPaths = [
      "/dashboard",
      "/dashboard/invitee",
      "/dashboard/projects",
      "/dashboard/form",
      "/dashboard/emails",
      "/dashboard/analytics",
      "/dashboard/experiences",
      "/dashboard/organization",
      "/dashboard/project",
      "/dashboard/members",
      "/dashboard/settings",
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

  //   if (!isValidPath(path)) {
  //     return <NotFound />;
  //   }

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
            <TopHeader organization={organization[0] || {}} />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    organization={organization[0] || {}}
                    showAlert={showAlert}
                  />
                }
              />
              <Route
                path="/project"
                element={
                  <Projects
                    organization={organization[0] || {}}
                    showAlert={showAlert}
                  />
                }
              />
              <Route
                path="/members"
                element={<OrgMembers showAlert={showAlert} />}
              />
              <Route
                path="/settings"
                element={<OrganizationSetting showAlert={showAlert} />}
              />
              <Route
                path="/organization/:id"
                element={<OrganizationPage showAlert={showAlert} />}
              />
              <Route
                path="/project/:projectId"
                element={<ProjectPage showAlert={showAlert} />}
              />

              <Route
                path="/project/:projectId/manageAttendee"
                element={<ManageAttendeePage showAlert={showAlert} />}
              />
              <Route
                path="/project/:projectId/manageCategory"
                element={<ManageCategoryPage showAlert={showAlert} />}
              />
              <Route
                path="/project/:projectId/apps"
                element={<Apps showAlert={showAlert} />}
              />
              <Route
                path="/project/:projectId/apps/:experienceId/updateApp/:appId"
                element={<AddApp showAlert={showAlert} />}
              />
              <Route
                path="/project/:projectId/apps/:experienceId/addApp"
                element={<AddApp showAlert={showAlert} />}
              />
              <Route
                path="/project/:projectId/manageFormFields"
                element={<ManageFormFields showAlert={showAlert} />}
              />
              <Route
                path="/project/:projectId/manageCategoryFields"
                element={<ManageCategoryFormFieldPage showAlert={showAlert} />}
              />
              <Route
                path="/project/:projectId/settings"
                element={<ProjectSettings showAlert={showAlert} />}
              />
              {/* <Route
                path="/invitee"
                element={
                  //   <InviteList showAlert={showAlert} setLoader={setLoader} />
                  <div>this is invitee route</div>
                }
              /> */}
              {/* <Route path="/emails" element={<div>this is email route</div>} /> */}
              {/* <Route
                path="/analytics"
                element={
                  // <Analytics showAlert={showAlert} />
                  <div>This is analytics page</div>
                }
              /> */}
              {/* <Route
                path="/experiences"
                element={
                  //   <ExperienceList
                  //     eventId={selectedEventId}
                  //     showAlert={showAlert}
                  //   />
                  <div>this is experiences list</div>
                }
              /> */}
              {/* <Route
                path="/experiences/:uniqueId/:experienceId"
                element={
                  // <Experiences showAlert={showAlert} />
                  <div>This is experience id page</div>
                }
              /> */}
            </Routes>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
