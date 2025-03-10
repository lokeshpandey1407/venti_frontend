import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const ManageCategoryFormFieldPage = () => {
  // State for form fields
  const [categoryId, setCategoryId] = useState("");
  const [formFieldsData, setFormFieldsData] = useState([]);

  // State to store API data
  const [categories, setCategories] = useState([]);
  const [formFields, setFormFields] = useState([]);

  // State for loading
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingFormFields, setLoadingFormFields] = useState(true);
  const token = localStorage.getItem("authToken");

  const { projectId } = useParams();

  const handleChangeCategory = async (categoryId) => {
    setCategoryId(categoryId);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/projectAttendeeCategory/${projectId}/getFormFieldsByCategory/${categoryId}`,
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
        setFormFieldsData(res.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleBooleanChange = (e, fieldId) => {
    const { name, checked } = e.target; //
    setFormFieldsData((prev) => {
      return prev.map((data) => {
        if (data.form_field_id === fieldId) {
          return { ...data, [name]: checked };
        }
        return data;
      });
    });
  };

  const handleCheckboxChange = (fieldId) => {
    const isRowSelected = formFieldsData.some(
      (data) => data.form_field_id === fieldId
    );

    if (isRowSelected) {
      setFormFieldsData((prevData) =>
        prevData.filter((data) => data.form_field_id !== fieldId)
      );
    } else {
      const newDataObject = {
        form_field_id: fieldId,
        category_id: categoryId,
        dashboard_required: false,
        attendee_visible: false,
        attendee_editable: false,
        attendee_required: false,
        app_shared: false,
      };

      setFormFieldsData((prevData) => [...prevData, newDataObject]);
    }
  };

  const columnHelper = createColumnHelper();
  // Table Columns
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => {
        const isRowSelected = formFieldsData.some(
          (data) => data.form_field_id === info.getValue()
        );

        return (
          <input
            type="checkbox"
            name="category_id"
            checked={isRowSelected}
            onChange={() => handleCheckboxChange(info.getValue())}
            className="h-5 w-5"
          />
        );
      },
      header: () => <span>Select</span>,
    }),

    columnHelper.accessor("name", {
      header: () => <span>Field Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("type", {
      header: () => <span>Field type</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dashboard_required", {
      header: () => <span>Dashboard Required</span>,
      cell: (info) => {
        const rowData = formFieldsData.find(
          (data) => data.form_field_id === info.row.original.id
        );

        return (
          <div className="flex flex-row gap-1 items-center jusify-center">
            <input
              type="checkbox"
              name="dashboard_required"
              checked={rowData ? rowData?.dashboard_required : false}
              onChange={(e) => handleBooleanChange(e, info.row.original.id)}
              className="h-5 w-5"
            />
            <label htmlFor="">Dashboard Required</label>
          </div>
        );
      },
    }),

    columnHelper.accessor("attendee_visible", {
      header: () => <span>Attendee Visible</span>,
      cell: (info) => {
        const rowData = formFieldsData.find(
          (data) => data.form_field_id === info.row.original.id
        );

        return (
          <div className="flex flex-row gap-1 items-center jusify-center">
            <input
              type="checkbox"
              name="attendee_visible"
              checked={rowData ? rowData.attendee_visible : false}
              onChange={(e) => handleBooleanChange(e, info.row.original.id)}
              className="h-5 w-5"
            />
            <label htmlFor="">Attendee Visible</label>
          </div>
        );
      },
    }),
    columnHelper.accessor("attendee_editable", {
      header: () => <span>Attendee Editable</span>,
      cell: (info) => {
        const rowData = formFieldsData.find(
          (data) => data.form_field_id === info.row.original.id
        );

        return (
          <div className="flex flex-row gap-1 items-center jusify-center">
            <input
              type="checkbox"
              name="attendee_editable"
              checked={rowData ? rowData.attendee_editable : false}
              onChange={(e) => handleBooleanChange(e, info.row.original.id)}
              className="h-5 w-5"
            />
            <label htmlFor="">Attendee Editable</label>
          </div>
        );
      },
    }),
    columnHelper.accessor("attendee_required", {
      header: () => <span>Attendee Required</span>,
      cell: (info) => {
        const rowData = formFieldsData.find(
          (data) => data.form_field_id === info.row.original.id
        );

        return (
          <div className="flex flex-row gap-1 items-center jusify-center">
            <input
              type="checkbox"
              name="attendee_required"
              checked={rowData ? rowData.attendee_required : false}
              onChange={(e) => handleBooleanChange(e, info.row.original.id)}
              data-field-id={info.row.original.form_field_id}
              className="h-5 w-5"
            />
            <label htmlFor="">Attendee Required</label>
          </div>
        );
      },
    }),
    columnHelper.accessor("app_shared", {
      header: () => <span>App Shared</span>,
      cell: (info) => {
        const rowData = formFieldsData.find(
          (data) => data.form_field_id === info.row.original.id
        );

        return (
          <div className="flex flex-row gap-1 items-center jusify-center">
            <input
              type="checkbox"
              name="app_shared"
              checked={rowData ? rowData.app_shared : false}
              onChange={(e) => handleBooleanChange(e, info.row.original.id)}
              className="h-5 w-5"
            />
            <label htmlFor="">App Shared</label>
          </div>
        );
      },
    }),
  ];

  // Use TanStack Table hook
  const table = useReactTable({
    columns,
    data: formFields,
    getCoreRowModel: getCoreRowModel(),
  });

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoadingCategories(true);
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
      setLoadingCategories(false);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fetch form fields from API
  const fetchFields = async () => {
    setLoadingFormFields(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/projectFormField/${projectId}`,
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
        setFormFields(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching fields.");
    } finally {
      setLoadingFormFields(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchFields();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId || formFieldsData.length === 0) {
      alert("Please fill required fields");
      return;
    }

    // Collect form data and handle submission logic here
    console.log("Form Submitted:", formFieldsData);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/projectAttendeeCategory/${projectId}/addFieldsToCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formFieldsData),
        }
      );
      if (!response.ok) {
        alert("Some error occured");
        return;
      }
      const res = await response.json();
      if (res.success) {
        alert("fields added successfully");
        setFormFieldsData([]);
        setCategoryId("");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-full mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Category Form Field</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-row-2 gap-4">
          {/* Category Dropdown */}
          <div className="flex flex-col max-w-lg">
            <label
              htmlFor="categoryId"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Category ID
            </label>
            <select
              id="categoryId"
              value={categoryId}
              onChange={(e) => handleChangeCategory(e.target.value)}
              className="border border-gray-300 rounded p-2"
              disabled={loadingCategories}
              required
            >
              <option value="">Select a Category</option>
              {loadingCategories ? (
                <option>Loading categories...</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Form Field table*/}
          {!loadingFormFields && (
            <table className="table-auto w-full border border-gray-300 rounded">
              <thead className=" bg-blue-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="p-2 text-left">
                    {headerGroup.headers.map((header) => (
                      <th className="p-2">
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
              <tbody className="mt-2">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b-2 border-gray-400 my-2">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageCategoryFormFieldPage;
