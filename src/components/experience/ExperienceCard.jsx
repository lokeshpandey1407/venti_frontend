import { useNavigate, useNavigation, useParams } from "react-router";

const ExperienceCard = ({ data }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const handleSelectExperience = (experience_id) => {
    navigate(`/apps/${projectId}/${experience_id}/addApp`);
  };
  return (
    <button
      className={`cursor-pointer p-2 rounded-lg bg-black hover:bg-blue-950 shadow-2xl ring-2 ring-white/5 shadow-background-secondary transition ease-in-out duration-300 bg-cover`}
      // style={{ backgroundImage: `url(${data.cover_image})` }}
      onClick={() => handleSelectExperience(data.experience_id)}
    >
      <div className="flex flex-col h-full w-full justify-between items-start px-3 pt-2 pb-5 text-left">
        <p className="text-white">{data.name}</p>
      </div>
    </button>
  );
};

export default ExperienceCard;
