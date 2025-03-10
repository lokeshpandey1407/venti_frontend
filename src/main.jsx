import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import AddApp from "./components/App/AddApp.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Navbar from "./common/Navbar.jsx";
import Signup from "./components/auth/Signup.jsx";
import CreateOrganization from "./components/organization/CreateOrganization.jsx";
import OrganizationPage from "./components/organization/OrganizationPage.jsx";
import CreateProject from "./components/project/CreateProject.jsx";
import ProjectPage from "./components/project/ProjectPage.jsx";
import Table from "./components/project/Table.jsx";
import ManageCategoryPage from "./components/project/category/ManageCategoryPage.jsx";
import ManageFormFields from "./components/project/formFields/ManageFormField.jsx";
import ManageCategoryFormFieldPage from "./components/project/category/ManageCategoryFormFieldPage.jsx";
import ManageAttendeePage from "./components/project/attendee/ManageAttendeePage.jsx";
import EventRegistration from "./components/project/attendee/UpdateAttendee/EventRegistration.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/apps/:projectId">
        <Route index element={<App />} />
        <Route
          path="/apps/:projectId/:experienceId/addApp"
          element={<AddApp />}
        />
        <Route
          path="/apps/:projectId/:experienceId/updateApp/:appId"
          element={<AddApp />}
        />
      </Route>
      <Route path="/organization/:id" element={<OrganizationPage />} />
      <Route path="/project/:id" element={<ProjectPage />} />
      <Route path="/createProject" element={<CreateProject />} />
      <Route path="/updateProject/:id" element={<CreateProject />} />
      <Route path="/addOrganization" element={<CreateOrganization />} />
      <Route
        path="/manageCategory/:projectId"
        element={<ManageCategoryPage />}
      />
      <Route
        path="/manageAttendee/:projectId"
        element={<ManageAttendeePage />}
      />
      <Route
        path="/manageFormFields/:projectId"
        element={<ManageFormFields />}
      />
      <Route
        path="/manageCategoryFields/:projectId"
        element={<ManageCategoryFormFieldPage />}
      />
      <Route
        path="/register-on-event/:projectId/:attendeeId"
        element={<EventRegistration />}
      />

      <Route path="/updateOrganization/:id" element={<CreateOrganization />} />
      <Route path="/demoTable" element={<Table />} />
    </Routes>
  </BrowserRouter>
);
