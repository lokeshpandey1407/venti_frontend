import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../common/Loader";

const ProjectPage = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("authUserId");

  const fetchProject = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/get-project/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Some error occurred. Please try again");
      }

      const res = await response.json();
      setProject(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="flex flex-row justify-start items-start gap-2 w-full h-full overflow-y-auto overflow-x-hidden p-4 overflow-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="glass-card p-8 rounded-xl w-full max-w-4xl animate-fadeIn">
          {/* Title */}
          <p className="font-sora font-bold text-left text-transparent bg-gradient-to-l from-gradient-left to-gradient-right bg-clip-text text-[2.5rem]">
            {project.name}
          </p>
          <p className="font-sora text-left font-medium text-[1.4rem]  max-w-[35rem] text-wrap">
            {project.description}
          </p>

          <p className="font-sora text-left font-medium text-[1rem] my-4  max-w-[35rem] text-wrap">
            Project / Event Details
          </p>
          <div className="grid grid-cols-6 sm:grid-cols-6 gap-3 mb-6">
            {/* Start Date */}
            <div className="bg-bg-secondary/40 backdrop-blur-sm p-1 rounded-md border border-border-secondary/30">
              <p className="text-sm font-medium text-text-inactive">
                Start Date
              </p>
              <p className="text-sm text-text">
                {project.start_date
                  ? new Date(project.start_date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            {/* End Date */}
            <div className="bg-bg-secondary/40 backdrop-blur-sm p-1 rounded-md border border-border-secondary/30">
              <p className="text-sm font-medium text-text-inactive">End Date</p>
              <p className="text-sm text-text">
                {project.end_date
                  ? new Date(project.end_date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            {/* Location */}
            <div className="bg-bg-secondary/40 backdrop-blur-sm p-1 rounded-md border border-border-secondary/30">
              <p className="text-sm font-medium text-text-inactive">Location</p>
              <p className="text-sm text-text">{project.location || "N/A"}</p>
            </div>
            {/* Status */}
            <div className="bg-bg-secondary/40 backdrop-blur-sm p-1 rounded-md border border-border-secondary/30">
              <p className="text-sm font-medium text-text-inactive">Status</p>
              <p className="text-sm text-text">{project.status || "N/A"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
