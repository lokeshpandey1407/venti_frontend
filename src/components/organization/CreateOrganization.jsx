// src/CreateOrganization.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EOrganizationType = {
  TYPE1: "organisor",
  TYPE2: "agent",
  // Add other types as needed
};

const EOrganizationStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DELETED: "deleted",
  // Add other statuses as needed
};

const CreateOrganization = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    GST: "",
    logo: "logo.png",
    phone: "",
    email: "",
    type: EOrganizationType.TYPE1, // Default value
    status: EOrganizationStatus.ACTIVE, // Default value
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchOrganization = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/organization/get-organizations/${id}`,
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
      setFormData(res.data);
      // alert(res.message);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error); // Log the error for debugging
      alert("An unexpected error occurred. Please try again."); // Alert a generic error message
    } finally {
      setLoading(false); // Set loading to false in the finally block
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (id) {
        response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/organization/update-organization/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/organization/create-organization`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
      }
      if (!response.ok) {
        alert("Some error occured while creating organization");
      }
      const res = await response.json();
      if (res.success) {
        if (!id) {
          await handleAssignOrgToUser(
            localStorage.getItem("authUserId"),
            res.data.id
          );
        } else {
          alert("Organization updated successfully");
          navigate(`/organization/${id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignOrgToUser = async (userId, organizationId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/organization/assign-organization-to-user?userId=${userId}&organizationId=${organizationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );
      const res = await response.json();
      navigate("/");
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrganization();
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Create Organization</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="GST"
          >
            GST
          </label>
          <input
            type="text"
            name="GST"
            id="GST"
            value={formData.GST}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="logo"
          >
            Logo
          </label>
          <input
            type="text"
            name="logo"
            id="logo"
            value={formData.logo}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div> */}

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="type"
          >
            Type
          </label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            {Object.values(EOrganizationType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="status"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            {Object.values(EOrganizationStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
        >
          {id ? "Update Organization" : "Create Organization"}
        </button>
      </form>
    </div>
  );
};

export default CreateOrganization;
