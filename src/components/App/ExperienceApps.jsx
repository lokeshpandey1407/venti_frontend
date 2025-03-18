import { useNavigate, useParams } from "react-router";
import ExperienceList from "../experience/ExperienceList";
import { useEffect, useState } from "react";

function Apps() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();

  const handleSelectApp = (experience_id, app_id) => {
    navigate(`${experience_id}/updateApp/${app_id}`);
  };

  const fetchApps = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/experience-app/${projectId}/get-experience-app`,
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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <div className="flex flex-row justify-between items-start gap-2 w-full h-full overflow-y-auto overflow-x-hidden p-4 overflow-auto">
      {/* Modal */}
      {isOpen && (
        <div
          className="bg-[rgba(0,0,0,0.4)] fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="max-w-lg w-xl mx-auto p-6 bg-white shadow-lg rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="float-end top-5 right-5 rounded-md px-2 py-1 cursor-pointer border-1 border-black hover:bg-slate-400 hover:text-white text-black "
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-black">
              Experiences List
            </h2>
            <div className="flex flex-col gap-1">
              <ExperienceList />
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-4 flex-row flex-wrap p-4">
        {apps.length > 0 ? (
          apps.map((app, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer p-2 mb-2 w-[18rem] h-[15rem] rounded-lg  bg - background - primary / 80               
            hover:bg-blue-950 shadow-2xl ring-2 ring-white/5 shadow-background-secondary transition ease-in-out duration-300`}
                onClick={() => handleSelectApp(app.experience_id, app.app_id)}
              >
                <div className="flex flex-col h-full w-full justify-between items-start px-3 pt-2 pb-5 text-left">
                  <div className="flex flex-col text-start">
                    <p className="capitalize font-bold text-text-inactive text-[1.5rem] leading-none">
                      Title :{" "}
                      {
                        app.configuration.fields.find(
                          (field) => field.id === "title"
                        ).value
                      }
                    </p>
                  </div>
                  <p className="font-medium text-text-inactive/80 text-ellipsis max-h-[5.5rem] w-full line-clamp-3">
                    App Id : {app.app_id}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="font-sora text-left font-medium text-[1.4rem]  max-w-[35rem] text-wrap">
            Oops! you don't have any apps.
          </p>
        )}
      </div>
      <button
        className="w-40 text-white bg-background-secondary 
           hover:bg-chart-background hover:ring-2 hover:outline-none 
           hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center 
           transition ease-in-out duration-150 cursor-pointer border-2 border-white disabled:bg-gray-700 disabled:text-gray-400 disabled:hover:ring-0 disabled:border-gray-400 disabled:cursor-auto"
        onClick={() => openModal()}
      >
        Add App
      </button>
    </div>
  );
}

export default Apps;
