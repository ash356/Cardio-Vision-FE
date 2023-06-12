import React, { useState, useEffect } from "react";
import "./App.css";
import { Loading } from "./components/Items";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard";
import PatientsList from "./components/PatientsList/PatientsList";
import Login from "./components/Login/login";
import ForgetPassword from "./components/ForgetPassword/forgetPassword";
import ResetPassword from "./components/ResetPassword/resetPassword";
import UpdatePassword from "./components/UpdatePassword/updatePassword";
import Error404 from "./components/Error404/error404";
import SignUp from "./components/Signup/signup";
import View from "./components/View/view";
import Chart from "./components/Chart/chart";
import Userprofile from "./components/Profile/profile";
import Form from "./components/Form/form";
import Result from "./components/Result/result";
import Settings from "./components/Users/users";
import "react-chatbot-kit/build/main.css";
import { IoMdMoon as Moon, IoMdSunny as Sun } from "react-icons/io";
// ======================================
import ReactSwitch from "react-switch";
import { ThemeProvider } from "./utils/ThemeContext";

function App() {
  // React Loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <ThemeProvider>
      {loading ? (
        <Loading type={"spinningBubbles"} color={"#00CEC8"} />
      ) : (
        <div className="App">
          {/* 01- Switch On Off Cheked */}
          {/* <div className="switch">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div> */}
          {/* 02- Switch Sun Moon */}
          {/* <div
            className="toggle-btn"
            style={{ position: "absolute", top: "25px", left: "25px" }}
          >
            {theme === "light" ? (
              <Moon
                className="icon"
                onClick={toggleTheme}
                style={{ fontSize: "25px", color: "#1b242c" }}
              />
            ) : (
              <Sun
                className="icon"
                onClick={toggleTheme}
                style={{ fontSize: "25px", color: "white" }}
              />
            )}
          </div> */}
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<View />} />
              <Route path="/log-in" element={<Login />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patientsList" element={<PatientsList />} />
              <Route path="/profile" element={<Userprofile />} />
              <Route path="/form" element={<Form />} />
              <Route path="/result" element={<Result />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/charts" element={<Chart />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
