import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AppCard from "./AppCard";

const ExperienceApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const {projectId} = useParams();

  const fetchApps = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/experienceApp/${projectId}/getExperienceApp`,
        {
          method: "Get",
          headers: {
            Authorization: "Bearer lfjdlkjslfkslkfjsklfjiwue73878734873",
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        setApps(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <div className="flex gap-2 flex-row flex-wrap mt-2">
      {apps.map((app, index) => {
        return <AppCard key={index} data={app} />;
      })}
    </div>
  );
};

export default ExperienceApps;
