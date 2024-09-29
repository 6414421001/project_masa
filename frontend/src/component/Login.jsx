import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UseContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setToken(data.token);
      navigate(`/admin/${data.token}`);
    } catch (error) {
      console.error("error create data", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">Login</h1>
      <form onSubmit={handleSubmit} className="bg-pink-50 shadow-lg rounded-lg p-8 mb-4">
        <div className="mb-4">
          <label className="block text-pink-600 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border border-pink-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-pink-600 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border border-pink-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            onKeyDown={handleKeyDown}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;