import { useState } from "react";
import Experience from "./ExperienceCard";
import { useEffect } from "react";
import ExperienceCard from "./ExperienceCard";

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchExperiences = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/experience/get-all-experiences",
        { method: "Get" }
      );

      if (response.ok) {
        const res = await response.json();
        setExperiences(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);
  return (
    <div className="">
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="flex flex-col flex-wrap gap-2">
          {experiences.map((experience, index) => {
            return <ExperienceCard key={index} data={experience} />;
          })}
        </div>
      )}
    </div>
  );
};
export default ExperienceList;
