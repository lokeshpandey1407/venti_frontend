import React, { useState, useEffect } from "react";
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

const ManageFormFields = ({ showAlert }) => {
  const [name, setName] = useState("");
  const defaultField = {
    name: "",
    type: "",
    default: "",
    attribute: "{}",
    field_info: "",
  };
  const [handleField, setHandleField] = useState(defaultField);
  const [oldFieldData, setOldFieldData] = useState(defaultField);
  const [newField, setNewField] = useState(false);
  const [type, setType] = useState("text"); // Assume 'text' is the default type
  const [defaultValue, setDefaultValue] = useState("");
  const [attribute, setAttribute] = useState("");
  const [fieldInfo, setFieldInfo] = useState("");
  const [fields, setFields] = useState([]);
  const [updateField, setUpdateField] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [sorting, setSorting] = useState([]);
  const token = localStorage.getItem("authToken");
  const { projectId } = useParams();

  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);

  // State to store the final JSON object
  const [jsonResult, setJsonResult] = useState("{}");
  const columnHelper = createColumnHelper();

  // Handle change for key-value pair (for now not using the extra attributes)
  // const handleChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const updatedPairs = [...keyValuePairs];
  //   updatedPairs[index][name] = value;
  //   setKeyValuePairs(updatedPairs);
  // };

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sm ">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("type", {
      header: "Field Type",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sm ">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("field_info", {
      header: "Description",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sm ">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("default", {
      header: "Default Value",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sm ">{info.getValue()}</span>
      ),
    }),
  ];

  const table = useReactTable({
    data: fields,
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

  // Add a new key-value pair(for now not using the extra attributes)
  // const handleAddRow = () => {
  //   setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  // };

  // Remove a key-value pair(for now not using the extra attributes)
  // const handleRemoveRow = (index) => {
  //   const updatedPairs = keyValuePairs.filter((_, i) => i !== index);
  //   setKeyValuePairs(updatedPairs);
  // };

  // (for now not using the extra attributes)
  // const generateJson = () => {
  //   const jsonObject = keyValuePairs.reduce((acc, { key, value }) => {
  //     if (key && value) {
  //       acc[key] = value;
  //     }
  //     return acc;
  //   }, {});

  //   setJsonResult(JSON.stringify(jsonObject, null, 2));
  //   return jsonObject;
  // };

  // Handle form submission (Create field)
  const handleSubmit = async () => {
    // Form validation
    if (!handleField.name || !handleField.default) {
      showAlert("Name and default value is required", "error");
      return;
    }
    if (!handleField.type) {
      showAlert("Field type is required", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project-form-field/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(handleField),
        }
      );

      if (!response.ok) {
        alert("Error occurred while creating the field.");
        setLoading(false);
        return;
      }

      const res = await response.json();
      if (res.success) {
        setFields([...fields, res.data]);
        setHandleField(defaultField);
        setNewField(false);
        setKeyValuePairs([]);
        showAlert("Field created successfully", "success");
      } else {
        showAlert("Failed to create field.", "error");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the field.");
    } finally {
      setLoading(false);
      setHandleField(defaultField);
      setNewField(false);
    }
  };

  // Fetch fields on component load
  const fetchFields = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project-form-field/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Error fetching fields.");
        return;
      }

      const res = await response.json();
      if (res.success) {
        setFields(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching fields.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete field
  const handleDelete = async (fieldId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/project-form-field/${projectId}/${fieldId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Error deleting the field.");
        setLoading(false);
        return;
      }

      const res = await response.json();
      if (res.success) {
        setFields(fields.filter((field) => field.id !== fieldId));
        alert("Field deleted successfully");
      } else {
        alert("Failed to delete the field.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the field.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setHandleField({
      ...handleField,
      [e.target.name]: e.target.value,
    });
  };

  // Handle update field
  const handleUpdateField = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/project-form-field/${projectId}/${updateField}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(handleField),
        }
      );

      if (!response.ok) {
        showAlert("Error updating the field.", "error");
        setLoading(false);
        return;
      }

      const res = await response.json();
      if (res.success) {
        const updatedFields = fields.map((field) =>
          field.id === updateField ? res.data : field
        );
        setFields(updatedFields);
        setKeyValuePairs([]);
        showAlert("Field updated successfully", "success");
      } else {
        showAlert("Failed to update the field.", "error");
      }
    } catch (err) {
      console.error(err);
      showAlert("An error occurred while updating the field.", "error");
    } finally {
      setLoading(false);
    }
  };

  //Function to create or update the category using the tanstack table functions
  const fieldHandler = async () => {
    if (updateField === "") {
      await handleSubmit();
      setNewField(false);
    } else {
      await handleUpdateField();
      setUpdateField("");
    }
    setUpdateField("");
    setHandleField(defaultField);
    setOldFieldData(defaultField);
  };

  const setFieldForUpdate = async (fieldId) => {
    setUpdateField(fieldId);
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/project-form-field/${projectId}/${fieldId}`,
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
        setType(res.data.type);
        setDefaultValue(res.data.default);
        setAttribute(res.data.attribute);
        setFieldInfo(res.data.field_info);
        let attributes = [];
        Object.entries(res.data.attribute).map(([key, value]) => {
          const attribute = { key: key, value: value };
          attributes.push(attribute);
        });
        setKeyValuePairs(attributes);
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
    fetchFields();
  }, [projectId]);

  return (
    <div className="w-full mx-auto p-4 overflow-auto text-left text-sm">
      <p className="font-sora font-bold text-transparent bg-gradient-to-l from-gradient-left to-gradient-right bg-clip-text text-[2.5rem]">
        Form Fields
      </p>

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
                <tr>
                  <td
                    className={`pl-2 xl:pl-4 py-2 h-[3rem] uppercase max-w-[10rem] overflow-hidden text-ellipsis`}
                  >
                    {!newField ? (
                      <button
                        onClick={() => {
                          setNewField(!newField);
                          setUpdateField("");
                          setUpdateField("");
                          setHandleField(defaultField);
                          setOldFieldData(defaultField);
                        }}
                        className="text-nowrap text-[#F7A305] font-bold pt-2 cursor-pointer"
                      >
                        + ADD NEW
                      </button>
                    ) : (
                      <div className="h-fit w-fit border-b-2">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Name"
                          className="text-left text-text border-none ring-transparent bg-transparent w-[9rem] outline-0 p-2"
                          value={handleField.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    )}
                  </td>

                  <td className={`py-2`}>
                    {newField ? (
                      <div className="h-fit w-fit border-b-2">
                        <select
                          id="type"
                          value={handleField.type}
                          name="type"
                          onChange={handleInputChange}
                          className="text-left text-text border-none ring-transparent bg-transparent w-[9rem] outline-0 p-2"
                        >
                          <option value="text">Text</option>
                          <option value="tel">Phone</option>
                          <option value="email">Email</option>
                          <option value="toggle">Toggle</option>
                          <option value="number">Number</option>
                          <option value="url">Url</option>
                        </select>
                      </div>
                    ) : (
                      " "
                    )}
                  </td>
                  <td className={`py-2`}>
                    {newField ? (
                      <div className="w-fit h-fit border-b-2 ">
                        <input
                          type="text"
                          name="field_info"
                          placeholder="Enter description"
                          className="text-left text-text border-none ring-transparent bg-transparent outline-0 p-2"
                          value={handleField.field_info}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    ) : (
                      " "
                    )}
                  </td>
                  <td className={`py-2`}>
                    {newField ? (
                      <div className="w-fit h-fit border-b-2 ">
                        <input
                          type="text"
                          name="default"
                          placeholder="Default Value"
                          className="text-left text-text border-none ring-transparent bg-transparent outline-0 p-2"
                          value={handleField.default}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    ) : (
                      " "
                    )}
                  </td>
                  <td>
                    {newField ? (
                      <div className="flex justify-center items-center pt-[0.5rem]">
                        <button
                          onClick={fieldHandler}
                          className="text-left text-text border-none ring-transparent bg-transparent cursor-pointer"
                        >
                          {/* "Confirm" */}
                          <svg
                            viewBox="0 -0.5 25 25"
                            fill="none"
                            className="w-[1.8rem]"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M5.5 12.5L10.167 17L19.5 8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>
                        </button>
                        <button
                          onClick={() => setNewField(!newField)}
                          className="text-text flex justify-center items-center"
                        >
                          {/* "Cancel" */}
                          <svg
                            viewBox="0 -0.5 25 25"
                            fill="none"
                            className="w-[1.8rem]"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                                fill="currentColor"
                              ></path>{" "}
                            </g>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      " "
                    )}
                  </td>
                </tr>
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
                            {cell.column.columnDef.header === "Name" &&
                            updateField === row.original.id ? (
                              <div className="w-fit h-fit border-b-2">
                                <input
                                  type="text"
                                  name="name"
                                  className="text-left text-sm text-text border-none ring-transparent bg-transparent w-[10rem] outline-0"
                                  value={handleField.name}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            ) : cell.column.columnDef.header === "Field Type" &&
                              updateField === row.original.id ? (
                              <div className="h-fit w-fit border-b-2 ml-2">
                                <select
                                  id="type"
                                  value={handleField.type}
                                  name="type"
                                  onChange={handleInputChange}
                                  className="text-left text-sm text-text border-none ring-transparent bg-transparent w-[9rem] outline-0"
                                >
                                  <option value="text">Text</option>
                                  <option value="tel">Phone</option>
                                  <option value="email">Email</option>
                                  <option value="toggle">Toggle</option>
                                  <option value="number">Number</option>
                                  <option value="url">Url</option>
                                </select>
                              </div>
                            ) : cell.column.columnDef.header ===
                                "Description" &&
                              updateField === row.original.id ? (
                              <div className="w-fit h-fit border-b-2">
                                <input
                                  type="text"
                                  name="field_info"
                                  className="text-left text-sm text-text border-none ring-transparent bg-transparent w-[10rem] outline-0"
                                  value={handleField.field_info}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            ) : cell.column.columnDef.header ===
                                "Default Value" &&
                              updateField === row.original.id ? (
                              <div className="w-fit h-fit border-b-2">
                                <input
                                  type="text"
                                  name="default"
                                  className="text-left text-sm text-text border-none ring-transparent bg-transparent w-[10rem] outline-0"
                                  value={handleField.default}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            ) : (
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
                          </td>
                        ))}
                        <td>
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => {
                                if (updateField !== row.original.id) {
                                  // setChanger(row.original.uid);
                                  setHandleField(row.original);
                                  setNewField(false);
                                  setOldFieldData(row.original);
                                  setUpdateField(row.original.id);
                                } else {
                                  fieldHandler();
                                }
                              }}
                              className="text-text flex justify-center items-center"
                            >
                              {updateField === row.original.id ? (
                                // "Confirm"
                                <svg
                                  viewBox="0 -0.5 25 25"
                                  fill="none"
                                  className="w-[1.8rem]"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      d="M5.5 12.5L10.167 17L19.5 8"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>{" "}
                                  </g>
                                </svg>
                              ) : (
                                // "Change"
                                <svg
                                  viewBox="0 -0.5 25 25"
                                  className="w-[1.8rem]"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>{" "}
                                    <path
                                      d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
                                      fill="currentColor"
                                    ></path>{" "}
                                  </g>
                                </svg>
                              )}
                            </button>
                            <button
                              onClick={() => {
                                if (updateField !== row.original.id) {
                                  handleDelete(row.original.id);
                                } else {
                                  setUpdateField("");
                                  setHandleField(defaultField);
                                }
                              }}
                              className="text-text flex justify-center items-center gap-1"
                            >
                              {updateField === row.original.id ? (
                                // "Cancel"
                                <svg
                                  viewBox="0 -0.5 25 25"
                                  fill="none"
                                  className="w-[1.8rem]"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                                      fill="currentColor"
                                    ></path>{" "}
                                  </g>
                                </svg>
                              ) : (
                                // "Delete"
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="w-[1.8rem]"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M7.33856 16.754C7.35772 17.9823 8.32114 18.9749 9.51866 19H13.8828C15.0479 18.977 15.9978 18.0346 16.059 16.841C16.0668 16.725 16.0726 16.609 16.0892 16.495L17.54 6.145C17.5829 5.86079 17.5036 5.57145 17.3226 5.35182C17.1416 5.13219 16.8766 5.00385 16.5962 5H6.80524C6.52485 5.00385 6.25986 5.13219 6.07883 5.35182C5.89779 5.57145 5.81849 5.86079 5.86144 6.145L7.32394 16.58C7.33187 16.6377 7.33675 16.6958 7.33856 16.754Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>{" "}
                                    <path
                                      d="M10.2517 13.1222C10.4699 12.7702 10.3614 12.3078 10.0094 12.0896C9.65731 11.8714 9.19499 11.9798 8.97675 12.3319L10.2517 13.1222ZM9.58168 13.3839L10.2555 13.0545L10.2555 13.0545L9.58168 13.3839ZM10.1144 13.7501L10.0569 14.4978C10.076 14.4993 10.0952 14.5001 10.1144 14.5001V13.7501ZM10.908 14.5001C11.3222 14.5001 11.658 14.1643 11.658 13.7501C11.658 13.3358 11.3222 13.0001 10.908 13.0001V14.5001ZM14.4247 12.3319C14.2064 11.9798 13.7441 11.8714 13.3921 12.0896C13.04 12.3078 12.9315 12.7702 13.1498 13.1222L14.4247 12.3319ZM13.8197 13.3839L13.146 13.0545L13.146 13.0545L13.8197 13.3839ZM13.287 13.7501V14.5001C13.3062 14.5001 13.3254 14.4993 13.3445 14.4978L13.287 13.7501ZM12.4944 13.0001C12.0801 13.0001 11.7444 13.3358 11.7444 13.7501C11.7444 14.1643 12.0801 14.5001 12.4944 14.5001V13.0001ZM9.99106 10.409C9.75687 10.7507 9.844 11.2175 10.1857 11.4517C10.5273 11.6859 10.9941 11.5987 11.2283 11.2571L9.99106 10.409ZM11.2005 9.97106L11.8192 10.3951C11.8352 10.3717 11.8498 10.3475 11.8631 10.3225L11.2005 9.97106ZM12.2009 9.97106L11.5383 10.3225C11.5516 10.3475 11.5663 10.3717 11.5823 10.3951L12.2009 9.97106ZM12.1731 11.2571C12.4073 11.5987 12.8741 11.6859 13.2158 11.4517C13.5574 11.2175 13.6445 10.7507 13.4104 10.409L12.1731 11.2571ZM8.97675 12.3319C8.71784 12.7496 8.69244 13.2727 8.9079 13.7133L10.2555 13.0545C10.266 13.076 10.2653 13.1003 10.2517 13.1222L8.97675 12.3319ZM8.9079 13.7133C9.12421 14.1558 9.55726 14.4594 10.0569 14.4978L10.1719 13.0023C10.2156 13.0056 10.2441 13.0313 10.2555 13.0545L8.9079 13.7133ZM10.1144 14.5001H10.908V13.0001H10.1144V14.5001ZM13.1498 13.1222C13.1362 13.1003 13.1355 13.076 13.146 13.0545L14.4935 13.7133C14.709 13.2727 14.6836 12.7496 14.4247 12.3319L13.1498 13.1222ZM13.146 13.0545C13.1573 13.0313 13.1859 13.0056 13.2295 13.0023L13.3445 14.4978C13.8442 14.4594 14.2772 14.1558 14.4935 13.7133L13.146 13.0545ZM13.287 13.0001H12.4944V14.5001H13.287V13.0001ZM11.2283 11.2571L11.8192 10.3951L10.5819 9.54702L9.99106 10.409L11.2283 11.2571ZM11.8631 10.3225C11.836 10.3737 11.7766 10.4161 11.7007 10.4161V8.91614C11.2077 8.91614 10.7645 9.19257 10.538 9.61962L11.8631 10.3225ZM11.7007 10.4161C11.6248 10.4161 11.5655 10.3737 11.5383 10.3225L12.8634 9.61962C12.6369 9.19257 12.1938 8.91614 11.7007 8.91614V10.4161ZM11.5823 10.3951L12.1731 11.2571L13.4104 10.409L12.8195 9.54702L11.5823 10.3951Z"
                                      fill="currentColor"
                                    ></path>{" "}
                                  </g>
                                </svg>
                              )}
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

      {/*create and update field Modal */}
      {/* <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col max-h-130  w-150 p-[2px] bg-gradient-to-r from-border-gradient-left to-border-gradient-right rounded-[1.2rem] gap-[2px] shadow-2xl shadow-border-gradient-left/20 overflow-auto">
          <form
            onSubmit={(e) => (updateField ? handleUpdate(e) : handleSubmit(e))}
            className="z-10 w-full h-fit bg-background-primary rounded-[1.1rem] flex flex-col justify-evenly items-center p-[2rem] gap-y-[2rem] text-left"
          >
            <div className="w-full">
              <label htmlFor="name" className="block text-lg">
                Title
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter field name"
              />
            </div>

            <div className="w-full">
              <label htmlFor="field_info" className="block text-lg">
                Description
              </label>
              <input
                id="field_info"
                type="text"
                name="field_info"
                value={fieldInfo}
                onChange={(e) => setFieldInfo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter field information"
              />
            </div>

            <div className="w-full">
              <label htmlFor="type" className="block text-lg">
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="text">Text</option>
                <option value="tel">Phone</option>
                <option value="email">Email</option>
                <option value="toggle">Toggle</option>
                <option value="number">Number</option>
                <option value="url">Url</option>
              </select>
            </div>

            <div className="w-full">
              <label htmlFor="default" className="block text-lg">
                Default Value
              </label>
              <input
                id="default"
                type="text"
                value={defaultValue}
                onChange={(e) => setDefaultValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter default value"
              />
            </div>

            {/* <div className="w-full mx-auto p-6">
              <h2 className="text-2xl font-semibold mb-4">Attributes</h2>

             
               <div className="space-y-4">
                {keyValuePairs.map((pair, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-full">
                      <label htmlFor={`key-${index}`} className="block text-lg">
                        Key
                      </label>
                      <input
                        id={`key-${index}`}
                        name="key"
                        type="text"
                        value={pair.key}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter key"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor={`value-${index}`}
                        className="block text-lg"
                      >
                        Value
                      </label>
                      <input
                        id={`value-${index}`}
                        name="value"
                        type="text"
                        value={pair.value}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter value"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveRow(index)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}

               
              <div>
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                  Add Key-Value Pair
                </button>
              </div>
              </div>
            </div> */}

      {/* <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              {updateField ? "Update field" : "Create Field"}
            </button>
          </form> */}
      {/* </div> */}
      {/* </Modal> */}
    </div>
  );
};

export default ManageFormFields;
