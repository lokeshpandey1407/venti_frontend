import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

const EventRegistration = () => {
  const [formData, setFormData] = useState({});
  const [categoryFormFields, setCategoryFormFields] = useState([]);
  const [attendee, setAttendee] = useState({});
  const [event, setEvent] = useState({});
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const { projectId, attendeeId } = useParams();

  const handleFormFieldData = (e, type) => {
    if (type === "toggle") {
      const { name, checked } = e.target;
      setFormData((prev) => {
        return { ...prev, [name]: checked };
      });
    } else {
      const { name, value } = e.target;
      setFormData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const fetchCategoryFormFieldsData = async (categoryId) => {
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
        alert("Some error occured. Please try again later");
        return;
      }
      const res = await response.json();
      if (res.success) {
        setCategoryFormFields(res.data);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/attendee/${projectId}/update-attendee-by-registration/${attendeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        alert("error");
        return;
      }
      const res = await response.json();
      if (res.success) {
        alert("Registration successfull, Please close this page");
        setFormData([]);
        setCategoryFormFields([]);
        setAttendee({});
        navigate("/ThankYouScreen");
      }
    } catch (error) {
      console.log(error);
    }
    // Handle form submission logic here
  };

  const fetchEvent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/get-project/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert("error");
        return;
      }
      const res = await response.json();
      if (res.success) {
        setEvent(res.data);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendee = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/attendee/${projectId}/get-attendee-for-registration/${attendeeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert("error");
        return;
      }
      const res = await response.json();
      if (res.success) {
        setAttendee(res.data);
        setFormData(res?.data?.form_fields_data || {});
        fetchCategoryFormFieldsData(res?.data?.category_id);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const fetchAttendeePass = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/project-attendee-pass/${projectId}/get-attendee-pass/${attendeeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        return;
      }
      const res = await response.json();
      if (res.success) {
        setPass(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    fetchEvent();
    fetchAttendee();
    fetchAttendeePass();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {pass ? (
        <div>
          <h3>You are already registered for this event</h3>
        </div>
      ) : (
        <div className="w-full max-w-lg p-8 bg-white shadow-xl rounded-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Event Registration
          </h2>
          <h3>Event Name : {event.name}</h3>
          <h5>Start Date : {dayjs(event.start_date).format("DD/MM/YYYY")}</h5>
          <h5>End Date : {dayjs(event.end_date).format("DD/MM/YYYY")}</h5>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="mt-3">
              <label htmlFor="name" className="block text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={attendee.first_name}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                placeholder="Enter your full name"
                disabled
                required
              />
            </div>

            {categoryFormFields.map((formField) => {
              return (
                <div className="flex flex-col gap-1" key={formField.name}>
                  <label>
                    {formField.name} {formField.dashboard_required && "*"}
                  </label>
                  {formField.type === "text" ||
                  formField.type === "number" ||
                  formField.type === "email" ? (
                    <input
                      type={formField.type}
                      id={formField.name}
                      name={formField.name}
                      value={formData[formField.name]}
                      required={formField.attendee_required}
                      disabled={!formField.attendee_editable}
                      onChange={(e) => handleFormFieldData(e, formField.type)}
                      className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                    />
                  ) : formField.type === "toggle" ? (
                    <input
                      type={formField.type}
                      id={formField.name}
                      name={formField.name}
                      value={formData[formField.name]}
                      required={formField.attendee_required}
                      disabled={!formField.attendee_editable}
                      onChange={(e) => handleFormFieldData(e, formField.type)}
                      className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                    />
                  ) : (
                    ""
                  )}
                </div>
              );
            })}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventRegistration;
