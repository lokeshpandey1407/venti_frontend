import { useNavigate } from "react-router";
import ExperienceList from "../experience/ExperienceList"
import { useState } from "react";
import ExperienceApps from "./ExperienceApps"

function AppHomepage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="p-px flex flex-col">
      <div className="ml-auto">
        <button
          className="px-3 py-2 bg-blue-300 rounded-lg cursor-pointer border-2 border-blue-400 font-bold hover:bg-blue-400 transition-colors"
          onClick={openModal}
        >
          Add App
        </button>
      </div>

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
      <ExperienceApps />
    </div>
  );
}

export default AppHomepage;
