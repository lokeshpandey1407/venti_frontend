import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const AddApp = () => {
  const { experienceId, appId } = useParams();
  const [experience, setExperience] = useState({});
  const [formData, setFormData] = useState({});
  const [completeData, setCompleteData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [newRowData, setNewRowData] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  const [addingNewRow, setAddingNewRow] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(new Set());
  const [updatedFields, setUpdatedFields] = useState({});
  const [experienceLoading, setExperienceLoading] = useState(true);
  const [appLoading, setAppLoading] = useState(appId ? true : false);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const token = localStorage.getItem("authToken");
  const fetchExperience = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/experience/get-experience/${experienceId}`,
        { method: "Get" }
      );
      if (response.ok) {
        const res = await response.json();
        setExperience(res.data);
        if (!appId) {
          setFormData(res.data.settings_structure);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setExperienceLoading(false);
    }
  };

  const fetchApp = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/experience-app/${projectId}/get-experience-app/${appId}`,
        { method: "Get", headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const res = await response.json();
        setCompleteData(res.data);
        setFormData(res.data.configuration);
        setAppLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAppLoading(false);
    }
  };

  const handleInputChange = (fieldId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      fields: prevData.fields.map((field) =>
        field.id === fieldId ? { ...field, value } : field
      ),
    }));
    setUpdatedFields((prev) => ({ ...prev, [fieldId]: value }));

    if (typeof value === "string" && value.startsWith("data:image")) {
      setUploadedImages((prev) => new Set(prev).add(fieldId));
    }
  };

  const handleChange = (name, value) => {
    setCompleteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderInputCard = (field) => {
    if (!field || !field.type) {
      console.error("Invalid field data:", field);
      return null;
    }

    switch (field.type) {
      case "Number":
        return (
          <div
            key={field.id}
            className=" h-[6rem] w-full lg:w-[26.5rem] rounded-lg flex justify-between px-4 items-center card border-2 border-gradient-left shadow-inner shadow-border-gradient-right/80"
          >
            <div className="grid items-center w-full gap-8">
              <div className="flex flex-col w-full space-y-1.5 ">
                <label htmlFor={field.id} className="text-left pl-2 capitalize">
                  {field.name}
                </label>
                <input
                  id={field.id}
                  placeholder={field.value}
                  type="number"
                  value={field.value}
                  onChange={(e) =>
                    handleInputChange(field.id, parseInt(e.target.value))
                  }
                  className="flex h-10 w-full rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                />
              </div>
            </div>
          </div>
        );

      case "Color":
        return (
          <div
            key={field.id}
            className="h-[6rem] w-full lg:w-[26.5rem] rounded-lg flex justify-between px-4 items-center card border-2 border-gradient-left shadow-inner shadow-border-gradient-right/80"
          >
            <div className="flex w-full gap-2 justify-end h-fit items-end">
              <div className="flex flex-col space-y-1.5 w-full">
                <label htmlFor={field.id} className="text-left pl-2 capitalize">
                  {field.name}
                </label>
                <input
                  id={field.id}
                  placeholder={field.value}
                  value={field.value}
                  className="flex h-10 w-full rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              </div>
              <input
                id={`${field.id}-color`}
                type="color"
                className="flex h-10 w-[8rem] rounded-lg outline-none bg-transparent border-[1px] border-sky-600 py-2 px-3"
                value={field.value}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            </div>
          </div>
        );

      case "DateTime":
        return (
          <div
            key={field.id}
            className="h-[6rem] w-full lg:w-[26.5rem] rounded-lg flex justify-between px-4 items-center card border-2 border-gradient-left shadow-inner shadow-border-gradient-right/80"
          >
            <div className="flex w-full gap-2 justify-end h-fit items-end">
              <div className="flex flex-col space-y-1.5 w-full">
                <label htmlFor={field.id} className="text-left pl-2 capitalize">
                  {field.name}
                </label>
                <input
                  id={field.id}
                  placeholder={field.value}
                  type="datetime-local"
                  value={field.value}
                  className="flex h-10 w-full rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              </div>
              {/* <input
                                id={`${field.id}-color`}
                                type="color"
                                className="flex h-10 w-[8rem] rounded-lg outline-none bg-transparent border-[1px] border-sky-600 py-2 px-3"
                                value={field.value}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                            /> */}
            </div>
          </div>
        );

      case "NumberRange":
        return (
          <div
            key={field.id}
            className="h-[6rem] w-full lg:w-[26.5rem] rounded-lg flex justify-start px-4 items-center card border-2 border-gradient-left shadow-inner shadow-border-gradient-right/80"
          >
            <div className="flex w-full gap-1 justify-start h-fit items-center mt-[-1rem]">
              <div className="flex flex-col space-y-1.5 w-full justify-start items-start">
                <label htmlFor={field.id} className="text-left pl-2 capitalize">
                  {field.name}
                </label>
                <div class="relative w-full">
                  <input
                    id={field.id}
                    type="range"
                    max={field.range[1] || 100}
                    min={field.range[0] || 0}
                    value={field.value}
                    step={1}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    onChange={(e) =>
                      handleInputChange(field.id, parseInt(e.target.value))
                    }
                  />
                  <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                    Min ({field.range[0] || 0})
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    {field.value} Value
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                    Max ({field.range[1] || 100})
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Dropdown":
        return (
          <div
            key={field.id}
            className=" h-[6rem] w-full lg:w-[26.5rem] rounded-lg flex justify-between px-4 items-center card border-2 border-gradient-left shadow-inner shadow-border-gradient-right/80"
          >
            <div className="grid items-center w-full gap-8">
              <div className="flex flex-col w-full space-y-1.5 ">
                <label htmlFor={field.id} className="text-left pl-2 capitalize">
                  {field.name}
                </label>
                <select
                  id={field.id}
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="flex h-10 w-full rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                >
                  <option value="">Select</option>
                  {field.selection ? (
                    field.selection.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
        );

      case "Boolean":
        return (
          <div
            key={field.id}
            className=" h-[3rem] w-full lg:w-[26.5rem] rounded-lg flex justify-between px-4 items-center card border-2 border-gradient-left shadow-inner shadow-border-gradient-right/80"
          >
            <div className="card-content">
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  id={field.id}
                  checked={field.value}
                  onChange={(e) =>
                    handleInputChange(field.id, e.target.checked)
                  }
                  className="shrink-0 rounded-sm outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                />
                <label
                  htmlFor={field.id}
                  className="text-sm font-medium leading-none capitalize"
                >
                  {field.name}
                </label>
              </div>
            </div>
          </div>
        );

      case "Text":
        return (
          <div
            key={field.id}
            className=" h-[6rem] w-full lg:w-[26.5rem] rounded-lg flex justify-between px-4 items-center card border-2 border-gradient-left shadow-inner shadow-border-gradient-right/80"
          >
            <div className="grid items-center w-full gap-8">
              <div className="flex flex-col w-full space-y-1.5 ">
                <label htmlFor={field.id} className="text-left pl-2 capitalize">
                  {field.name}
                </label>
                <input
                  id={field.id}
                  placeholder={field.value}
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="flex h-10 w-full rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                />
              </div>
            </div>
          </div>
        );

      case "Image":
        return (
          <div
            key={field.id}
            className="h-[6rem] w-full lg:w-[26.5rem] rounded-lg flex justify-between px-4 items-center card border-2 border-gradient-left shadow-inner shadow-border-gradient-right/80"
          >
            <div className="flex items-center w-full gap-8">
              <div className="w-fit h-full pl-1">
                <div className="bg-white/10 rounded-full overflow-hidden w-[3.5rem] aspect-square flex justify-center items-center">
                  <img src={field.value} alt="IMG" className="object-contain" />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5 text-text w-full">
                <label
                  htmlFor={field.id}
                  className="text-left pl-1 font-semibold"
                >
                  {field.name}
                </label>
                <input
                  id={field.id}
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        handleInputChange(field.id, reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="flex file:text-text h-10 w-full rounded-lg border border-sky-600 shadow-sm shadow-sky-700 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        );

      case "List":
        if (!Array.isArray(field.value) || field.value.length === 0) {
          console.error("Invalid List field value:", field.value);
          return (
            <div key={field.id} className="card w-full mx-[2rem]">
              <div className="card-header">
                <div className="font-bold pl-2">{field.name}</div>
              </div>
              <div className="card-content">
                <p>No data available for this list.</p>
              </div>
            </div>
          );
        }

        const handleNewRowChange = (itemId, value) => {
          setNewRowData((prev) => ({ ...prev, [itemId]: value }));
        };

        return (
          <div
            key={field.id}
            className="h-fit w-full lg:w-[55rem] rounded-lg flex flex-col justify-start items-start px-2 border-2 border-gradient-left shadow-inner shadow-border-gradient-right/80"
          >
            <div className="text-left font-bold text-[1.5rem] my-[1.5rem]">
              <div className="font-bold pl-2">{field.name}</div>
            </div>
            <div className="w-full text-md text-left rtl:text-right text-text overflow-x-auto">
              <table className="w-full ">
                <thead>
                  <tr className="capitalize border-b">
                    {field.value[0]
                      .filter((item) => item.id !== "rowHash")
                      .map((item) => (
                        <th
                          key={item.id}
                          className="px-6 py-2 whitespace-nowrap text-md font-medium "
                        >
                          {item.name}
                        </th>
                      ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="capitalize divide-y divide-white/30">
                  {field.value.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-white/5">
                      {row
                        .filter((item) => item.id !== "rowHash")
                        .map((item) => (
                          <td
                            key={item.id}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium "
                          >
                            {editingRow === `${field.id}_${rowIndex}` ? (
                              renderEditInput(field.id, rowIndex, item)
                            ) : item.type === "Image" ? (
                              <div className="bg-white/10 rounded-full overflow-hidden w-[3.5rem] aspect-square flex justify-center items-center">
                                <img
                                  src={item.value}
                                  alt="IMG"
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              item.value
                            )}
                          </td>
                        ))}
                      <td className="py-2">
                        {editingRow === `${field.id}_${rowIndex}` ? (
                          <div className="flex gap-3 pr-4">
                            <button
                              onClick={() => setEditingRow(null)}
                              className="py-2 px-4 bg-chart-background hover:bg-chart-background/60 transition ease-in-out duration-150 hover:ring-1 hover:ring-white hover:text-white text-text rounded-md "
                            >
                              Save
                            </button>
                            <button
                              disabled
                              className="py-2 px-4 disabled:cursor-not-allowed transition ease-in-out duration-150 hover:ring-1 hover:ring-white hover:text-white text-text rounded-md "
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setEditingRow(`${field.id}_${rowIndex}`)
                            }
                            className="py-2 px-4 bg-chart-background hover:bg-chart-background/60 transition ease-in-out duration-150 hover:ring-1 hover:ring-white hover:text-white text-text rounded-md "
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {addingNewRow === field.id && (
                    <tr>
                      {field.value[0]
                        .filter((item) => item.id !== "rowHash")
                        .map((item) => (
                          <td
                            key={item.id}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium "
                          >
                            {(() => {
                              switch (item.type) {
                                case "Number":
                                  return (
                                    <input
                                      type="number"
                                      value={newRowData[item.id] || ""}
                                      onChange={(e) =>
                                        handleNewRowChange(
                                          item.id,
                                          parseInt(e.target.value)
                                        )
                                      }
                                      className="flex h-10 w-[12rem] rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                                    />
                                  );

                                case "DateTime":
                                  return (
                                    <input
                                      type="datetime-local"
                                      value={newRowData[item.id] || ""}
                                      onChange={(e) =>
                                        handleNewRowChange(
                                          item.id,
                                          e.target.value
                                        )
                                      }
                                      className="flex h-10 w-[12rem] rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                                    />
                                  );

                                case "NumberRange":
                                  return (
                                    <>
                                      {/* <label htmlFor={field.id} className="text-left pl-2 capitalize">{field.name}</label> */}
                                      <div class="relative w-full">
                                        <input
                                          id={item.id}
                                          type="range"
                                          max={
                                            (item.range && item.range[1]) || 100
                                          }
                                          min={
                                            (item.range && item.range[0]) || 0
                                          }
                                          value={newRowData[item.id] || ""}
                                          onChange={(e) =>
                                            handleNewRowChange(
                                              item.id,
                                              parseInt(e.target.value)
                                            )
                                          }
                                          step={1}
                                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                        <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                                          Min (
                                          {(item.range && item.range[0]) || 0})
                                        </span>
                                        <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                                          {item.value} Value
                                        </span>
                                        <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                                          Max (
                                          {(item.range && item.range[1]) || 100}
                                          )
                                        </span>
                                      </div>
                                    </>
                                  );

                                case "Color":
                                  return (
                                    <div className="flex items-center gap-2">
                                      <input
                                        value={newRowData[item.id] || ""}
                                        onChange={(e) =>
                                          handleNewRowChange(
                                            item.id,
                                            e.target.value
                                          )
                                        }
                                        className="flex h-10 w-[12rem] rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                                      />
                                      <input
                                        type="color"
                                        className="w-[4rem]"
                                        value={newRowData[item.id] || ""}
                                        onChange={(e) =>
                                          handleNewRowChange(
                                            item.id,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  );
                                case "Dropdown":
                                  return (
                                    <select
                                      value={newRowData[item.id] || ""}
                                      onChange={(e) =>
                                        handleNewRowChange(
                                          item.id,
                                          e.target.value
                                        )
                                      }
                                      className="flex h-10 w-[12rem] rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                                    >
                                      <option value="">Select</option>
                                      {item.selection ? (
                                        item.selection.map((option) => (
                                          <option key={option} value={option}>
                                            {option}
                                          </option>
                                        ))
                                      ) : (
                                        <>
                                          <option value="option1">
                                            Option 1
                                          </option>
                                          <option value="option2">
                                            Option 2
                                          </option>
                                          <option value="option3">
                                            Option 3
                                          </option>
                                        </>
                                      )}
                                    </select>
                                  );
                                case "Boolean":
                                  return (
                                    <input
                                      type="checkbox"
                                      checked={newRowData[item.id] || false}
                                      onChange={(e) =>
                                        handleNewRowChange(
                                          item.id,
                                          e.target.checked
                                        )
                                      }
                                      className="checkbox"
                                    />
                                  );
                                case "Image":
                                  return (
                                    <div className="flex items-center gap-2">
                                      <div className="w-fit h-full pl-1">
                                        <div className="bg-white/10 rounded-full overflow-hidden w-[3.5rem] aspect-square flex justify-center items-center">
                                          <img
                                            src={newRowData[item.id] || ""}
                                            alt="IMG"
                                            className="object-contain"
                                          />
                                        </div>
                                      </div>
                                      <input
                                        type="file"
                                        onChange={(e) => {
                                          const file = e.target.files[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              const imageData = reader.result;
                                              handleNewRowChange(
                                                item.id,
                                                imageData
                                              );
                                              // Create a unique identifier for this image
                                              const imageIdentifier = `${field.id}@${field.value.length}@${item.id}`;
                                              setUploadedImages(
                                                (prev) =>
                                                  new Set([
                                                    ...prev,
                                                    imageIdentifier,
                                                  ])
                                              );
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                    </div>
                                  );
                                case "Text":
                                default:
                                  return (
                                    <input
                                      value={newRowData[item.id] || ""}
                                      onChange={(e) =>
                                        handleNewRowChange(
                                          item.id,
                                          e.target.value
                                        )
                                      }
                                      className="flex h-10 w-[12rem] rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                                    />
                                  );
                              }
                            })()}
                          </td>
                        ))}
                      <td>
                        <div className="flex gap-3 pr-4">
                          <button
                            onClick={() => {
                              handleAddNewRow(field.id, newRowData);
                              setNewRowData({});
                              setAddingNewRow(null);
                            }}
                            className="py-2 px-4 bg-chart-background hover:bg-chart-background/60 transition ease-in-out duration-150 hover:ring-1 hover:ring-white hover:text-white text-text rounded-md "
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setNewRowData({});
                              setAddingNewRow(null);
                            }}
                            className="py-2 px-4  transition ease-in-out duration-150 hover:ring-1 hover:ring-white hover:text-white text-text rounded-md "
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {addingNewRow !== field.id && (
                <button
                  className="py-2 px-4 bg-chart-background hover:bg-chart-background/60 transition ease-in-out duration-150 hover:ring-1 hover:ring-white hover:text-white text-text rounded-md mt-4 mx-2"
                  onClick={() => {
                    setAddingNewRow(field.id);
                    setNewRowData({});
                  }}
                >
                  + Add New
                </button>
              )}
              <div className="w-full text-center py-2">
                A list of your {field.name} fields.
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderEditInput = (fieldId, rowIndex, subField) => {
    switch (subField.type) {
      case "Text":
        return (
          <input
            value={subField.value}
            onChange={(e) =>
              handleListItemChange(
                fieldId,
                rowIndex,
                subField.id,
                e.target.value
              )
            }
            className="flex h-10 w-[12rem] rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
          />
        );
      case "Number":
        return (
          <input
            value={subField.value}
            type="number"
            onChange={(e) =>
              handleListItemChange(
                fieldId,
                rowIndex,
                subField.id,
                parseInt(e.target.value)
              )
            }
            className="flex h-10 w-[12rem] rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
          />
        );

      case "DateTime":
        return (
          <input
            value={subField.value}
            type="datetime-local"
            onChange={(e) =>
              handleListItemChange(
                fieldId,
                rowIndex,
                subField.id,
                e.target.value
              )
            }
            className="flex h-10 w-[12rem] rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
          />
        );

      case "NumberRange":
        return (
          <>
            {/* <label htmlFor="ranger" className="text-left pl-2 capitalize">{subField.name}</label> */}
            <div class="relative w-full">
              <input
                value={subField.value}
                type="range"
                max={(subField.range && subField.range[1]) || 100}
                min={(subField.range && subField.range[0]) || 0}
                step={1}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onChange={(e) =>
                  handleListItemChange(
                    fieldId,
                    rowIndex,
                    subField.id,
                    parseInt(e.target.value)
                  )
                }
              />
              <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                {(subField.range && subField.range[0]) || 0}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                {subField.value}{" "}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                {(subField.range && subField.range[1]) || 100}
              </span>
            </div>
            {/* <input
                            value={subField.value}
                            type="range"
                            max={(subField.range && subField.range[1]) || 100}
                            min={(subField.range && subField.range[0]) || 0}
                            onChange={(e) => handleListItemChange(fieldId, rowIndex, subField.id, parseInt(e.target.value))}
                            className="flex h-10 w-[12rem] rounded-lg outline-none bg-transparent border-sky-600 shadow-sm shadow-sky-700 focus-visible:ring-[3px] focus-visible:ring-sky-700 focus-visible:ring-offset-[2px]"
                        /> */}
          </>
        );
      case "Image":
        return (
          <div className="flex items-center gap-3">
            <div className="w-fit h-full pl-1">
              <div className="bg-white/10 rounded-full overflow-hidden w-[3.5rem] aspect-square flex justify-center items-center">
                <img
                  src={subField.value}
                  alt="IMG"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col space-x-1.5">
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handleListItemChange(
                        fieldId,
                        rowIndex,
                        subField.id,
                        reader.result
                      );
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="flex file:text-text h-10 w-fit rounded-lg border border-sky-600 shadow-sm shadow-sky-700 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        );
      // Add more cases for other types as needed
      default:
        return subField.value;
    }
  };

  const handleListItemChange = (listFieldId, rowIndex, itemId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      fields: prevData.fields.map((field) => {
        if (field.id === listFieldId) {
          const newValue = [...field.value];
          if (rowIndex === newValue.length) {
            // This is a new row being added
            const newRow = newValue[0].map((item) =>
              item.id === itemId ? { ...item, value } : { ...item, value: "" }
            );
            newValue.push(newRow);
          } else {
            newValue[rowIndex] = newValue[rowIndex].map((item) =>
              item.id === itemId ? { ...item, value } : item
            );
          }
          return { ...field, value: newValue };
        }
        return field;
      }),
    }));

    const updatedList = formData.fields.find(
      (field) => field.id === listFieldId
    );
    setUpdatedFields((prev) => ({ ...prev, [listFieldId]: updatedList.value }));

    // Track image uploads in lists
    if (typeof value === "string" && value.startsWith("data:image")) {
      setUploadedImages((prev) =>
        new Set(prev).add(`${listFieldId}@${rowIndex}@${itemId}`)
      );
    }
  };

  const handleSave = async () => {
    // Identify image fields that have changed
    const changedImageFields = formData.fields.filter(
      (field) => uploadedImages.has(field.id) && field.type === "Image"
    );

    // Handle List image fields
    const changedListImageFields = formData.fields
      .filter((field) => field.type === "List" && field.id in updatedFields)
      .flatMap((field) =>
        field.value.flatMap((row, rowIndex) =>
          row
            .filter(
              (item) =>
                item.type === "Image" &&
                uploadedImages.has(`${field.id}@${rowIndex}@${item.id}`)
            )
            .map((item) => ({
              fieldId: `${field.id}@${rowIndex}@${item.id}`,
              value: item.value,
              listFieldId: field.id,
              rowIndex: rowIndex,
              itemId: item.id,
            }))
        )
      );

    // Combine all image fields
    const allImageFields = [...changedImageFields, ...changedListImageFields];
    // Prepare image data for upload
    const imageData = allImageFields.map((field) => ({
      fieldId: field.fieldId || field.id,
      filename: `${field.fieldId || field.id}.jpg`, // You might want to use a more sophisticated naming strategy
    }));

    // Prepare form data for image upload
    const formDataForUpload = new FormData();
    await Promise.all(
      allImageFields.map(async (field, index) => {
        const blob = await fetch(field.value).then((r) => r.blob());
        formDataForUpload.append("images", blob, imageData[index].filename);
      })
    );
    formDataForUpload.append("imageData", JSON.stringify(imageData));

    // Upload images
    if (allImageFields.length > 0) {
      try {
        const uploadResponse = await fetch(
          `${HOST}db/experience/uploadMultipleImages/${experienceId}`,
          {
            // const uploadResponse = await fetch(`${HOST}db/experience/uploadMultipleImages/cricket`, {
            method: "POST",
            body: formDataForUpload,
          }
        );

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          // Update form data with new image URLs
          uploadResult.data.uploadedImages.forEach((image) => {
            const [listFieldId, rowIndex, itemId] = image.fieldId.split("@");
            if (rowIndex !== undefined && itemId !== undefined) {
              // This is a List image
              const fieldIndex = formData.fields.findIndex(
                (field) => field.id === listFieldId
              );
              if (fieldIndex !== -1) {
                formData.fields[fieldIndex].value[parseInt(rowIndex)] =
                  formData.fields[fieldIndex].value[parseInt(rowIndex)].map(
                    (item) =>
                      item.id === itemId ? { ...item, value: image.url } : item
                  );
              }
            } else {
              // This is a regular image field
              const fieldIndex = formData.fields.findIndex(
                (field) => field.id === image.fieldId
              );
              if (fieldIndex !== -1) {
                formData.fields[fieldIndex].value = image.url;
              }
            }
          });
          setUploadedImages(new Set());
        } else {
          console.error("Image upload failed");
          return;
        }
      } catch (error) {
        console.error("Error uploading images:", error);
        return;
      }
    }

    // Prepare data for database update
    const updatedFieldsArray = formData.fields
      .filter((field) => field.id in updatedFields)
      .map((field) => {
        // Change 'id' to 'fieldId'
        const { id, ...rest } = field;
        let updatedField = { fieldId: id, ...rest };

        // Special handling for List type
        if (field.type === "List") {
          updatedField.value = field.value.map((row) =>
            row
              .filter((item) => item.id !== "rowHash")
              .map(({ id, ...itemRest }) => ({ fieldId: id, ...itemRest }))
          );
        }

        return updatedField;
      });
    setCompleteData((prevData) => ({
      ...prevData,
      configuration: { fields: formData },
    }));
    let completedData = {
      ...completeData,
      configuration: formData,
    };
    // Send update to database

    if (!appId) {
      try {
        const updateResponse = await fetch(
          `http://localhost:3000/api/v1/experience-app/${projectId}/${experienceId}/add-experience-app`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(completedData),
          }
        );

        if (updateResponse.ok) {
          // Refresh the form data
          navigate(`/apps/${projectId}`);
        } else {
          console.error("Failed to update data");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      try {
        const updateResponse = await fetch(
          `http://localhost:3000/api/v1/experience-app/${projectId}/${experienceId}/update-experience-app/${appId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(completedData),
          }
        );

        if (updateResponse.ok) {
          alert("App updated successfully");
          // Refresh the form data
          navigate(`/apps/${projectId}`);
        } else {
          console.error("Failed to update data");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/experience-app/${projectId}/delete-experience-app/${appId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const res = response.json();
        alert("App deleted successfully");
        navigate(`/apps/${projectId}`);
      }
    } catch (error) {
      console.error("Failed to update data");
    }
  };

  const handleAddNewRow = (fieldId, newRowData) => {
    setFormData((prevData) => {
      const updatedFields = prevData.fields.map((field) => {
        if (field.id === fieldId) {
          const newRow = field.value[0].map((item) => ({
            ...item,
            value: newRowData[item.id] || "",
          }));
          const updatedValue = [...field.value, newRow];
          return { ...field, value: updatedValue };
        }
        return field;
      });

      const updatedData = { ...prevData, fields: updatedFields };

      // Update the updatedFields state
      setUpdatedFields((prev) => {
        const updatedField = updatedData.fields.find((f) => f.id === fieldId);
        return { ...prev, [fieldId]: updatedField.value };
      });

      return updatedData;
    });
  };

  useEffect(() => {
    if (experienceId) {
      fetchExperience();
    }
  }, [experienceId]);

  useEffect(() => {
    if (appId) {
      fetchApp();
    }
  }, []);

  return (
    <div className="flex justify-center items-center">
      <form className=" w-4xl h-full p-2">
        <div className="grid items-center w-full gap-8 border-2 p-5 rounded-lg border-gradient-left shadow-inner shadow-border-gradient-right/80">
          <div className="flex flex-col w-full space-y-1.5 ">
            <label className="block text-sm font-medium text-gray-700">
              Experience Id
            </label>
            <input
              type="text"
              className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300 bg-slate-300 text-gray-900"
              name="name"
              defaultValue={experience.experience_id}
              disabled
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="grid items-center w-full gap-8 border-2 p-5 rounded-lg border-gradient-left shadow-inner shadow-border-gradient-right/80">
            <div className="flex flex-col w-full space-y-1.5 ">
              <label className="block text-sm font-medium text-gray-700">
                Instance Count
              </label>
              <input
                type="number"
                min="1"
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300  bg-slate-300 text-gray-900"
                placeholder="e.g. 4"
                value={completeData.instance_count}
                name="instance_count"
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
          </div>

          <div className="grid items-center w-full gap-8 border-2 p-5 rounded-lg border-gradient-left shadow-inner shadow-border-gradient-right/80">
            <div className="flex flex-col w-full space-y-1.5 ">
              <label className="block text-sm font-medium text-gray-700">
                App Status
              </label>
              <select
                name="status"
                id="appStatus"
                value={completeData.status}
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300  bg-slate-300 text-gray-900"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                <option value="disabled">Disabled</option>
                <option value="deleted">Deleted</option>
                <option value="enabled">Enabled</option>
                <option value="live">Live</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex fex-col flex-wrap gap-2 mt-2">
          {formData && !appLoading && !experienceLoading ? (
            formData?.fields.map((field) => renderInputCard(field))
          ) : (
            <div>loading...</div>
          )}
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-[#318CE7] text-white py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400 cursor-pointer"
          >
            {appId ? "Update app" : "Create App"}
          </button>
          {appId && (
            <button
              type="button"
              onClick={handleDelete}
              className="w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-600 transition disabled:bg-gray-400 cursor-pointer"
            >
              Delete App
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddApp;
