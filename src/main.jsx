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
import ThankYouScreen from "./components/project/attendee/UpdateAttendee/ThankyouPage.jsx";
import ProtectedRoute from "./common/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/apps/:projectId">
        <Route
          index
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apps/:projectId/:experienceId/addApp"
          element={
            <ProtectedRoute>
              <AddApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apps/:projectId/:experienceId/updateApp/:appId"
          element={
            <ProtectedRoute>
              <AddApp />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/organization/:id"
        element={
          <ProtectedRoute>
            <OrganizationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:id"
        element={
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/createProject"
        element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updateProject/:id"
        element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addOrganization"
        element={
          <ProtectedRoute>
            <CreateOrganization />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manageCategory/:projectId"
        element={
          <ProtectedRoute>
            <ManageCategoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manageAttendee/:projectId"
        element={
          <ProtectedRoute>
            <ManageAttendeePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manageFormFields/:projectId"
        element={
          <ProtectedRoute>
            <ManageFormFields />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manageCategoryFields/:projectId"
        element={
          <ProtectedRoute>
            <ManageCategoryFormFieldPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register-on-event/:projectId/:attendeeId"
        element={<EventRegistration />}
      />
      <Route path="/ThankYouScreen" element={<ThankYouScreen />} />

      <Route
        path="/updateOrganization/:id"
        element={
          <ProtectedRoute>
            <CreateOrganization />
          </ProtectedRoute>
        }
      />
      <Route path="/demoTable" element={<Table />} />
    </Routes>
  </BrowserRouter>
);
