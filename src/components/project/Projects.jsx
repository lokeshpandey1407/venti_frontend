import { useEffect, useState } from "react";
import CreateOrganization from "../organization/CreateOrganization";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";
import Modal from "../../common/Modal";
const ProjectStatus = {
  SETUP: "setup",
  LIVE: "live",
  COMPLETED: "completed",
  DEACTIVATED: "deactivated",
};

const Projects = ({ organization, showAlert }) => {
  const navigate = useNavigate();
  // const [organization, setOrganization] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    status: ProjectStatus.ACTIVE, // Default value
    owner_id: organization.id, // Assuming the owner ID is stored in local storage
  });
  const userId = localStorage.getItem("authUserId");
  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const fetchOrganization = async () => {
  //   setLoading(true); // Set loading to true before starting the fetch
  //   try {
  //     const response = await fetch(
  //       `${
  //         import.meta.env.VITE_BASE_URL
  //       }/organization/get-organization-by-user/${userId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // Check if the response is OK
  //     if (!response.ok) {
  //       alert("Some error occurred. Please try again");
  //     }

  //     const res = await response.json();
  //     setOrganization(res.data);
  //     // alert(res.message);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Fetch error:", error); // Log the error for debugging
  //     alert("An unexpected error occurred. Please try again."); // Alert a generic error message
  //   } finally {
  //     setLoading(false); // Set loading to false in the finally block
  //   }
  // };

  const fetchProjects = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/project/get-projects/${localStorage.getItem("orgId")}`,
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

  const handleSubmit = async () => {
    try {
      let response;
      // if (id) {
      //   response = await fetch(
      //     `${import.meta.env.VITE_BASE_URL}/project/update-project/${id}`, // Adjust the endpoint as needed
      //     {
      //       method: "PUT",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //       body: JSON.stringify(formData),
      //     }
      //   );
      // } else {
      response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/create-project`, // Adjust the endpoint as needed
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      // }

      if (!response.ok) {
        alert("Some error occurred while creating the project");
        return;
      }

      const res = await response.json();
      if (res.success) {
        const projectId = res.data.id;
        // id
        //   ? showAlert("Project updated successfully!", "success")
        //   :
        showAlert("Project created successfully", "success");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      showAlert("An unexpected error occurred. Please try again.", "error");
    }
  };

  useEffect(() => {
    // fetchOrganization();
    fetchProjects();
  }, []);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="flex flex-row justify-start items-start gap-2 w-full h-full overflow-y-auto overflow-x-hidden p-4 overflow-auto">
          <div className="flex flex-col justify-start items-start gap-2 w-full h-full overflow-y-auto overflow-x-hidden">
            <div className="w-full h-fit flex flex-col justify-start items-start gap-1">
              <p className="font-sora font-bold text-transparent bg-gradient-to-l from-gradient-left to-gradient-right bg-clip-text text-[2.5rem]">
                Your Projects
              </p>
              <p className="font-sora text-left font-medium text-[1.4rem]  max-w-[35rem] text-wrap">
                List of Projects in your organization.
              </p>
            </div>
            <div className="flex flex-wrap justify-start items-start m-1 gap-3">
              {projects.map((project, index) => {
                return (
                  <div
                    key={project.id}
                    className={`cursor-pointer p-2 mb-2 w-[18rem] h-[15rem] rounded-lg  bg - background - primary / 80               
                   hover:bg-blue-950 shadow-2xl ring-2 ring-white/5 shadow-background-secondary transition ease-in-out duration-300`}
                    onClick={() => navigate(`/dashboard/project/${project.id}`)}
                  >
                    <div className="flex flex-col h-full w-full justify-between items-start px-3 pt-2 pb-5 text-left">
                      <div className="flex flex-col text-start">
                        <p className="capitalize font-bold text-text-inactive text-[1.5rem] leading-none">
                          {project.name}
                        </p>
                      </div>
                      <p className="font-medium text-text-inactive/80 text-ellipsis max-h-[5.5rem] w-full line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            className="w-40 text-white bg-background-secondary 
           hover:bg-chart-background hover:ring-2 hover:outline-none 
           hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center 
           transition ease-in-out duration-150 cursor-pointer border-2 border-white disabled:bg-gray-700 disabled:text-gray-400 disabled:hover:ring-0 disabled:border-gray-400 disabled:cursor-auto"
            onClick={() => setOpen(true)}
          >
            Add Project
          </button>
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <div className="flex flex-col  w-fit h-140 p-[2px] bg-gradient-to-r from-border-gradient-left to-border-gradient-right rounded-[1.2rem] gap-[2px] shadow-2xl shadow-border-gradient-left/20 overflow-auto">
              <div className="z-10 w-[18rem] sm:w-[25rem] md:w-[35rem] h-fit bg-background-primary rounded-[1.1rem] flex flex-col justify-evenly items-center py-[2rem] gap-y-[2rem] text-left">
                <h1 className="text-xl font-bold leading-tight tracking-tight font-natosans md:text-2xl text-text">
                  Create New Project
                </h1>
                <div className="flex flex-col w-full px-5">
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
                    onChange={handleChange}
                    maxLength={25}
                  />
                </div>
                <div className="flex flex-col w-full px-5 h-20">
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
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full px-5">
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
                    minLength={4}
                    maxLength={10}
                  />
                </div>

                <div className="flex flex-col w-full px-5">
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
                    minLength={4}
                    maxLength={10}
                  />
                </div>
                <div className="flex flex-col w-full px-5">
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
                    minLength={4}
                    maxLength={10}
                  />
                </div>
                <div className="mt-6 flex gap-2 w-full px-5">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-text-inactive shadow-sm ring-1 ring-primary-white ring-opacity-10 hover:bg-red-500/30 hover:text-white transition ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-text-inactive shadow-sm ring-1 ring-primary-white ring-opacity-10 hover:bg-green-500/30 hover:text-white transition ease-in-out disabled:opacity-50"
                  >
                    Create Organization
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};
export default Projects;
