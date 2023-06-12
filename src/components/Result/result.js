import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import "./result.css";
import Warn from "../../assets/warrning.png";
import Ok from "../../assets/ok.png";
import Sidebar from "../SideBar/Sidebar";
import { ThemeContext } from "../../utils/ThemeContext";
import modelService from "../../utils/modelService.js";
import authService from "../../utils/authService.js";
import userService from "../../utils/userService.js";
const Result = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resultReady, setResultReady] = useState(false);
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
      getResult(user._id);
      // console.log(user._id);
    } catch (error) {
      console.log("Error Fetching User Profile:", error);
    }
  };
  const [result, setResult] = useState();
  const getResult = async (userId) => {
    try {
      // console.log({ userId });
      setLoading(true);
      const response = await modelService.getResult(userId);
      const result = response.result;
      // console.log({ result });
      setResult(result);
      setResultReady(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
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
      <div className="result" id={theme}>
        <Sidebar />
        <div
          className="result-container text-center"
          style={{ height: "608px", overflow: "hidden" }}
        >
          <h2 className="py-4 head text-center">Prediction Result</h2>
          {loading ? (
            <div
              className="loading-indicator"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ReactLoading type={"bars"} color={"#009688"} width={"120px"} />
            </div>
          ) : resultReady ? (
            result ? (
              <div className="warnning">
                <div className="result-section text-center">
                  <img
                    src={Warn}
                    alt="Result Image 1"
                    style={{ width: "250px" }}
                  />
                </div>
                <div className="result-section text-center">
                  <h3 className="my-4">
                    You must go to the nearest hospital to do the necessary
                    tests
                  </h3>
                </div>
              </div>
            ) : (
              <div className="ok">
                <div className="result-section text-center">
                  <img
                    src={Ok}
                    alt="Result Image 1"
                    style={{ width: "250px" }}
                  />
                </div>
                <div className="result-section text-center">
                  <h3 className="my-4">
                    You are doing great! Keep up the healthy habits and continue
                    taking care of yourself.
                  </h3>
                </div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </ThemeContext.Provider>
  ) : null;
};

export default Result;
