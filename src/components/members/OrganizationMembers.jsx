import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Loader from "../../common/Loader";

const OrgMembers = ({ showAlert }) => {
  const [members, setMembers] = useState([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const orgId = localStorage.getItem("orgId");

  const columnHelper = createColumnHelper();
  const token = localStorage.getItem("authToken");

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sm ">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sm ">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("user_type", {
      header: "User type",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sm ">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("is_active", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        let statusClasses = "px-2 py-1 rounded text-sm ";

        if (status) {
          statusClasses += "bg-tick-green/20 text-tick-green";
        } else {
          statusClasses += "bg-verify-error/20 text-verify-error";
        }

        return (
          <span className={statusClasses}>
            {status ? "Active" : "Inactive"}
          </span>
        );
      },
    }),
    // columnHelper.display({
    //   id: "actions",
    //   header: "",
    //   cell: () => (
    //     <button className="p-1.5 rounded hover:bg-background-secondary transition-colors">
    //       <svg
    //         width="20"
    //         height="20"
    //         viewBox="0 0 15 15"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
    //           fill="currentColor"
    //           fillRule="evenodd"
    //           clipRule="evenodd"
    //         ></path>
    //       </svg>
    //     </button>
    //   ),
    // }),
  ];

  // Initialize TanStack table
  const table = useReactTable({
    data: members,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const fetchOrgMembers = async () => {
    setIsLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/get-users-by-org/${orgId}`,
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
      setMembers(res.data);

      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error:", error); // Log the error for debugging
      alert("An unexpected error occurred. Please try again."); // Alert a generic error message
    } finally {
      setIsLoading(false); // Set loading to false in the finally block
    }
  };

  const handleAddMember = async () => {
    if (!newMemberEmail.trim()) {
      showAlert("Please enter an email address", "error");
      return;
    }
    if (!isValidEmail(newMemberEmail)) {
      showAlert("Please enter a valid email address", "error");
      return;
    }
    setIsAdding(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/organization/assign-organization-to-user?email=${newMemberEmail}&organizationId=${orgId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );
      const res = await response.json();
      if (!response.ok) {
        showAlert(res.message || "Error occured", "error");
      }
      if (res.success) {
        showAlert("User added to Organization successfully", "success");
        fetchOrgMembers();
        setNewMemberEmail("");
      }
      setIsAdding(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    fetchOrgMembers();
  }, []);

  return (
    <div className="min-h-scree w-full p-4 md:p-8">
      <div className={`max-w-7xl mx-auto ${"animate-fadeIn"}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="font-sora font-bold text-transparent bg-gradient-to-l from-gradient-left to-gradient-right bg-clip-text text-[2.5rem]">
              Organization Members
            </p>
            <p className="font-sora text-left font-medium text-[1.4rem]  max-w-[35rem] text-wrap">
              Manage your organization members.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* <div className="relative w-full md:w-64"> */}
            {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"> */}
            {/* <Search size={18} className="text-text-inactive" /> */}
            {/* </div> */}
            {/* <input
                type="text"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search members..."
                className="w-full pl-10 pr-4 py-2.5 bg-field rounded border border-border-secondary/30 text-text focus-ring"
              /> */}
            {/* </div> */}

            <div className="flex w-full md:w-auto">
              <input
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Add member by email"
                className="flex-1 md:w-64 px-4 py-2.5 bg-field rounded-l border-y border-l border-border-secondary/30 text-text focus-ring"
              />
              <button
                onClick={handleAddMember}
                disabled={isAdding}
                className="bg-button-accent cursor-pointer hover:bg-button-accent/90 text-white px-4 py-2.5 rounded-r border border-button-accent flex items-center justify-center transition-all duration-300 focus-ring disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <p>+</p>
                )}
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div
            className={`h-fit mt-10 p-[2px] bg-gradient-to-b from-border-gradient-left to-border-gradient-right rounded-md w-full xs:w-[70vw] sm:w-[75vw] md:w-[80vw] lg:w-[83vw] overflow-hidden`}
          >
            <div
              className="w-full max-h-[38rem]
                
               h-full rounded-md overflow-x-auto bg-gradient-to-b from-primary to-primary-grad"
            >
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
                            animation:
                              "slideUp 0.5s var(--ease-snappy) forwards",
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
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="py-10 text-center"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-background-secondary/60 flex items-center justify-center mb-3">
                            {/* <Users size={20} className="text-text-inactive" /> */}
                            <p>Uses</p>
                          </div>
                          <p className="text-text-inactive mb-1">
                            No members found
                          </p>
                          <p className="text-text-inactive text-sm">
                            {globalFilter
                              ? "Try a different search term"
                              : "Add members to your organization"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-border-secondary/20 gap-4">
              <div className="text-text-inactive text-sm">
                Showing {table.getRowModel().rows.length} of {members.length}{" "}
                members
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2 rounded border border-border-secondary/30 hover:bg-background-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>

                <span className="text-sm">
                  Page{" "}
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
                </span>

                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="p-2 rounded border border-border-secondary/30 hover:bg-background-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.1584 3.13514C5.95694 3.32401 5.94673 3.64042 6.13559 3.84188L9.565 7.49991L6.13559 11.1579C5.94673 11.3594 5.95694 11.6758 6.1584 11.8647C6.35986 12.0535 6.67627 12.0433 6.86514 11.8419L10.6151 7.84188C10.7954 7.64955 10.7954 7.35027 10.6151 7.15794L6.86514 3.15794C6.67627 2.95648 6.35986 2.94628 6.1584 3.13514Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgMembers;
