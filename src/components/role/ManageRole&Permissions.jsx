import React, { useEffect, useState } from "react";

const ManageRolePermissions = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  const fetchroles = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/role/getroles`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert("Some error occured. Please try again");
        return;
      }
      const res = await response.json();
      if (res.success) {
        setRoles(res.data);
        // setSelectedRole(res?.data[0].id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/permission/getPermissions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert("Some error occured. Please try again");
        return;
      }
      const res = await response.json();
      if (res.success) {
        setPermissions(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRolePermissions = async (id) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/role/get_role_permissions_by_role/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert("Some error occured. Please try again");
        return;
      }
      const res = await response.json();
      if (res.success) {
        setFormData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePermissionCheckbox = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      const data = { ["role_id"]: selectedRole, ["permission_id"]: name };
      setFormData((prev) => {
        return [...prev, data];
      });
    } else {
      setFormData((prev) => prev.filter((data) => data.permission_id !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/role/add_update_role_permission`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        alert("Some error occured. Please try again");
        return;
      }
      const res = await response.json();
      if (res.success) {
        alert("Role saved successfully");
        setFormData([]);
        setSelectedRole("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemovePermissions = (e) => {
    e.preventDefault();
    const value = confirm(
      "Are you sure you want to save ? This will remove all the permissions from the role."
    );
    if (value) {
      removeAllPermissions();
    } else {
      return;
    }
  };

  const removeAllPermissions = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/role/remove_role_permission/${selectedRole}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert("Some error occured. Please try again");
        return;
      }
      const res = await response.json();
      if (res.success) {
        alert("Permissions removed successfully");
        setSelectedRole("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchroles();
    fetchPermissions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center gap-5">
      <h3 className="text-3xl">Manage Roles Permissions</h3>
      <form
        className="min-w-100"
        onSubmit={(e) =>
          formData.length > 0 ? handleSubmit(e) : handleRemovePermissions(e)
        }
      >
        <div>
          <label htmlFor="role_id">Select Role</label>
          <select
            name="role_id"
            id="role_id"
            value={selectedRole}
            required
            onChange={(e) => {
              setSelectedRole(e.target.value);
              fetchRolePermissions(e.target.value);
            }}
            className="flex h-10 w-full px-2 rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
          >
            <option value={""} disabled className="text-gray-400">
              Select
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2">
          <h5 className="text-2xl">Permissions</h5>
          {permissions.map((permission) => {
            return (
              <div
                key={permission.id}
                className="flex flex-row gap-1 items-center"
              >
                <input
                  type="checkbox"
                  name={`${permission.id}`}
                  id={`${permission.id}`}
                  className="h-5 w-5"
                  checked={formData.some(
                    (data) => data.permission_id === permission.id
                  )}
                  onChange={handlePermissionCheckbox}
                />
                <label htmlFor={`${permission.id}`}>{permission.name}</label>
              </div>
            );
          })}
        </div>
        <button
          className="mt-5 p-2 w-full bg-blue-300 cursor-pointer hover:bg-blue-400 rounded-xl"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ManageRolePermissions;
