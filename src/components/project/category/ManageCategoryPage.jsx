import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ManageCategoryPage = () => {
  // State for form data and categories
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCategory, setUpdateCategory] = useState("");
  const { projectId } = useParams();
  const token = localStorage.getItem("authToken");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !description) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/projectAttendeeCategory/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, description }),
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        alert("Some error occurred. Please try again");
      }

      const res = await response.json();
      if (res.success) {
        const newCategory = { name, description };
        setCategories([newCategory, ...categories]);
        setName("");
        setDescription("");
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !description) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/projectAttendeeCategory/${projectId}/${updateCategory}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, description }),
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        alert("Some error occurred. Please try again");
      }

      const res = await response.json();
      if (res.success) {
        const newCategory = { name, description };
        const filteredCategories = categories.filter(
          (category) => category.id !== updateCategory
        );
        setCategories([newCategory, ...filteredCategories]);
        setName("");
        setDescription("");
        setUpdateCategory("")
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
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
        setCategories(res.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/projectAttendeeCategory/${projectId}/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Failed to delete category. Please try again.");
      }

      const res = await response.json();
      if (res.success) {
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the category.");
    } finally {
      setLoading(false);
    }
  };

  const setCategoryForUpdate = async (categoryId) => {
    setUpdateCategory(categoryId);
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/projectAttendeeCategory/${projectId}/${categoryId}`,
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
        setName(res.data?.name);
        setDescription(res.data.description);
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [projectId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Create Project Attendee Category
      </h2>

      {/* Form */}
      <form
        onSubmit={(e) =>
          updateCategory ? handleUpdateCategory(e) : handleSubmit(e)
        }
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-lg">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter category name"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter category description"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {updateCategory ? "Update Category" : "Create Category"}
        </button>
      </form>

      {/* Section to display created categories */}
      <h3 className="text-xl font-semibold mt-8">Created Categories</h3>
      <ul className="mt-4 space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <strong>{category.name}</strong>: {category.description}
            </div>
            <div>
              <button
                onClick={() => setCategoryForUpdate(category.id)}
                className="ml-4 bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="ml-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategoryPage;
