import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";

const Signup = ({ showAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    user_type: "user",
    // organisation: "",
    address: "",
    gst_number: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        alert("Some error orrucred. Please try again");
      }
      const res = await response.json();
      showAlert("User Signup successful", "success");
      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-start items-start text-text bg-gradient-to-b from-primary to-primary-grad">
      <div className="relative overflow-x-hidden overflow-y-auto w-full h-[100vh] flex flex-col justify-start items-center pb-[8rem]">
        <section className="mt-[3rem]">
          <div className="relative flex flex-col items-center justify-center px-6 py-8 h-fit lg:py-0">
            <div className="flex items-center mb-6 ">
              <img
                src={logo}
                alt="logo"
                className="w-[10rem] py-3 sm:w-[14rem]"
              />
            </div>
            <div className="flex flex-col justify-center items-center w-fit h-fit p-[2px] bg-gradient-to-r from-border-gradient-left to-border-gradient-right rounded-[1.2rem] gap-[2px] shadow-2xl shadow-border-gradient-left/20">
              <div className="z-10 w-[35rem] h-fit bg-background-primary rounded-[1.1rem] flex flex-wrap justify-evenly items-center py-[2rem] gap-y-[2rem]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-[35rem]">
                  <h1 className="text-lg font-bold leading-tight tracking-tight font-natosans md:text-2xl text-text">
                    Register here
                  </h1>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-1 text-left"
                  >
                    {/* Name input */}
                    <div className="w-full h-[5rem]">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-text"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                        placeholder="John Doe"
                        onChange={onChange}
                        required
                      />
                    </div>

                    {/* email input */}
                    <div className="w-full h-[5rem]">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-text"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                        placeholder="email@example.com"
                        onChange={onChange}
                        required
                      />
                    </div>

                    {/* password input */}
                    <div className="relative w-full h-[5rem]">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium  text-text"
                      >
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder={showPassword ? "password" : "••••••••"}
                        className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                        onChange={onChange}
                        minLength={6}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-[45%] text-[#fff] focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg
                            className="w-6 h-6  text-text-inactive hover:text-text transition ease-in-out duration-150"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6  text-text-inactive hover:text-text transition ease-in-out duration-150"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 14"
                          >
                            <g
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            >
                              <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                              <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                            </g>
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* phone  */}
                    <div className="w-full h-[5rem]">
                      <label
                        htmlFor="phone_number"
                        className="block mb-2 text-sm font-medium text-text"
                      >
                        Your Phone
                      </label>
                      <input
                        type="number"
                        name="phone_number"
                        id="phone_number"
                        className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                        placeholder="+91 9999999999"
                        onChange={onChange}
                        required
                      />
                    </div>

                    {/* User type  */}
                    <div className="w-full h-[5rem]">
                      <label
                        htmlFor="user_type"
                        className="block mb-2 text-sm font-medium text-text"
                      >
                        User Type
                      </label>
                      <input
                        type="text"
                        name="user_type"
                        id="user_type"
                        value={formData.user_type}
                        className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                        placeholder="email@example.com"
                        disabled
                        // onChange={onChange}
                        required
                      />
                    </div>

                    {/* address  */}
                    <div className="w-full h-[5rem] min-h-30">
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-text"
                      >
                        Address
                      </label>
                      <textarea
                        type=""
                        name="address"
                        id="address"
                        rows={4}
                        className=" border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                        placeholder="715 Marianna Ridges, Aliyafield, Kansas - 48463, Bouvet Island"
                        onChange={onChange}
                      />
                    </div>

                    {/* Gst number  */}
                    <div className="w-full h-[5rem] mt-1">
                      <label
                        htmlFor="gst_number"
                        className=" mb-2 text-sm font-medium text-text mt-2"
                      >
                        Your GST No.
                      </label>
                      <input
                        type="text"
                        name="gst_number"
                        id="gst_number"
                        className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                        placeholder="24AAACC1206D1ZM"
                        onChange={onChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-background-secondary 
                          hover:bg-chart-background hover:ring-2 hover:outline-none 
                          hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center 
                          transition ease-in-out duration-150"
                    >
                      Sign up
                    </button>
                  </form>
                  <p>
                    Already have an account ?{" "}
                    <a href="/login">Click here to login</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
