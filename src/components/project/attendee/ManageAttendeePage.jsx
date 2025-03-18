import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AttendeeList from "./AttendeeList";
import Modal from "../../../common/Modal";
import Loader from "../../../common/Loader";

const ManageAttendeePage = ({ showAlert }) => {
  const [attendees, setAttendees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
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
        }/project-attendee-category/${projectId}/get-form-fields-by-category/${categoryId}`,
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
        `${
          import.meta.env.VITE_BASE_URL
        }/project-attendee-category/${projectId}`,
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
        if (res.data.length === 0) {
          showAlert(
            "Project has no attendee category. Please add category first.",
            "error"
          );
          return;
        }
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
        `${
          import.meta.env.VITE_BASE_URL
        }/attendee/${projectId}/create-attendee`,
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
        showAlert("Attendee created successfully", "success");
        setOpen(false);
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

  const handleFormFieldData = (e, type = "") => {
    const { name, value } = e.target;
    if (type === "toggle") {
      setFormFieldData((prev) => {
        return {
          ...prev,
          [name]: e.target.checked,
        };
      });
    }
    setFormFieldData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="container mx-auto p-4 text-left overflow-auto">
      <div className="flex flex-row justify-between items-center">
        <p className="font-sora font-bold text-transparent bg-gradient-to-l from-gradient-left to-gradient-right bg-clip-text text-[2.5rem]">
          Project Attendee
        </p>
        <button
          className="w-40 text-white bg-background-secondary 
           hover:bg-chart-background hover:ring-2 hover:outline-none 
           hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center 
           transition ease-in-out duration-150 cursor-pointer border-2 border-white disabled:bg-gray-700 disabled:text-gray-400 disabled:hover:ring-0 disabled:border-gray-400 disabled:cursor-auto"
          onClick={() => setOpen(true)}
        >
          Add Attendee
        </button>
      </div>
      {loading ? <Loader /> : <AttendeeList showAlert={showAlert} />}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col h-fit max-h-130 w-150 p-[2px] bg-gradient-to-r from-border-gradient-left to-border-gradient-right rounded-[1.2rem] gap-[2px] shadow-2xl shadow-border-gradient-left/20 overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="z-10 w-full h-fit bg-background-primary rounded-[1.1rem] flex flex-col justify-evenly items-start p-[2rem] gap-y-[2rem] text-left"
          >
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded mr-2 w-full "
              required
            />
            <div className="flex flex-col w-full ">
              <label
                htmlFor="categoryId"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Select Category
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
            <div className="flex flex-col">
              <p className=" text-sm font-medium text-gray-700">User Status</p>
              <div className="flex flex-row">
                <input
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="flex items-center" htmlFor="is_active">
                  Active
                </label>
              </div>
            </div>
            <div className="flex flex-row gap-2 flex-wrap w-full">
              {selectedCategoryFormFields.map((formField) => {
                return (
                  <div
                    className="flex flex-col gap-1 w-full text-sm "
                    key={formField.name}
                  >
                    <label className="text-gray-700">
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
                        className="border p-2 rounded mr-2 flex-1"
                      />
                    ) : formField.type === "number" ? (
                      <input
                        type="number"
                        id={formField.name}
                        name={formField.name}
                        value={formFieldData[formField.name]}
                        required={formField.dashboard_required}
                        onChange={handleFormFieldData}
                        className="border p-2 rounded mr-2 flex-1"
                      />
                    ) : formField.type === "number" ? (
                      <input
                        type="email"
                        id={formField.name}
                        name={formField.name}
                        value={formFieldData[formField.name]}
                        required={formField.dashboard_required}
                        onChange={handleFormFieldData}
                        className="border p-2 rounded mr-2 flex-1"
                      />
                    ) : formField.type === "toggle" ? (
                      <div className="flex flex-row gap-1 justify-start items-center">
                        <input
                          type="checkbox"
                          id={formField.name}
                          name={formField.name}
                          value={formFieldData[formField.name]}
                          required={formField.dashboard_required}
                          onChange={(e) => handleFormFieldData(e, "toggle")}
                          className="border p-2 rounded "
                        />
                        <label htmlFor={formField.name}>{formField.name}</label>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-background-secondary 
              hover:bg-chart-background hover:ring-2 hover:outline-none 
              hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center 
              transition ease-in-out duration-150 cursor-pointer border-2 border-white disabled:bg-gray-700 disabled:text-gray-400 disabled:hover:ring-0 disabled:border-gray-400 disabled:cursor-auto"
            >
              {formData.id ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageAttendeePage;
