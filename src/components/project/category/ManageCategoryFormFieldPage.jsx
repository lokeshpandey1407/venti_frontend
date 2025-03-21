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
        }/project-attendee-category/${projectId}/get-form-fields-by-category/${categoryId}`,
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
        const dataMap = res.data.map((data) => {
          return {
            form_field_id: data.form_field_id,
            category_id: data.category_id,
            dashboard_required: data.dashboard_required,
            attendee_visible: data.attendee_visible,
            attendee_editable: data.attendee_editable,
            attendee_required: data.attendee_required,
            app_shared: data.app_shared,
          };
        });
        setFormFieldsData((prev) => [...dataMap]);
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

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/project-attendee-category/${projectId}/add-fields-to-category`,
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
    <div className="max-w-full  p-4">
      <p className=" text-left font-sora font-bold text-transparent bg-gradient-to-l from-gradient-left to-gradient-right bg-clip-text text-[2.5rem]">
        Category Form Fields
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-row-2 gap-4">
          {/* Category Dropdown */}
          <div className="flex flex-col w-lg">
            <label
              htmlFor="categoryId"
              className="mb-2 text-sm text-left font-medium text-white"
            >
              Category
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
            <div
              className={`h-fit mt-10 p-[2px] bg-gradient-to-b from-border-gradient-left to-border-gradient-right rounded-md w-full xs:w-[70vw] sm:w-[75vw] md:w-[80vw] lg:w-[83vw] overflow-hidden`}
            >
              <div
                className="w-full max-h-[38rem]
             h-full rounded-md overflow-x-auto bg-gradient-to-b from-primary to-primary-grad"
              >
                <table className=" py-[2rem] w-full text-sm ">
                  <thead className="text-sm bg-gradient-to-b from-head-gradient-top to-head-gradient-bottom border-b-2 border-head-gradient-top font-semibold text-[1.1rem] sticky top-0">
                    {table.getHeaderGroups().map((headerGroup, index) => (
                      <tr key={index} className="p-2 text-left">
                        {headerGroup.headers.map((header, index) => (
                          <th
                            key={index}
                            className="p-[1rem] text-center text-sm px-2 "
                          >
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
                      <tr
                        key={row.id}
                        className="border-b-2 border-gray-400 my-2"
                      >
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
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full text-white bg-background-secondary 
            hover:bg-chart-background hover:ring-2 hover:outline-none 
            hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center 
            transition ease-in-out duration-150 mt-10 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageCategoryFormFieldPage;
