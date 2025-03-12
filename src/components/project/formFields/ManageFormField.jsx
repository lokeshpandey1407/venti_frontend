import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const ManageFormFields = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("text"); // Assume 'text' is the default type
  const [defaultValue, setDefaultValue] = useState("");
  const [attribute, setAttribute] = useState("");
  const [fieldInfo, setFieldInfo] = useState("");
  const [fields, setFields] = useState([]);
  const [updateField, setUpdateField] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");
  const { projectId } = useParams();

  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);

  // State to store the final JSON object
  const [jsonResult, setJsonResult] = useState("{}");

  // Handle change for key-value pair
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPairs = [...keyValuePairs];
    updatedPairs[index][name] = value;
    setKeyValuePairs(updatedPairs);
  };

  // Add a new key-value pair
  const handleAddRow = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  };

  // Remove a key-value pair
  const handleRemoveRow = (index) => {
    const updatedPairs = keyValuePairs.filter((_, i) => i !== index);
    setKeyValuePairs(updatedPairs);
  };

  const generateJson = () => {
    const jsonObject = keyValuePairs.reduce((acc, { key, value }) => {
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    setJsonResult(JSON.stringify(jsonObject, null, 2));
    return jsonObject;
  };

  // Handle form submission (Create field)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !defaultValue) {
      alert("Name and default value is required");
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
          body: JSON.stringify({
            name,
            type,
            default: defaultValue,
            attribute: generateJson(),
            field_info: fieldInfo,
          }),
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
        setName("");
        setType("text");
        setDefaultValue("");
        setAttribute("");
        setJsonResult("{}");
        setFieldInfo("");
        setKeyValuePairs([]);
      } else {
        alert("Failed to create field.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the field.");
    } finally {
      setLoading(false);
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

  // Handle update field
  const handleUpdate = async (e) => {
    e.preventDefault();
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

          body: JSON.stringify({
            name,
            type,
            default: defaultValue,
            attribute: generateJson(),
            field_info: fieldInfo,
          }),
        }
      );

      if (!response.ok) {
        alert("Error updating the field.");
        setLoading(false);
        return;
      }

      const res = await response.json();
      if (res.success) {
        const updatedFields = fields.map((field) =>
          field.id === updateField ? res.data : field
        );
        setFields(updatedFields);
        setName("");
        setType("text");
        setDefaultValue("");
        setAttribute("");
        setJsonResult("{}");
        setFieldInfo("");
        setKeyValuePairs([]);
        alert("Field updated successfully");
      } else {
        alert("Failed to update the field.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the field.");
    } finally {
      setLoading(false);
    }
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
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create Project Form Field</h2>

      {/* Form */}
      <form
        onSubmit={(e) => (updateField ? handleUpdate(e) : handleSubmit(e))}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-lg">
            Name
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

        <div>
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
            <option value="dropdown">Dropdown</option>
            <option value="file">File</option>
            <option value="toggle">Toggle</option>
            <option value="date">Date</option>
            {/* Add more types if needed */}
          </select>
        </div>

        <div>
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

        <div className="max-w-2xl mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-4">Attributes</h2>

          {/* Key-Value Pairs Form */}
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
                  <label htmlFor={`value-${index}`} className="block text-lg">
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

            {/* Add Row Button */}
            <div>
              <button
                type="button"
                onClick={handleAddRow}
                className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
                Add Key-Value Pair
              </button>
            </div>

            {/* Generate JSON Button */}
            {/* <div>
              <button
                type="button"
                onClick={generateJson}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Generate JSON
              </button>
            </div> */}
          </div>

          {/* Display JSON result */}
          {/* <div className="mt-6">
            <h3 className="text-xl font-semibold">Generated JSON:</h3>
            <pre className="bg-gray-100 p-4 rounded-md text-sm">
              {jsonResult}
            </pre>
          </div> */}
        </div>

        <div>
          <label htmlFor="field_info" className="block text-lg">
            Field Info
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {updateField ? "Update field" : "Create Field"}
        </button>
      </form>

      {/* Section to display created fields */}
      <h3 className="text-xl font-semibold mt-8">Created Fields</h3>
      <ul className="mt-4 space-y-2">
        {fields.map((field) => (
          <li
            key={field.id}
            className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <strong>{field.name}</strong> - {field.type} - {field.default} -{" "}
              {field.field_info}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setFieldForUpdate(field.id)}
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(field.id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageFormFields;
