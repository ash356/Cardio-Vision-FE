import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../utils/authService";
import userService from "../../utils/userService";
import "./chart.css";
import Sidebar from "../SideBar/Sidebar";
import { ThemeContext } from "../../utils/ThemeContext";
import Chart1 from "../../assets/chart-01.png";
import Chart2 from "../../assets/chart-02.jpg";

const Charts = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
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
  return authService.isAuthenticated() ? (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="chart" id={theme}>
        <Sidebar />
        <div
          className="container"
          style={{ padding: "2% 5%", marginLeft: "10%" }}
        >
          <div className="row text-center">
            <div className="">
              <h1 className="my-4 heading">Ischemic Heart Disease</h1>
              <p className="lead">
                Ischemic heart disease (IHD), also known as coronary artery
                disease, is a condition in which the blood supply to the heart
                is reduced, resulting in decreased oxygen and nutrient delivery
                to the heart muscle. This can lead to chest pain (angina),
                shortness of breath, heart attack, and other complications.
              </p>
              <img
                src={Chart1}
                alt="Heart"
                className="img-fluid mb-4"
                style={{ height: "auto" }}
              />
              <p className="lead my-4">
                Risk factors for IHD include smoking, high blood pressure, high
                cholesterol, obesity, diabetes, and a family history of heart
                disease. Lifestyle changes such as regular exercise, a healthy
                diet, and quitting smoking can help reduce the risk of IHD.
              </p>
              <img
                src={Chart2}
                alt="Healthy food"
                className="img-fluid mb-4"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  ) : null;
};
export default Charts;
