import { FormEvent, useEffect, useState } from "react";
import { FaGithub, FaUser, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    if (jwtToken) {
      sessionStorage.removeItem("jwtToken"); // Remove token if it exists
    }
  }, []); // Empty dependency array to run once on component mount

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      const token = res.headers.authorization;
      if (res.status === 200) {
        sessionStorage.setItem("jwtToken", token);
        navigate("/");
      } else {
        alert("Invalid password or email");
      }
    } catch (error) {
      // Handle error here
      console.error("Error logging in:", error);
      // Display an error message to the user
      alert("Error logging in: " + error);
    }
  };

  return (
    <div className="flex">
      <div className="bg-[#427FBE] w-1/2 h-dvh flex flex-col items-center justify-center  text-white">
        <FaGithub className="text-[240px]" />
        <div className="text-5xl py-10">
          <span className="font-helvetica font-extrabold">GitHub</span>{" "}
          <span className="font-sans font-light">Jobs</span>
        </div>
      </div>
      <div className="bg-white w-1/2 h-dvh flex flex-col items-center justify-center">
        <div className="min-w-[300px] xl:min-w-[450px] mx-auto px-10 py-14 border border-gray-300 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-400">
            Welcome to GitHub jobs
          </h2>
          <form className="py-6" onSubmit={handleLogin}>
            <div className="mb-3 flex items-center ">
              <span className="mr-3">
                <FaUser />
              </span>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                id="username"
                placeholder="Enter your username"
                required
                onChange={(e) => setUsername(e.target.value)}
                minLength={3}
              />
            </div>
            <div className="mb-6 flex items-center">
              <span className="mr-3">
                <FaKey />
              </span>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                minLength={3}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4"
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
