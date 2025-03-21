import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Experience = () => {
  const { experienceId } = useParams();
  const [experience, setExperience] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchExperience = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/experience/get-experience/${experienceId}`,
        { method: "Get" }
      );
      if (response.ok) {
        const res = await response.json();
        setExperience(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (experienceId) {
      fetchExperience();
    }
  }, [experienceId]);

  return <div>{experience.name}</div>;
};

export default Experience;
