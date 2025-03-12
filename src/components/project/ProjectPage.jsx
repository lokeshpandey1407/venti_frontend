// src/OrganizationPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const defaultData = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue().toUpperCase(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    // footer: (info) => info.column.id,
  }),
];

const ProjectPage = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, _setData] = React.useState(() => [...defaultData]);
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("authUserId");

  const fetchProject = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/get-project/${id}`,
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
      setProject(res.data);
      // alert(res.message);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error); // Log the error for debugging
      alert("An unexpected error occurred. Please try again."); // Alert a generic error message
    } finally {
      setLoading(false); // Set loading to false in the finally block
    }
  };

  //   const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="flex flex-col items-center w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        {/* Title and Button */}
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          {project.name}
        </h1>

        <div className="flex flex-row gap-1 w-full">
          <button
            onClick={() => navigate(`/manageAttendee/${project.id}`)}
            className="cursor-pointer mt-4 w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Manage Attendee
          </button>
          <button
            onClick={() => navigate(`/manageCategory/${project.id}`)}
            className="cursor-pointer mt-4 w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Manage Attendee Category
          </button>
          <button
            onClick={() => navigate(`/manageCategoryFields/${project.id}`)}
            className="cursor-pointer mt-4 w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Manage Category-fields
          </button>
          <button
            onClick={() => navigate(`/manageFormFields/${project.id}`)}
            className="cursor-pointer mt-4 w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Manage fields
          </button>
        </div>

        <div className="w-full mt-6">
          {/* Project Description */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Description</h2>
            <p className="text-lg text-gray-700">{project.description}</p>
          </div>

          {/* Project Details */}
          <div className="flex flex-wrap gap-6 mb-4">
            {/* Start Date */}
            <div className="flex flex-col items-start w-1/2">
              <h3 className="text-md font-semibold text-gray-700">
                Start Date
              </h3>
              <p className="text-gray-600">
                {new Date(project.start_date).toLocaleDateString()}
              </p>
            </div>

            {/* End Date */}
            <div className="flex flex-col items-start w-1/2">
              <h3 className="text-md font-semibold text-gray-700">End Date</h3>
              <p className="text-gray-600">
                {new Date(project.end_date).toLocaleDateString()}
              </p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-start w-1/2">
              <h3 className="text-md font-semibold text-gray-700">Location</h3>
              <p className="text-gray-600">{project.location || "N/A"}</p>
            </div>

            {/* Status */}
            <div className="flex flex-col items-start w-1/2">
              <h3 className="text-md font-semibold text-gray-700">Status</h3>
              <p className="text-gray-600">{project.status}</p>
            </div>
          </div>

          {/* Created At */}
          <div className="flex flex-col items-start mb-4">
            <h3 className="text-md font-semibold text-gray-700">Created At</h3>
            <p className="text-gray-600">
              {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Updated At */}
          <div className="flex flex-col items-start mb-4">
            <h3 className="text-md font-semibold text-gray-700">
              Last Updated At
            </h3>
            <p className="text-gray-600">
              {new Date(project.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-1">
          <button
            className="hover:bg-gray-500 cursor-pointer h-10 px-1 rounded-lg bg-blue-300"
            onClick={() => navigate(`/updateProject/${project.id}`)}
          >
            Update Project
          </button>
          <button
            className="hover:bg-gray-500 cursor-pointer h-10 px-1 rounded-lg bg-blue-300"
            onClick={() => {
              navigate(`/apps/${project.id}`);
            }}
          >
            Add Experience Apps
          </button>
          <button className="hover:bg-gray-500 cursor-pointer h-10 px-1 rounded-lg bg-blue-300">
            Delete Project
          </button>
        </div>
      </div>
      <div className="p-5 min-w-full mt-4">
        <table className="min-w-full">
          <thead className="bg-red-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b-2 border-gray-400">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 text-left">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </table>
        <div className="h-4" />
        {/* <button onClick={() => rerender()} className="border p-2">
          Rerender
        </button> */}
      </div>
    </div>
  );
};

export default ProjectPage;
