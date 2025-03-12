import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

const AddUpdaterole = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    resource_type: "Accounts",
  });
  const [roles, setroles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [updaterole, setUpdaterole] = useState(null);
  const token = localStorage.getItem("authToken");

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor((row) => row.description, {
      id: "description",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Description </span>,
    }),
    columnHelper.accessor((row) => row.resource_type, {
      id: "resource_type",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Resource type </span>,
    }),
  ];

  const table = useReactTable({
    columns,
    data: roles,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCreaterole = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/role/createrole`,
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
        alert("role created successfully");
        setroles((prev) => {
          return [formData, ...prev];
        });
        setFormData({
          id: "",
          name: "",
          description: "",
          resource_type: "Accounts",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePutApplication = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/role/updateRole/${updaterole}`,
        {
          method: "PUT",
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
        alert("role updated successfully");
        const updatedroles = roles.map((role) =>
          role.id === updaterole ? res.data : role
        );
        setroles(updatedroles);
        setUpdaterole(null);
        setFormData({});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        setroles(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdaterole = async (permId) => {
    setUpdaterole(permId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/role/getroles/${permId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert("Error occured");
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

  const handleDeleterole = async (permId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/role/deleterole/${permId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert("Error occured");
        return;
      }
      const res = await response.json();
      if (res.success) {
        alert("role deleted successfully");
        setroles((prev) => prev.filter((perm) => perm.id !== permId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchroles();
  }, []);

  return (
    <div className=" flex  min-h-screen items-center flex-col justify-start gap-5">
      <h3 className="text-3xl mt-10">Manage roles</h3>
      <div className="shadow-2xl rounded-2xl w-100 shadow-black bg-white p-3">
        <form
          onSubmit={(e) =>
            updaterole ? handlePutApplication(e) : handleCreaterole(e)
          }
        >
          <div className=" flex flex-col gap-1">
            <label htmlFor="id">role id</label>
            <input
              type="text"
              name="id"
              id="id"
              value={formData.id}
              required
              onChange={handleChange}
              className="flex h-10 w-full px-2 rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
            />
            <p className="text-xs text-gray-400">role id must be unique</p>
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="id">role name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              id="name"
              required
              onChange={handleChange}
              className="flex h-10 w-full px-2 rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="description">role description</label>
            <textarea
              type="text"
              name="description"
              rows={4}
              value={formData?.description}
              id="description"
              onChange={handleChange}
              className="flex h-10 w-full px-2 rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="resource_type">Role resource type</label>
            <select
              type="text"
              name="resource_type"
              value={formData?.resource_type}
              id="resource_type"
              onChange={handleChange}
              className="flex h-10 w-full px-2 rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
            >
              <option value="Accounts">Accounts</option>
              <option value="Organization">Organization</option>
              <option value="Project">Project</option>
              <option value="App">App</option>
              <option value="User">User</option>
              <option value="Analytics">Analytics</option>
            </select>
          </div>
          <button
            type="submit"
            className="p-2 rounded-lg bg-blue-300 hover:bg-blue-400 cursor-pointer w-full mt-10"
          >
            {updaterole ? "Update" : "Create"}
          </button>
        </form>
      </div>
      <div className="p-2">
        {!isLoading && (
          <table className="border-1 border-black rounded-2xl">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-red-300 border-1 border-black"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left border-1 border-black p-2"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                  <th className="text-left border-1 border-black p-2">
                    Actions
                  </th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-2 border-1 border-gray-400"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    <td className="p-2 border-1 border-gray-400">
                      <div className="flex flex-row gap-1">
                        <button
                          onClick={() => handleDeleterole(row.original.id)}
                          className="p-2 bg-red-600 cursor-pointer hover:bg-red-700 rounded-xl text-white"
                        >
                          Delete
                        </button>
                        <button
                          className="p-2 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-xl text-white"
                          onClick={() => handleUpdaterole(row.original.id)}
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No roles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        <div className="h-4" />
      </div>
    </div>
  );
};

export default AddUpdaterole;
