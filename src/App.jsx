import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AddApp from "./components/App/AddApp.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/auth/Login.jsx";
import "./App.css";
import "@ionic/react/css/core.css";
import { IonApp, setupIonicReact } from "@ionic/react";

/* Basic CSS for apps built with Ionic */
// import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
// import useNode from "./hooks/useNode";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
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
import AddUpdatePermission from "./components/permission/AddUpdatePermission.jsx";
import AddUpdaterole from "./components/role/AddUpdateRole.jsx";
import ManageRolePermissions from "./components/role/ManageRole&Permissions.jsx";
import Alert from "./common/Alert.jsx";
import AppHomepage from "./components/App/AppHomepage";
import HomePage from "./components/HomePage.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

setupIonicReact();

const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  useEffect(() => {
    console.log(
      `%c███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗██╗  ██╗ ██████╗ 
██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝██║  ██║██╔═══██╗
█████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗███████║██║   ██║
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║██╔══██║██║▄▄ ██║
███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║██║  ██║╚██████╔╝
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝ ╚══▀▀═╝ 
Made with ❤ by HSM - A Digital Jalebi Solution`,
      "background: #222; color: #bada55"
    );
  }, []);

  return (
    <IonApp>
      <div className="text-center h-[100%] bg-background">
        <Alert alert={alert} setAlert={setAlert} />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route
              path="/dashboard/*"
              element={<Dashboard showAlert={showAlert} />}
              end
            />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route
              path="/permission"
              element={<AddUpdatePermission showAlert={showAlert} />}
            />
            <Route
              path="/role"
              element={<AddUpdaterole showAlert={showAlert} />}
            />
            <Route
              path="/manageRolePermission"
              element={<ManageRolePermissions showAlert={showAlert} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route path="/apps/:projectId">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <AppHomepage showAlert={showAlert} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/apps/:projectId/:experienceId/addApp"
                element={
                  <ProtectedRoute>
                    <AddApp showAlert={showAlert} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/apps/:projectId/:experienceId/updateApp/:appId"
                element={
                  <ProtectedRoute>
                    <AddApp showAlert={showAlert} />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/organization/:id"
              element={
                <ProtectedRoute>
                  <OrganizationPage showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/:id"
              element={
                <ProtectedRoute>
                  <ProjectPage showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createProject"
              element={
                <ProtectedRoute>
                  <CreateProject showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateProject/:id"
              element={
                <ProtectedRoute>
                  <CreateProject showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addOrganization"
              element={
                <ProtectedRoute>
                  <CreateOrganization showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manageCategory/:projectId"
              element={
                <ProtectedRoute>
                  <ManageCategoryPage showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manageAttendee/:projectId"
              element={
                <ProtectedRoute>
                  <ManageAttendeePage showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manageFormFields/:projectId"
              element={
                <ProtectedRoute>
                  <ManageFormFields showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manageCategoryFields/:projectId"
              element={
                <ProtectedRoute>
                  <ManageCategoryFormFieldPage showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register-on-event/:projectId/:attendeeId"
              element={<EventRegistration showAlert={showAlert} />}
            />
            <Route path="/ThankYouScreen" element={<ThankYouScreen />} />

            <Route
              path="/updateOrganization/:id"
              element={
                <ProtectedRoute>
                  <CreateOrganization showAlert={showAlert} />
                </ProtectedRoute>
              }
            />
            <Route path="/demoTable" element={<Table />} />
          </Routes>
        </BrowserRouter>
      </div>
    </IonApp>
  );
};

export default App;
