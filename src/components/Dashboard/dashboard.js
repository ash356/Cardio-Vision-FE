import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import { Link } from "react-router-dom";
import Img from "../../assets/slider-02.jpg";
import Img2 from "../../assets/slider-03.gif";
import { ThemeContext } from "../../utils/ThemeContext";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import authService from "../../utils/authService";
import userService from "../../utils/userService";
function Dashboard() {
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
    }
  }, [navigate]);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isAdmin = authService.isAdmin();

  return authService.isAuthenticated() ? (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="dashboard" id={theme}>
        <Sidebar />
        <div className="containe">
          {isAdmin ? (
            /* Admin Content*/
            <div>
              <div className="row">
                <div className="image-container">
                  <img src={Img2} alt="img2" className="image" />
                </div>
                <div className="overlay">
                  <div className="data">
                    <h2 style={{ color: "#1b242c" }}>
                      Welcome {`${profile.firstName} ${profile.lastName}`}
                    </h2>
                    <h4 className="par my-2">
                      You have access to manage users and perform administrative
                      tasks.
                    </h4>
                    <div
                      className="my-2 btn btn-success form-control"
                      style={{ width: "50%" }}
                    >
                      <Link to="/settings" style={{ color: "white" }}>
                        Manage Users
                      </Link>
                    </div>
                    <h4 className="par my-2">
                      You can also View , add and update patients
                    </h4>
                    <div
                      className="btn btn-primary form-control"
                      style={{ width: "50%" }}
                    >
                      <Link to="/patientsList" style={{ color: "white" }}>
                        View Patients
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /*User Content*/
            <div>
              <div className="row">
                <div className="image-container">
                  <img src={Img} alt="img1" className="image" />
                </div>
                <div className="overlay">
                  <h2 style={{ color: "#0c8884" }}>
                    Hi {`${profile.firstName} ${profile.lastName}`}
                  </h2>
                  <h6 className="par">
                    Elevate Your Cardiovascular Health Today
                  </h6>
                  <div
                    className="button-container"
                    style={{ backgroundColor: "#0c8884" }}
                  >
                    <Link to="/form">Start</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  ) : null;
}

export default Dashboard;
