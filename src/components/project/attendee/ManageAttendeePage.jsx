import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AttendeeList from "./AttendeeList";

const ManageAttendeePage = () => {
  const [attendees, setAttendees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategoryFormFields, setSelectedCategoryFormFields] = useState(
    []
  );
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState();
  const [formFieldData, setFormFieldData] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    category_id: "",
    is_active: false,
    form_fields_data: {},
  });
  const { projectId } = useParams();
  const token = localStorage.getItem("authToken");

  //   const fetchAttendees = async (filter) => {
  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_BASE_URL}/attendee/${projectId}/getAttendees`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         alert("Some error occurred. Please try again");
  //       }

  //       const res = await response.json();
  //       if (res.success) {
  //         let filteredData = [];
  //         if (res.data.length > 0) {
  //           filteredData = res.data.filter((data) => {
  //             return data.category_name === selectedCategoryFilter;
  //           });
  //         }
  //         setAttendees(filteredData);
  //       }
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //       alert("An unexpected error occurred. Please try again.");
  //     }
  //   };

  const fetchCategoryFormFieldsData = async (categoryId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/projectAttendeeCategory/${projectId}/getFormFieldsByCategory/${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        setSelectedCategoryFormFields(res.data);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleChangeCategoryId = async (id) => {
    setCategoryId(id);
    setFormData((prev) => {
      return { ...prev, category_id: id };
    });
    await fetchCategoryFormFieldsData(id);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/projectAttendeeCategory/${projectId}`,
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
        setSelectedCategoryFilter(res?.data[0]?.name || "");
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  //   useEffect(() => {
  //     fetchAttendees();
  //   }, [selectedCategoryFilter]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "is_active" ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, form_fields_data: formFieldData };

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/attendee/${projectId}/createAttendee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        alert("Some error occurred. Please try again");
      }

      const res = await response.json();
      if (res.success) {
        setCategoryId("");
        setFormData({
          first_name: "",
          category_id: "",
          is_active: false,
          form_fields_data: {},
        });
        setSelectedCategoryFilter("");
        setSelectedCategoryFormFields([]);
        alert("Attendee created successfully");
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (attendee) => {
    setFormData(attendee);
  };

  const handleDelete = async (id) => {};

  const handleFormFieldData = (e) => {
    const { name, value } = e.target;
    setFormFieldData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Attendees</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 rounded mr-2"
          required
        />
        <div className="flex flex-col max-w-lg">
          <label
            htmlFor="categoryId"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Category ID
          </label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => handleChangeCategoryId(e.target.value)}
            className="border border-gray-300 rounded p-2"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="mr-2"
          />
          Active
        </label>
        <div className="flex flex-row gap-2 flex-wrap">
          {selectedCategoryFormFields.map((formField) => {
            return (
              <div className="flex flex-col gap-1" key={formField.name}>
                <label>
                  {formField.name} {formField.dashboard_required && "*"}
                </label>
                {formField.type === "text" ? (
                  <input
                    type={formField.type}
                    id={formField.name}
                    name={formField.name}
                    value={formFieldData[formField.name]}
                    required={formField.dashboard_required}
                    onChange={handleFormFieldData}
                    className="border p-2 rounded mr-2 max-w-60"
                  />
                ) : formField.type === "number" ? (
                  <input
                    type="number"
                    id={formField.name}
                    name={formField.name}
                    value={formFieldData[formField.name]}
                    required={formField.dashboard_required}
                    onChange={handleFormFieldData}
                    className="border p-2 rounded mr-2 max-w-[240px]"
                  />
                ) : formField.type === "number" ? (
                  <input
                    type="email"
                    id={formField.name}
                    name={formField.name}
                    value={formFieldData[formField.name]}
                    required={formField.dashboard_required}
                    onChange={handleFormFieldData}
                    className="border p-2 rounded mr-2 max-w-[240px]"
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          {formData.id ? "Update" : "Create"}
        </button>
      </form>

      <AttendeeList />
    </div>
  );
};

export default ManageAttendeePage;
