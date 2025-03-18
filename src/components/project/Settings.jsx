// src/CreateProject.js
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "../../common/Loader";

const ProjectStatus = {
  SETUP: "setup",
  LIVE: "live",
  COMPLETED: "completed",
  DEACTIVATED: "deactivated",
};

const ProjectSettings = ({ showAlert }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    status: ProjectStatus.ACTIVE, // Default value
    owner_id: localStorage.getItem("orgId"), // Assuming the owner ID is stored in local storage
  });

  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("projId");
  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchProject = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/get-project/${id}`,
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
      setFormData((prev) => {
        return {
          ...prev,
          ...res.data,
          start_date: dayjs(res.data.start_date).format("YYYY-MM-DD"),
          end_date: dayjs(res.data.end_date).format("YYYY-MM-DD"),
        };
      });

      // alert(res.message);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error); // Log the error for debugging
      alert("An unexpected error occurred. Please try again."); // Alert a generic error message
    } finally {
      setLoading(false); // Set loading to false in the finally block
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/update-project/${id}`, // Adjust the endpoint as needed
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        alert("Some error occurred while creating the project");
        return;
      }

      const res = await response.json();
      if (res.success) {
        const projectId = res.data.id;
        showAlert("Project updated successfully!", "success");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="z-10 w-full h-fit bg-background-primary flex flex-col justify-evenly items-center p-4 gap-y-[2rem] text-left overflow-auto">
          <div className="text-left w-full">
            <p className="font-sora font-bold text-left text-transparent bg-gradient-to-l from-gradient-left to-gradient-right bg-clip-text text-[2.5rem]">
              Project Settings
            </p>
            <p className="font-sora text-left font-medium text-[1.4rem]  max-w-[35rem] text-wrap">
              Manage your Project.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="flex flex-col px-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-text"
              >
                Project Name (max 25 characters)
              </label>
              <input
                id="name"
                type="text"
                className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                placeholder="Enter Project name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={25}
              />
            </div>
            <div className="flex flex-col px-5 h-20">
              <label
                className="block mb-2 text-sm font-medium text-text"
                htmlFor="description"
              >
                Project Description
              </label>
              <textarea
                id="description"
                type="text"
                className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                placeholder="Enter project description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col px-5">
              <label
                className="block mb-2 text-sm font-medium text-text"
                htmlFor="start_date"
              >
                Start Date
              </label>
              <input
                id="start_date"
                type="date"
                name="start_date"
                className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                placeholder="Enter start date"
                onChange={handleChange}
                value={formData.start_date}
                minLength={4}
                maxLength={10}
              />
            </div>
            <div className="flex flex-col px-5">
              <label
                className="block mb-2 text-sm font-medium text-text"
                htmlFor="end_date"
              >
                End Date
              </label>
              <input
                id="end_date"
                type="date"
                name="end_date"
                className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                placeholder="Enter end date"
                onChange={handleChange}
                value={formData.end_date}
                minLength={4}
                maxLength={10}
              />
            </div>
            <div className="flex flex-col  px-5">
              <label
                className="block mb-2 text-sm font-medium text-text"
                htmlFor="location"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                placeholder="Enter location"
                onChange={handleChange}
                value={formData.location}
                minLength={4}
                maxLength={10}
              />
            </div>
          </div>
          <div className="mt-6 flex gap-2 w-full px-5">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full text-white bg-background-secondary 
                      hover:bg-chart-background hover:ring-2 hover:outline-none 
                      hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center 
                      transition ease-in-out duration-150 mt-10 cursor-pointer"
            >
              Update Project
            </button>
            <button
              type="button"
              //   onClick={handleDelete}
              className="w-full text-white bg-background-secondary 
                      hover:bg-verify-error hover:ring-2 hover:outline-none 
                      hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center 
                      transition ease-in-out duration-150 mt-10 cursor-pointer"
            >
              Delete Project
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectSettings;
