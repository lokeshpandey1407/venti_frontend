import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const AttendeeList = () => {
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

      if (!response.ok) {
        alert("Some error occurred. Please try again");
      }

      const res = await response.json();
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
    alert(`Public url is - ${link}`);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row gap-1">
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              className={` min-w-20 shadow-2xl text-black rounded-xl p-2 hover:bg-blue-400 cursor-pointer ${
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

      <table className="min-w-full border-collapse border border-gray-200 mt-2">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">First Name</th>
            <th className="border border-gray-200 p-2">Category</th>
            <th className="border border-gray-200 p-2">Active</th>
            {tableFields.map((field) => {
              return (
                <th key={field.name} className="border border-gray-200 p-2">
                  {field.name}
                </th>
              );
            })}
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee.id}>
              <td className="border border-gray-200 p-2">
                {attendee.first_name}
              </td>
              <td className="border border-gray-200 p-2">
                {attendee.category_name}
              </td>
              <td className="border border-gray-200 p-2">
                {attendee.is_active ? "Yes" : "No"}
              </td>
              {tableFields.map((field, index) => {
                return (
                  <td key={index} className="border border-gray-200 p-2">
                    {attendee.form_fields_data[field.name]}
                  </td>
                );
              })}
              <td className="border border-gray-200 p-2 flex flex-row flex-wrap gap-1">
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendeeList;
