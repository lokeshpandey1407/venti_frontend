import { useNavigate, useNavigation, useParams } from "react-router";

const AppCard = ({ data }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const handleSelectApp = (experience_id, app_id) => {
    navigate(`/apps/${projectId}/${experience_id}/updateApp/${app_id}`);
  };

  return (
    <button
      className={`cursor-pointer p-2 rounded-lg bg-black hover:bg-blue-950 shadow-2xl ring-2 ring-white/5 shadow-background-secondary transition ease-in-out duration-300 bg-cover min-h-40 min-w-100 `}
      // style={{ backgroundImage: `url(${data.cover_image})` }}
      onClick={() => handleSelectApp(data.experience_id, data.app_id)}
    >
      <div className="flex flex-col h-full w-full justify-between items-start px-3 pt-2 pb-5 text-left">
        <p className="text-white">
          Title :{" "}
          {
            data.configuration.fields.find((field) => field.id === "title")
              .value
          }
        </p>
        <p className="text-white">App Id : {data.app_id}</p>
      </div>
    </button>
  );
};

export default AppCard;
