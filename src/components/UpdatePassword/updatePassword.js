import React, { useState, useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import { ThemeContext } from "../../utils/ThemeContext";
import authService from "../../utils/authService";
import userService from "../../utils/userService.js";
// Notification Import
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
// Imports for Routes
import { useNavigate } from "react-router-dom";
// CSS Style
import "./updatePassword.css";
import Sidebar from "../SideBar/Sidebar";

// Default Method
const UpdatePassword = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);
  // 03- Validation Password
  const [oldPassword, setPassword] = useState("");
  const [passValid, setPassValid] = useState(false);
  const [passTouched, setPassTouched] = useState(false);
  const [newPassword, setNewpassword] = useState("");
  const [newpassValid, setnewPassValid] = useState(false);
  const [newpassTouched, setnewPassTouched] = useState(false);
  function handlePassChange(event) {
    setPassword(event.target.value);
    setPassValid(validatePassword(event.target.value));
    setFormValid(passValid && newpassValid && cPassValid);
  }
  function handleNewPassChange(event) {
    setNewpassword(event.target.value);
    setnewPassValid(validateNewPassword(event.target.value));
    setFormValid(passValid && newpassValid && cPassValid);
  }
  function handleNewPassBlur() {
    setnewPassTouched(true);
    setFormValid(passValid && newpassValid && cPassValid);
  }
  function handlePassBlur() {
    setPassTouched(true);
    setFormValid(passValid && newpassValid && cPassValid);
  }
  function validatePassword(oldPassword) {
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-zA-Z]).{8,}$/;
    return passRegex.test(oldPassword);
  }
  function validateNewPassword(newPassword) {
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-zA-Z]).{8,}$/;
    return passRegex.test(newPassword);
  }
  const passClassName = `form-control ${
    passTouched ? (passValid ? "is-valid" : "is-invalid") : ""
  }`;
  // 04- Validation Confirm Password
  const [cPassword, setConfirmPassword] = useState("");
  const [cPassValid, setCPassValid] = useState(false);
  const [cPassTouched, setCPassTouched] = useState(false);
  function handleCPassChange(event) {
    setConfirmPassword(event.target.value);
    setCPassValid(validateCPass(event.target.value));
    setFormValid(passValid && newpassValid && cPassValid);
  }
  function handleCPassBlur() {
    setCPassTouched(true);
    setFormValid(passValid && newpassValid && cPassValid);
  }
  function validateCPass(cpassword) {
    return cpassword === newPassword;
  }
  const newPassClassName = `form-control ${
    newpassTouched ? (newpassValid ? "is-valid" : "is-invalid") : ""
  }`;
  const cPassClassName = `form-control ${
    cPassTouched ? (cPassValid ? "is-valid" : "is-invalid") : ""
  }`;
  // React Loading
  const [isLoading, setIsLoading] = useState(false);
  // To Handle Submit Process
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Input Data
    const bodyOBJ = { oldPassword, newPassword, cPassword };
    const success = await userService.updatePassword(bodyOBJ);
    if (success) {
      setTimeout(() => {
        localStorage.removeItem("accessToken");
        setIsLoading(false);
        navigate("/log-in");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };
  // Toggle Show And Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showNPassword, setShowNPassword] = useState(false);
  const toggleShowNPassword = () => {
    setShowNPassword(!showNPassword);
  };
  const [showCPassword, setShowCPassword] = useState(false);
  const toggleShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };
  // Use Effect
  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      navigate("/log-in");
    }
  }, [navigate]);
  //  HTML
  return authService.isAuthenticated() ? (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="update-password" id={theme}>
        <NotificationContainer />
        <Sidebar />
        <div className="content custom-card">
          {/* <img src={image} alt="Image" className="image" /> */}
          <form
            className="login-form signup-form"
            onSubmit={handleSubmit}
            style={{ boxShadow: "none" }}
          >
            {/* Header */}
            <h2 className="text-center">Update Password</h2>
            {/* oldPassword */}
            <div className="password-group form-group my-4">
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  className={passClassName}
                  placeholder="Old Password"
                  onBlur={handlePassBlur}
                  onChange={handlePassChange}
                />

                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className={showPassword ? "toggle" : "toggle-showing"}
                ></button>
              </div>
              {passTouched && !passValid && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  Password at least 8 chars ,one uppercase letter, one lowercase
                  letter, one number, and one special character.
                </div>
              )}
            </div>
            {/* newPassword */}
            <div className="password-group form-group my-4">
              <div className="password">
                <input
                  type={showNPassword ? "text" : "password"}
                  value={newPassword}
                  className={newPassClassName}
                  placeholder="New Password"
                  onBlur={handleNewPassBlur}
                  onChange={handleNewPassChange}
                />

                <button
                  type="button"
                  onClick={toggleShowNPassword}
                  className={showNPassword ? "toggle" : "toggle-showing"}
                ></button>
              </div>
              {newpassTouched && !newpassValid && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  Password at least 8 chars ,one uppercase letter, one lowercase
                  letter, one number, and one special character.
                </div>
              )}
            </div>
            {/* CPassword */}
            <div className="cpassword-group form-group my-4">
              <div className="password">
                <input
                  type={showCPassword ? "text" : "password"}
                  value={cPassword}
                  className={cPassClassName}
                  placeholder="Confirm Password"
                  onBlur={handleCPassBlur}
                  onChange={handleCPassChange}
                />
                <button
                  type="button"
                  onClick={toggleShowCPassword}
                  className={showCPassword ? "toggle" : "toggle-showing"}
                ></button>
              </div>
              {cPassTouched && !cPassValid && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  CPassword Mis-Match Password.
                </div>
              )}
            </div>
            {/* Submit Button */}
            <div className="login">
              <button
                className="control"
                type="submit"
                disabled={!formValid || isLoading}
                style={{
                  opacity: isLoading ? 1 : !formValid ? 0.5 : 1,
                  cursor: !formValid
                    ? "not-allowed"
                    : isLoading
                    ? "not-allowed"
                    : "pointer",
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
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ThemeContext.Provider>
  ) : null;
};
export default UpdatePassword;
