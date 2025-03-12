import React from "react";

const ThankYouScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-green-400 to-blue-500">
      <div className="text-center bg-white p-10 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-4xl font-semibold text-green-600 mb-4">
          Thank You!
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Your registration has been successfully submitted and Event pass has
          been sent to you on your registered Email.
        </p>
        <p className="text-md text-gray-500 mb-4">
          We look forward to seeing you at the event!
        </p>
      </div>
    </div>
  );
};

export default ThankYouScreen;
