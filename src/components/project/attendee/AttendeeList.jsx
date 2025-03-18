import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const AttendeeList = ({ showAlert }) => {
  const [attendees, setAttendees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tableFields, setTableFields] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [formFieldData, setFormFieldData] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    category_id: "",
    is_active: false,
    form_fields_data: {},
  });
  const { projectId } = useParams();
  const token = localStorage.getItem("authToken");

  const fetchAttendees = async (filter) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/attendee/${projectId}/get-attendees`,
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
      if (res.success) {
        let filteredData = [];
        if (res.data.length > 0) {
          filteredData = res.data.filter((data) => {
            return data.category_name === selectedCategoryFilter;
          });
        }
        setAttendees(filteredData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const fetchCategoryFormFieldsData = async (categoryId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/project-attendee-category/${projectId}/get-form-fields-by-category/${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert("Some error occured. Please try again later");
        return;
      }
      const res = await response.json();
      if (res.success) {
        res.data.map((field) => {
          setFormFieldData((prev) => {
            return { ...prev, [field.name]: "" };
          });
        });
        setTableFields(res.data);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/project-attendee-category/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Some error occurred. Please try again");
      }

      const res = await response.json();
      if (res.success) {
        if (res.data.length <= 0) {
          showAlert(
            "Project has no attendee category. Please add category first.",
            "error"
          );
          return;
        }
        setSelectedCategoryFilter(res?.data[0]?.name || "");
        fetchCategoryFormFieldsData(res?.data[0]?.id);
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, [selectedCategoryFilter]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (attendee) => {
    setFormData(attendee);
  };

  const handleDelete = async (id) => {};

  const generateAttendeeBadge = async (attendeeId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/project-attendee-badge/${projectId}/generate-attendee-badge/${attendeeId}/staffId`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(),
        }
      );
      const res = await response.json();
      if (!response.ok) {
        alert(res.message || "Some error occurred. Please try again");
      }

      if (res.success) {
        console.log(res.data);
        alert(
          `The badge has been generated successfully ${JSON.stringify(
            res.data
          )}`
        );
      }
    } catch (error) {
      console.log("Fetch error:", error);
      alert(error?.message || "Some error occured. Please try again");
    }
  };

  const generateRegistrationLink = (attendeeId) => {
    const link = `http://localhost:5173/register-on-event/${projectId}/${attendeeId}`;
    window.open(link, "_blank");
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row gap-1 text-sm">
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              className={`text-sm font-bold min-w-20 shadow-2xl text-black rounded-md p-2 hover:bg-blue-400 cursor-pointer ${
                selectedCategoryFilter === category.name
                  ? "bg-blue-400"
                  : "bg-gray-300"
              }`}
              onClick={() => {
                setSelectedCategoryFilter(category.name);
                fetchCategoryFormFieldsData(category.id);
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      <div
        className={`h-fit mt-10 p-[2px] bg-gradient-to-b from-border-gradient-left to-border-gradient-right rounded-md w-full xs:w-[70vw] sm:w-[75vw] md:w-[80vw] lg:w-[83vw] overflow-hidden`}
      >
        <div
          className="w-full max-h-[38rem]
        h-full rounded-md overflow-x-auto bg-gradient-to-b from-primary to-primary-grad"
        >
          <table className=" py-[2rem] w-full text-sm ">
            <thead className="text-sm bg-gradient-to-b from-head-gradient-top to-head-gradient-bottom border-b-2 border-head-gradient-top font-semibold text-[1.1rem] sticky top-0">
              <tr>
                <th className="p-[1rem] text-center text-sm px-2 ">
                  First Name
                </th>
                <th className="p-[1rem] text-center text-sm ">Category</th>
                <th className="p-[1rem] text-center text-sm ">Active</th>
                {tableFields.map((field) => {
                  return (
                    <th
                      key={field.name}
                      className="p-[1rem] text-center text-sm "
                    >
                      {field.name}
                    </th>
                  );
                })}
                <th className="p-[1rem] text-center text-sm ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendees.length > 0 ? (
                attendees.map((attendee) => (
                  <tr key={attendee.id} className="py-[1rem] text-center">
                    <td className="py-[1rem] px-2 font-roboto font-normal sm:text-[0.8rem] md:text-[0.9rem]  lg:text-sm  max-w-[10rem] overflow-hidden text-ellipsis">
                      {attendee.first_name}
                    </td>
                    <td className="py-[1rem] px-2 font-roboto font-normal sm:text-[0.8rem] md:text-[0.9rem]  lg:text-sm  max-w-[10rem] overflow-hidden text-ellipsis">
                      {attendee.category_name}
                    </td>
                    <td className="py-[1rem] px-2 font-roboto font-normal sm:text-[0.8rem] md:text-[0.9rem]  lg:text-sm  max-w-[10rem] overflow-hidden text-ellipsis">
                      {attendee.is_active ? "Yes" : "No"}
                    </td>
                    {tableFields.map((field, index) => {
                      return (
                        <td
                          key={index}
                          className="py-[1rem] px-2 font-roboto font-normal sm:text-[0.8rem] md:text-[0.9rem]  lg:text-sm  max-w-[10rem] overflow-hidden text-ellipsis"
                        >
                          {attendee.form_fields_data[field.name]}
                        </td>
                      );
                    })}
                    <td className="py-[1rem] px-2 font-roboto font-normal sm:text-[0.8rem] md:text-[0.9rem]  lg:text-sm  max-w-[10rem] overflow-hidden text-ellipsis">
                      <button
                        onClick={() => handleEdit(attendee)}
                        className="bg-yellow-500 text-white p-1 rounded mr-1 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(attendee.id)}
                        className="bg-red-500 text-white p-1 rounded mr-1 cursor-pointer"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => generateRegistrationLink(attendee.id)}
                        className="bg-blue-500 text-white p-1 rounded mr-1 cursor-pointer"
                      >
                        Send Invite
                      </button>

                      <button
                        onClick={() => generateAttendeeBadge(attendee.id)}
                        className="bg-green-500 text-white p-1 rounded cursor-pointer"
                      >
                        Generate Badge
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className=" text-center">
                    <p className="text-sm p-2">No Attendee present</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendeeList;
