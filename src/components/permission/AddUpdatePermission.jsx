import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

const AddUpdatePermission = () => {
  const [formData, setFormData] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [updatePermission, setUpdatePermission] = useState(null);
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
  ];

  const table = useReactTable({
    columns,
    data: permissions,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCreatePermission = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/permission/createPermission`,
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
        alert("Permission created successfully");
        setPermissions((prev) => {
          return [formData, ...prev];
        });
        setFormData({});
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
        `${
          import.meta.env.VITE_BASE_URL
        }/permission/updatePermisson/${updatePermission}`,
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
        alert("Permission updated successfully");
        const updatedPermissions = permissions.map((permission) =>
          permission.id === updatePermission ? res.data : permission
        );
        setPermissions(updatedPermissions);
        setUpdatePermission(null);
        setFormData({});
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

  const handleUpdatePermission = async (permId) => {
    setUpdatePermission(permId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/permission/getPermissions/${permId}`,
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

  const handleDeletePermission = async (permId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/permission/deletePermission/${permId}`,
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
        alert("Permission deleted successfully");
        setPermissions((prev) => prev.filter((perm) => perm.id !== permId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <div className=" flex  min-h-screen items-center flex-col justify-start gap-5">
      <h3 className="text-3xl mt-10">Manage Permissions</h3>
      <div className="shadow-2xl rounded-2xl w-100 shadow-black bg-white p-3">
        <form
          onSubmit={(e) =>
            updatePermission
              ? handlePutApplication(e)
              : handleCreatePermission(e)
          }
        >
          <div className=" flex flex-col gap-1">
            <label htmlFor="id">Permission id</label>
            <input
              type="text"
              name="id"
              id="id"
              value={formData.id}
              required
              onChange={handleChange}
              className="flex h-10 w-full px-2 rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
            />
            <p className="text-xs text-gray-400">
              Permission id must be unique
            </p>
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="id">Permission name</label>
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
            <label htmlFor="description">Permission description</label>
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
          <button
            type="submit"
            className="p-2 rounded-lg bg-blue-300 hover:bg-blue-400 cursor-pointer w-full mt-10"
          >
            {updatePermission ? "Update" : "Create"}
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
                          onClick={() =>
                            handleDeletePermission(row.original.id)
                          }
                          className="p-2 bg-red-600 cursor-pointer hover:bg-red-700 rounded-xl text-white"
                        >
                          Delete
                        </button>
                        <button
                          className="p-2 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-xl text-white"
                          onClick={() =>
                            handleUpdatePermission(row.original.id)
                          }
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
                    No permissions
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

export default AddUpdatePermission;
