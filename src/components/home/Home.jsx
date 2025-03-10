import { useEffect, useState } from "react";
import CreateOrganization from "../organization/CreateOrganization";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("authUserId");
  const token = localStorage.getItem("authToken");

  const fetchOrganization = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/organization/getOrganizationByUser/${userId}`,
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
      setOrganization(res.data);
      // alert(res.message);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error); // Log the error for debugging
      alert("An unexpected error occurred. Please try again."); // Alert a generic error message
    } finally {
      setLoading(false); // Set loading to false in the finally block
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  return (
    <div className=" min-h-100 flex flex-col  items-center">
      <div>
        <h4 className="text-xl underline">Organizations</h4>
        <div className="flex flex-col gap-1 mt-5">
          {organization.map((org, index) => {
            return (
              <button
                className="p-3 bg-amber-300 cursor-pointer rounded-xl"
                key={index}
                onClick={() => navigate(`/organization/${org.id}`)}
              >
                {org.name}
              </button>
            );
          })}
        </div>
      </div>
      <button
        className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 cursor-pointer disabled:bg-gray-100 disabled:cursor-auto"
        onClick={() => navigate("/addOrganization")}
        disabled={organization.length > 0}
      >
        Create Organization
      </button>

      {/* <CreateOrganization /> */}
    </div>
  );
};
export default Home;
