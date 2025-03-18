// src/CreateOrganization.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "../../common/Loader";

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

const OrganizationSetting = ({ showAlert }) => {
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
  const id = localStorage.getItem("orgId");
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
  console.log(id);
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
        showAlert("Some error occured while updating organization", "error");
      }
      const res = await response.json();
      if (res.success) {
        showAlert("Organization updated successfully", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrganization();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-scree w-full p-4 ">
          <div className={`max-w-7xl mx-auto animate-fadeIn`}>
            <div className="flex flex-col md:flex-col gap-4 mb-8 ">
              <div>
                <p className="font-sora font-bold text-left text-transparent bg-gradient-to-l from-gradient-left to-gradient-right bg-clip-text text-[2.5rem]">
                  Organization Settings
                </p>
                <p className="font-sora text-left font-medium text-[1.4rem]  max-w-[35rem] text-wrap">
                  Manage your organization.
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="bg-color-background-secondary py-6 rounded-lg shadow-md w-full mx-auto text-left"
              >
                <div className="grid grid-cols-2 w-full gap-5 flex-wrap">
                  <div className="min-w-80">
                    <label
                      className="block text-sm font-medium text-color-text-inactive"
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
                      className="mt-1 block w-full border border-color-border rounded-md p-2 text-color-text bg-color-field focus:outline-none focus:ring-2 focus:ring-color-accent"
                    />
                  </div>

                  <div className="min-w-80">
                    <label
                      className="block text-sm font-medium text-color-text-inactive"
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
                      className="mt-1 block w-full border border-color-border rounded-md p-2 text-color-text bg-color-field focus:outline-none focus:ring-2 focus:ring-color-accent"
                    />
                  </div>

                  <div className="min-w-80">
                    <label
                      className="block text-sm font-medium text-color-text-inactive"
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
                      className="mt-1 block w-full border border-color-border rounded-md p-2 text-color-text bg-color-field focus:outline-none focus:ring-2 focus:ring-color-accent"
                    />
                  </div>

                  <div className="min-w-80">
                    <label
                      className="block text-sm font-medium text-color-text-inactive"
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
                      className="mt-1 block w-full border border-color-border rounded-md p-2 text-color-text bg-color-field focus:outline-none focus:ring-2 focus:ring-color-accent"
                    />
                  </div>

                  <div className="min-w-80">
                    <label
                      className="block text-sm font-medium text-color-text-inactive"
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
                      className="mt-1 block w-full border border-color-border rounded-md p-2 text-color-text bg-color-field focus:outline-none focus:ring-2 focus:ring-color-accent"
                    />
                  </div>

                  <div className="min-w-80">
                    <label
                      className="block text-sm font-medium text-color-text-inactive"
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
                      className="mt-1 block w-full border border-color-border rounded-md p-2 text-color-text bg-color-field focus:outline-none focus:ring-2 focus:ring-color-accent"
                    />
                  </div>

                  <div className="min-w-80">
                    <label
                      className="block text-sm font-medium text-color-text-inactive"
                      htmlFor="type"
                    >
                      Type
                    </label>
                    <select
                      name="type"
                      id="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-color-border rounded-md p-2 text-color-text bg-color-field focus:outline-none focus:ring-2 focus:ring-color-accent"
                    >
                      {Object.values(EOrganizationType).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="min-w-80">
                    <label
                      className="block text-sm font-medium text-color-text-inactive"
                      htmlFor="status"
                    >
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-color-border rounded-md p-2 text-color-text bg-color-field focus:outline-none focus:ring-2 focus:ring-color-accent"
                    >
                      {Object.values(EOrganizationStatus).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-background-secondary 
                      hover:bg-chart-background hover:ring-2 hover:outline-none 
                      hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center 
                      transition ease-in-out duration-150 mt-10 cursor-pointer"
                >
                  {id ? "Update Organization" : "Create Organization"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizationSetting;
