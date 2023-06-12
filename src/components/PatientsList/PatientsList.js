import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";
import axios from "axios";

import authService from "../../utils/authService";
import userService from "../../utils/userService";
import { Table, FormControl, Form } from "react-bootstrap";
import "./patient-list.css";
import Sidebar from "../SideBar/Sidebar.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import modelService from "../../utils/modelService.js";
import { NotificationManager } from "react-notifications";
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
};
const PatientsList = () => {
  // ============================================================
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("asc");

  // Get Patients List
  const getPatients = async () => {
    try {
      const data = await modelService.patientsList();
      if (data) {
        setPatients(data);
      }
    } catch (error) {
      NotificationManager.error(`Error! => ${error}`);
    }
  };
  // Handle Search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // Search Method
  const searchPatients = () => {
    const filteredPatients = patients.filter((patient) => {
      const fullName = `${patient.first_name} ${patient.last_name}`;
      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return filteredPatients;
  };

  const filteredPatients = searchPatients();
  // Handle Change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    sortPatients(event.target.value);
  };
  // Sorting Methods
  const sortPatients = (option) => {
    let sortedPatients = [...patients];
    switch (option) {
      case "asc":
        sortedPatients.sort((a, b) => a.id - b.id);
        break;
      case "dsc":
        sortedPatients.sort((a, b) => b.id - a.id);
        break;
      case "time":
        sortedPatients.sort(
          // Date Format === "2023-05-01 10:30:00"
          (a, b) => new Date(a.submitted_time) - new Date(b.submitted_time)
        );
        break;
      default:
        // No sorting option selected or invalid option
        return;
    }

    setPatients(sortedPatients);
  };
  // Handle Update
  const handleUpdate = (id) => {
    // Handle update logic here
    // You can perform any desired actions when update is clicked
    // Example: Redirect to an update page or display a modal for editing
  };
  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await modelService.deletePatient(id);
      const status = response.status;
      // if (status == 204) {
      getPatients();
      // }
    } catch (error) {
      NotificationManager.error(`Error! => ${error}`);
    }
  };
  // ============================================================

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
        getPatients();
      } else {
        // test ==> If you want User table only
        navigate("/result");
      }
    }
  }, [navigate]);

  return authService.isAuthenticated() ? (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="list" id={theme}>
        <Sidebar />
        <div className="patient-list-container">
          <h1
            className="py-2 mb-2 font-monospace fst-italic"
            style={{ color: "#00CEC8" }}
          >
            Patients List
          </h1>
          <div className="row mb-2">
            <div className="col-md-6 ps-0">
              <input
                type="text"
                id="searchInput"
                className="form-control input"
                placeholder="Search By Name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="col-md-6 pe-0 text-center">
              <select
                id="sortOption"
                className="form-select"
                value={sortOption}
                onChange={handleSortChange}
                style={{ height: "50px" }}
              >
                <option value="asc">Ascending</option>
                <option value="dsc">Descending</option>
                <option value="time">Time</option>
              </select>
            </div>
          </div>
          <div className="table-div mt-0">
            <Table className="table table-stripe table-hove text-center">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th title="High Blood Pressure">HBP</th>
                  <th>Diabetes</th>
                  <th>High Cholesterol</th>
                  <th>Result</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{`${patient.first_name}  ${patient.last_name}`}</td>
                    <td>{`${patient.HighBP}`}</td>
                    <td>{`${patient.Diabetes}`}</td>
                    <td>{`${patient.HighChol}`}</td>
                    <td>{`${patient.result}`}</td>
                    <td>{patient.submitted_time}</td>
                    <td
                      className="d-flex w-100"
                      style={{ justifyContent: "center" }}
                    >
                      <div className="">
                        <FaTrash
                          style={{
                            fontSize: "15px",
                            color: "#dc3545",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(patient.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  ) : null;
};

export default PatientsList;
