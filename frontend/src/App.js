import React, { useEffect, useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import ClientForm from "./ClientForm";
import Login from "./Login";
import DeleteClient from "./deleteClient"; // Assuming you have this file
import UpdateClient from "./updateClient"; // Assuming you have this file
import ViewClient from "./viewClientInfo"; // Assuming you have this file
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5000/api/check-auth", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/client-allocation">Client Allocation</Link>
          </li>
          <li>
            <Link to="/delete-client">Delete Client</Link>
          </li>
          <li>
            <Link to="/update-client">Update Client Information</Link>
          </li>
          <li>
            <Link to="/view-client">View Client Information</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        {/* Route for Home page */}
        <Route path="/" element={<Home />} />

        {/* Routes for the pages */}
        <Route
          path="/client-allocation"
          element={isAuthenticated ? <ClientForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/delete-client"
          element={isAuthenticated ? <DeleteClient /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-client"
          element={isAuthenticated ? <UpdateClient /> : <Navigate to="/login" />}
        />
        <Route
          path="/view-client"
          element={isAuthenticated ? <ViewClient /> : <Navigate to="/login" />}
        />

        {/* Route for Login page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

const Home = () => (
  <div>
    <h1>Welcome to Realestate!</h1>
    <p>Please login to access the client information.</p>
  </div>
);

export default App;
