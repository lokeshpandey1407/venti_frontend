// src/OrganizationPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrganizationPage = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [dropdown, setDropdown] = useState(false);
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("authUserId");

  const fetchOrganization = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/organization/get-organizations/${id}`,
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
      // alert(res.message);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error); // Log the error for debugging
      alert("An unexpected error occurred. Please try again."); // Alert a generic error message
    } finally {
      setLoading(false); // Set loading to false in the finally block
    }
  };

  const fetchUserProjects = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/get-projects-by-user/${userId}`,
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
      setProjects(res.data);
      // alert(res.message);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error); // Log the error for debugging
      alert("An unexpected error occurred. Please try again."); // Alert a generic error message
    } finally {
      setLoading(false); // Set loading to false in the finally block
    }
  };

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };
  const handleCreateProject = () => {
    navigate("/createProject"); // Navigate to the project creation page
  };

  useEffect(() => {
    fetchOrganization();
    fetchUserProjects();
  }, []);

  return (
    <div className="min-h-150 flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-black shadow-md rounded-lg p-6 w-full max-w-full">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Organization Information
        </h1>
        <p className="text-white mb-2">
          <strong>Name:</strong> {organization.name}
        </p>
        <p className="text-white mb-2">
          <strong>Description:</strong> {organization.description}
        </p>
        <p className="text-white mb-2">
          <strong>Address:</strong> {organization.address}
        </p>
        <p className="text-white mb-2">
          <strong>Phone:</strong> {organization.phone}
        </p>

        <button
          className=" cursor-pointer mt-4 w-auto px-2 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          onClick={() => navigate(`/updateOrganization/${organization.id}`)}
        >
          Update Organization
        </button>
      </div>
      <h2 className="text-xl">Current Projects</h2>
      <div className="flex flex-row gap-2 flex-wrap mt-10">
        {projects.map((project, index) => {
          return (
            <div key={index}>
              <button
                className="min-h-10 min-w-10 p-3 bg-green-400 rounded-lg cursor-pointer"
                onClick={() => {
                  // handleDropdown();
                  navigate(`/project/${project.id}`);
                }}
              >
                {project.name}
              </button>
              {dropdown && (
                <div
                  id="dropdown"
                  className="flex flex-col bg-gray-300 rounded-lg mt-1 overflow-hidden"
                >
                  <button
                    className="hover:bg-gray-500 cursor-pointer h-10 px-1"
                    onClick={() => navigate(`/updateProject/${project.id}`)}
                  >
                    Update Project
                  </button>
                  <button
                    className="hover:bg-gray-500 cursor-pointer h-10 px-1"
                    onClick={() => {
                      navigate(`/apps/${project.id}`);
                    }}
                  >
                    Add Experience Apps
                  </button>
                  <button className="hover:bg-gray-500 cursor-pointer h-10 px-1">
                    Delete Project
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={handleCreateProject}
        className=" cursor-pointer mt-4 w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Create Project
      </button>
    </div>
  );
};

export default OrganizationPage;
