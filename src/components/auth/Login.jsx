import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        alert("Some error orrucred. Please try again");
      }
      const res = await response.json();
      localStorage.setItem("authToken", res?.user.data.token);
      localStorage.setItem("authUserId", res?.user.data.userId);
      alert(res?.user.message);
      navigate("/");
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
              {/* <img
                src={""}
                alt="logo"
                className="w-[10rem] py-3 sm:w-[14rem]"
              /> */}
            </div>
            <div className="flex flex-col justify-center items-center w-fit h-fit p-[2px] bg-gradient-to-r from-border-gradient-left to-border-gradient-right rounded-[1.2rem] gap-[2px] shadow-2xl shadow-border-gradient-left/20">
              <div className="z-10 w-[35rem] h-fit bg-background-primary rounded-[1.1rem] flex flex-wrap justify-evenly items-center py-[2rem] gap-y-[2rem]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-[35rem]">
                  <h1 className="text-xl font-bold leading-tight tracking-tight font-natosans md:text-2xl text-text">
                    Login in to your account
                  </h1>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6 "
                  >
                    <div className="w-full h-[5rem]">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-text"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                        placeholder="Your Email"
                        // onChange={onChange}
                        minLength={3}
                        required
                      />
                    </div>
                    <div className="w-full h-[5rem]">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-text"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="border-[2px] border-border-secondary  bg-transparent transition ease-in-out duration-150 outline-none sm:text-sm rounded-lg focus-visible:bg-white/10 focus-visible:ring-2 focus:ring-border-gradient-right focus:border-none block w-full p-2.5"
                        placeholder="Your Password"
                        // onChange={onChange}
                        minLength={3}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full text-white bg-blue-200 hover:bg-blue-400 hover:ring-2 hover:outline-none hover:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center transition ease-in-out duration-150 cursor-pointer"
                    >
                      {loading ? "Logging in" : " Log in"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <a href="/signup">Click here to go to signup</a>
      </div>
    </div>
  );
};

export default Login;
