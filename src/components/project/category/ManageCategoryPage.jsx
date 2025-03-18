import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Modal from "../../../common/Modal";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Loader from "../../../common/Loader";

const ManageCategoryPage = ({ showAlert }) => {
  // State for form data and categories
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [updateCategory, setUpdateCategory] = useState("");
  const { projectId } = useParams();
  const token = localStorage.getItem("authToken");

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sm ">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sm ">{info.getValue()}</span>
      ),
    }),
  ];

  const table = useReactTable({
    data: categories,
    columns,
    state: {
      sorting,
      // globalFilter,
    },
    onSortingChange: setSorting,
    // onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

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
        `${
          import.meta.env.VITE_BASE_URL
        }/project-attendee-category/${projectId}`,
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
        setOpen(false);
        showAlert("Category created successfull6y", "success");
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
        }/project-attendee-category/${projectId}/${updateCategory}`,
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
        setCategories([...filteredCategories, newCategory]);
        setName("");
        setDescription("");
        setUpdateCategory("");
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

  const fetchCategories = async () => {
    setLoading(true);
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
        }/project-attendee-category/${projectId}/${categoryId}`,
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
    setOpen(true);
    setUpdateCategory(categoryId);
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/project-attendee-category/${projectId}/${categoryId}`,
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
    <div className="w-full mx-auto p-4 overflow-auto text-left text-sm">
      <div className="flex flex-row justify-between items-center">
        <p className="font-sora font-bold text-transparent bg-gradient-to-l from-gradient-left to-gradient-right bg-clip-text text-[2.5rem]">
          Attendee Category
        </p>
        <button
          className="w-40 text-white bg-background-secondary 
           hover:bg-chart-background hover:ring-2 hover:outline-none 
           hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center 
           transition ease-in-out duration-150 cursor-pointer border-2 border-white disabled:bg-gray-700 disabled:text-gray-400 disabled:hover:ring-0 disabled:border-gray-400 disabled:cursor-auto"
          onClick={() => setOpen(true)}
        >
          Add Category
        </button>
      </div>
      {/* Section to display created categories */}

      {/* <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className=" border-2 border-white p-4 rounded-md flex justify-between items-center"
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
        </ul> */}
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`h-fit mt-10 p-[2px] bg-gradient-to-b from-border-gradient-left to-border-gradient-right rounded-md w-full xs:w-[70vw] sm:w-[75vw] md:w-[80vw] lg:w-[83vw] overflow-hidden`}
        >
          <div className="w-full max-h-[38rem] h-full rounded-md overflow-x-auto bg-gradient-to-b from-primary to-primary-grad">
            <table className=" py-[2rem] w-full">
              <thead className="text-sm bg-gradient-to-b from-head-gradient-top to-head-gradient-bottom border-b-2 border-head-gradient-top font-semibold text-[1.1rem] sticky top-0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-[1rem] text-center text-sm "
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="sort-indicator">
                              {{
                                asc: "↑",
                                desc: "↓",
                              }[header.column.getIsSorted()] ?? "⇅"}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="p-[1rem] text-center text-sm ">Actions</th>
                  </tr>
                ))}
              </thead>
              <tbody className={`animate-slideUp}`}>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row, index) => {
                    // Add staggered animation delay based on row index
                    const animationDelay = `${50 * (index + 1)}ms`;
                    return (
                      <tr
                        key={row.id}
                        className="py-[1rem] text-left"
                        style={{
                          animationDelay,
                          animation: "slideUp 0.5s var(--ease-snappy) forwards",
                        }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="py-[1rem] px-2 font-roboto font-normal sm:text-[0.8rem] md:text-[0.9rem]  lg:text-[1rem]  max-w-[10rem] overflow-hidden text-ellipsis"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                        <td className="">
                          <div className="flex justify-center items-center pr-2 sm:pr-4 md:pr-6 lg:pr-8 xl:pr-3 gap-2">
                            <button
                              className="cursor-pointer"
                              onClick={() => {
                                setCategoryForUpdate(row.original.id);
                                setOpen(true);
                              }}
                            >
                              <svg
                                className="w-[1.2rem]"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M18 10L14 6M2.49997 21.5L5.88434 21.124C6.29783 21.078 6.50457 21.055 6.69782 20.9925C6.86926 20.937 7.03242 20.8586 7.18286 20.7594C7.35242 20.6475 7.49951 20.5005 7.7937 20.2063L21 7C22.1046 5.89543 22.1046 4.10457 21 3C19.8954 1.89543 18.1046 1.89543 17 3L3.7937 16.2063C3.49952 16.5005 3.35242 16.6475 3.24061 16.8171C3.1414 16.9676 3.06298 17.1307 3.00748 17.3022C2.94493 17.4954 2.92195 17.7021 2.87601 18.1156L2.49997 21.5Z"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                            <button className="cursor-pointer">
                              <svg
                                className="w-[1.3rem]"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="py-10 text-center"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-text-inactive mb-1">No Categories</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col  w-fit p-[2px] bg-gradient-to-r from-border-gradient-left to-border-gradient-right rounded-[1.2rem] gap-[2px] shadow-2xl shadow-border-gradient-left/20 overflow-auto">
          <form
            onSubmit={(e) =>
              updateCategory ? handleUpdateCategory(e) : handleSubmit(e)
            }
            className="z-10 w-[18rem] sm:w-[25rem] md:w-[35rem] h-fit bg-background-primary rounded-[1.1rem] flex flex-col justify-evenly items-center p-[2rem] gap-y-[2rem] text-left"
          >
            <div className="w-full">
              <label
                className=" text-sm font-medium text-gray-700"
                htmlFor="name"
              >
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

            <div className="w-full">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 w-full"
              >
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
        </div>
      </Modal>
    </div>
  );
};

export default ManageCategoryPage;
