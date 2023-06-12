import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import "./form.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import Sidebar from "../SideBar/Sidebar";
import { ThemeContext } from "../../utils/ThemeContext";
import authService from "../../utils/authService.js";
import userService from "../../utils/userService.js";
import modelService from "../../utils/modelService.js";

const PatientForm = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  // React Loading
  const [isLoading, setIsLoading] = useState(false);
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
      setState((prevState) => ({
        ...prevState,
        user_id: user._id,
      }));
    } catch (error) {
      console.log("Error Fetching User Profile:", error);
    }
  };
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    HighBP: "",
    HighChol: "",
    CholCheck: "",
    BMI: "",
    Smoker: "",
    Stroke: "",
    Diabetes: "",
    PhysActivity: "",
    Veggies: "",
    HvyAlcoholConsump: "",
    NoDocbcCost: "",
    GenHlth: "",
    MentHlth: "",
    PhysHlth: "",
    DiffWalk: "",
    Sex: "",
    Age: "",
    Education: "",
    Income: "",
    responseMessage: "", // added state variable for response message
    user_id: "",
  });
  //   Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = [
      "first_name",
      "last_name",
      "Age",
      "HighBP",
      "Sex",
      "Diabetes",
      "Stroke",
    ];
    for (const field of requiredFields) {
      if (!state[field]) {
        console.log("error");
        NotificationManager.error(`Please Fill in the ${field} Field`);
        return false;
      }
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    event.preventDefault();
    // Input Data
    const bodyOBJ = JSON.stringify(state);
    console.log(bodyOBJ);
    const success = await modelService.addPatient(bodyOBJ);
    if (success) {
      setTimeout(() => {
        navigate("/result");
        window.location.reload();
      }, 1000);
    }
  };
  //   Handle Input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (
      name === "HighChol" ||
      name === "CholCheck" ||
      name === "Smoker" ||
      name === "PhysActivity" ||
      name === "Veggies" ||
      name === "HvyAlcoholConsump" ||
      name === "NoDocbcCost" ||
      name === "DiffWalk"
    ) {
      setState((prevState) => ({
        ...prevState,
        [name]: event.target.value === "true",
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Use Effect
  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      navigate("/log-in");
    } else {
      getUserProfile();
    }
  }, [navigate]);
  return authService.isAuthenticated() ? (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="form" id={theme}>
        <NotificationContainer />
        <Sidebar />
        <form
          className="patient-form text-center"
          onSubmit={handleSubmit}
          style={{ boxShadow: "none" }}
        >
          <h2 className="text-center py-4">Try The Test</h2>
          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            {/* First Name */}
            <div className="col">
              <label htmlFor="firstName" id="first-label-name">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                id="firstName"
                placeholder="Enter your first name"
                value={state.first_name}
                onChange={handleInputChange}
              />
            </div>
            {/* Last Name */}
            <div className="col pl">
              <label htmlFor="lastName" id="last-label-name">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                id="lastName"
                placeholder="Enter your last name"
                value={state.last_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            {/* HBP */}
            <div className="col">
              <label htmlFor="HighBP" id="highBP-label">
                Do you have high blood pressure?
              </label>
              <select
                className="form-control"
                name="HighBP"
                id="HighBP"
                value={state.HighBP}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            {/* HCH */}
            <div className="col pl">
              <label htmlFor="HighChol" id="highChol-label">
                Do you have high cholesterol?
              </label>
              <select
                name="HighChol"
                className="form-control"
                id="HighChol"
                value={state.HighChol}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            {/* Ch-Check */}
            <div className="col">
              <label htmlFor="CholCheck" id="cholCheck-label">
                Did you have recently a cholesterol check?
              </label>
              <select
                name="CholCheck"
                className="form-control"
                id="CholCheck"
                value={state.CholCheck}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            {/* BMI */}
            <div className="col pl">
              <label htmlFor="BMI" id="bmi-label">
                What is your BMI?
              </label>
              <input
                type="number"
                className="form-control"
                step="1"
                min="10"
                max="50"
                name="BMI"
                id="BMI"
                placeholder="Enter your BMI"
                value={state.BMI}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            {/* Smoker */}
            <div className="col">
              <label>Are you a smoker?</label>
              <select
                name="Smoker"
                className="form-control"
                id="Smoker"
                value={state.Smoker}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            {/* Stroke */}
            <div className="col pl">
              <label>Did you have a stroke before?</label>
              <select
                name="Stroke"
                className="form-control"
                id="Stroke"
                value={state.Stroke}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            {/* Diabetes */}
            <div className="col">
              <label htmlFor="Diabetes" id="diabetes-label">
                Do you have diabetes?
              </label>
              <select
                name="Diabetes"
                className="form-control"
                id="Diabetes"
                value={state.Diabetes}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value="1">Type 1</option>
                <option value="2">Type 2</option>
                <option value="0">No</option>
              </select>
            </div>
            {/* Ph Activity */}
            <div className="col pl">
              <label htmlFor="PhysActivity" id="phys-activity-label">
                Do you do any physical activity per week?
              </label>
              <select
                name="PhysActivity"
                className="form-control"
                id="PhysActivity"
                value={state.PhysActivity}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            {/* Income */}
            <div className="col">
              <label htmlFor="Income" id="label-income">
                What is your income
              </label>
              <select
                name="Income"
                className="form-control"
                id="Income"
                value={state.Income}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            {/* GenHlth */}
            <div className="col pl">
              <label htmlFor="GenHlth" id="label-GenHlth">
                How about your General Health
              </label>
              <input
                type="number"
                className="form-control"
                step="1"
                min="1"
                max="5"
                name="GenHlth"
                id="GenHlth"
                value={state.GenHlth}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            {/* MentHlth */}
            <div className="col">
              <label htmlFor="MentHlth" id="label-MentHlth">
                How about your Mental Health
              </label>
              <input
                type="number"
                className="form-control"
                min="0"
                max="30"
                name="MentHlth"
                id="MentHlth"
                value={state.MentHlth}
                onChange={handleInputChange}
              />
            </div>
            {/* PhysHlth */}
            <div className="col pl">
              <label htmlFor="PhysHlth" id="label-PhysHlth">
                How about your Physical Health
              </label>
              <input
                type="number"
                className="form-control"
                min="0"
                max="30"
                name="PhysHlth"
                id="PhysHlth"
                value={state.PhysHlth}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            {/* DiffWalk */}
            <div className="col">
              <label htmlFor="DiffWalk" id="diff-walk-label">
                Do you have difficulty walking?
              </label>
              <select
                name="DiffWalk"
                className="form-control"
                id="DiffWalk"
                value={state.DiffWalk}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            {/* Sex */}
            <div className="col pl">
              <label htmlFor="Sex" id="sex-label">
                Sex
              </label>
              <select
                name="Sex"
                className="form-control"
                id="Sex"
                value={state.Sex}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>

          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            {/* Age */}
            <div className="col">
              <label htmlFor="Age" id="label-age">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="Age"
                name="Age"
                placeholder="Enter your age"
                value={state.Age || ""}
                onChange={handleInputChange}
              />
            </div>
            {/* education */}
            <div className="col pl">
              <label htmlFor="education" id="label-education">
                What about your Education
              </label>
              <select
                name="Education"
                className="form-control"
                id="education"
                value={state.Education}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>

          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            {/* Vegetables */}
            <div className="col">
              <label htmlFor="Veggies" id="veggies-label">
                Do you eat any servings of vegetables per day?
              </label>
              <select
                name="Veggies"
                className="form-control"
                id="Veggies"
                value={state.Veggies}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            {/* NoDocbcCost */}
            <div className="col pl">
              <label htmlFor="NoDocbcCost" id="doc-cost-label">
                Do you have coverage for healthcare services with no
                out-of-pocket costs?
              </label>
              <select
                name="NoDocbcCost"
                className="form-control"
                id="NoDocbcCost"
                value={state.NoDocbcCost}
                onChange={handleInputChange}
              >
                <option value="">--Please Select--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>

          <div
            className="d-flex row my-4 w-100"
            style={{ "--bs-gutter-x": "0rem" }}
          >
            <button
              type="submit"
              value="submit"
              className="control btn btn-success"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLoading ? (
                <ReactLoading
                  type={"spin"}
                  color={"white"}
                  height={"25px"}
                  width={"25px"}
                />
              ) : (
                "Start"
              )}
            </button>
          </div>
        </form>
      </div>
    </ThemeContext.Provider>
  ) : null;
};

export default PatientForm;
