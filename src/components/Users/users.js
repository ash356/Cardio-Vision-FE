import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";
import authService from "../../utils/authService";
import userService from "../../utils/userService";
import { Table } from "react-bootstrap";
import "./users.css";
import Sidebar from "../SideBar/Sidebar.js";
import { FaUserShield, FaTrash } from "react-icons/fa";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Users = () => {
  // ============================================================
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const response = await userService.getUsers();
      if (response) {
        setUsers(response);
      }
    } catch (error) {
      const { message } = error.response.data;
      NotificationManager.error(`Error! => ${message}`);
    }
  };
  const setAdmin = async (email) => {
    try {
      const response = await userService.setAdmin(email);
      setTimeout(() => {
        getUsers();
      }, 1000);
    } catch (error) {
      const { message } = error.response.data;
      NotificationManager.error(`Error! => ${message}`);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await userService.deleteUser(id);
      getUsers();
    } catch (error) {
      const { message } = error.response.data;
      NotificationManager.error(`Error! => ${message}`);
    }
  };

  // Get User Profile
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "",
    profilePic: "",
  });
  const getUserProfile = async () => {
    try {
      // Clear the profile state
      setProfile({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: "",
        profilePic: "",
      });
      // Fetch the user profile
      const userProfile = await userService.getProfile();
      const { user } = userProfile;
      // Update the profile state with the fetched user data
      setProfile(user);
    } catch (error) {
      console.log("Error Fetching User Profile:", error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      navigate("/log-in");
    } else {
      getUserProfile();
      if (authService.isAdmin()) {
        getUsers();
      } else {
        // test ==> If you want User table only
        navigate("/result");
      }
    }
  }, [navigate]);

  return authService.isAuthenticated() ? (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="list" id={theme}>
        <NotificationContainer />
        <Sidebar />
        <div className="users-list-container">
          <h1
            className="py-2 mb-2 font-monospace fst-italic"
            style={{ color: "#00CEC8" }}
          >
            Users
          </h1>
          <div className="table-div mt-0">
            <Table className="table table-stripe table-hove text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th title="Email">Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Confirm Email</th>
                  <th>Gender</th>
                  <th>Set Admin</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{`${user.firstName}  ${user.lastName}`}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td>{`${user.confirmEmail}`}</td>
                      <td>{user.gender}</td>
                      <td>
                        <div className="">
                          <FaUserShield
                            style={{
                              fontSize: "20px",
                              color: "teal",
                              cursor: "pointer",
                            }}
                            onClick={() => setAdmin(user.email)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="">
                          <FaTrash
                            style={{
                              fontSize: "20px",
                              color: "#dc3545",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteUser(user._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No users found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  ) : null;
};

export default Users;
