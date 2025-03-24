import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // No need to check for the token in cookies since it's httpOnly
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", credentials, {
        withCredentials: true // Ensure cookies are sent with the request
      });

      // Redirect to the client allocation page
      navigate("/client-allocation");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials, please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, {
        withCredentials: true // Ensure cookies are sent with the request
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;