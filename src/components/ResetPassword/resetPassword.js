import React, { useState, useContext } from "react";
import ReactLoading from "react-loading";
import image from "../../assets/update-password.png";
import { ThemeContext } from "../../utils/ThemeContext";
import authService from "../../utils/authService";
import { IoMdMoon as Moon, IoMdSunny as Sun } from "react-icons/io";
// Notification Import
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
// Imports for Routes
import { useNavigate } from "react-router-dom";
// CSS Style
import "./resetPassword.css";
// Default Method
const ResetPassword = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  //  01- Validation Email
  const [formValid, setFormValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setEmailValid(validateEmail(event.target.value));
    setFormValid(emailValid && codeValid && passValid && cPassValid);
  }
  function handleEmailBlur() {
    setEmailTouched(true);
    setFormValid(emailValid && codeValid && passValid && cPassValid);
  }
  function validateEmail(email) {
    // your validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const emailClassName = `form-control ${
    emailTouched ? (emailValid ? "is-valid" : "is-invalid") : ""
  }`;
  //  02- Validation Code
  const [resetCode, setCode] = useState("");
  const [codeValid, setCodeValid] = useState(false);
  const [codeTouched, setCodeTouched] = useState(false);

  function handleCodeChange(event) {
    setCode(event.target.value);
    setCodeValid(validateCode(event.target.value));
    setFormValid(emailValid && codeValid && passValid && cPassValid);
  }
  function handleCodeBlur() {
    setCodeTouched(true);
    setFormValid(emailValid && codeValid && passValid && cPassValid);
  }
  function validateCode(resetCode) {
    // Code Of 6 Chars 1-9 ,a-z ,A-Z Only
    const codeRegex = /^[a-zA-Z1-9]{6}$/;
    return codeRegex.test(resetCode);
  }
  const codeClassName = `form-control ${
    codeTouched ? (codeValid ? "is-valid" : "is-invalid") : ""
  }`;
  // 03- Validation Password
  const [newPassword, setPassword] = useState("");
  const [passValid, setPassValid] = useState(false);
  const [passTouched, setPassTouched] = useState(false);
  function handlePassChange(event) {
    setPassword(event.target.value);
    setPassValid(validatePassword(event.target.value));
    setFormValid(emailValid && codeValid && passValid && cPassValid);
  }
  function handlePassBlur() {
    setPassTouched(true);
    setFormValid(emailValid && codeValid && passValid && cPassValid);
  }
  function validatePassword(newPassword) {
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
    setFormValid(emailValid && codeValid && passValid && cPassValid);
  }
  function handleCPassBlur() {
    setCPassTouched(true);
    setFormValid(emailValid && codeValid && passValid && cPassValid);
  }
  function validateCPass(cpassword) {
    return cpassword === newPassword;
  }
  const cPassClassName = `form-control ${
    cPassTouched ? (cPassValid ? "is-valid" : "is-invalid") : ""
  }`;
  // React Loading
  const [isLoading, setIsLoading] = useState(false);
  // To Handle Login Process
  const handleSubmit = async (event) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // setFormValid(true);
    }, 1000);
    event.preventDefault();
    // Input Data
    const bodyOBJ = { email, resetCode, newPassword, cPassword };
    const success = await authService.resetPassword(bodyOBJ);
    if (success) {
      setTimeout(() => {
        navigate("/log-in");
      }, 1000);
    }
  };
  // Toggle Show And Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //  HTML
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        {/* 02- Switch Sun Moon */}
        <div
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
        </div>
        <NotificationContainer />
        <div className="content custom-card">
          {/* <img src={image} alt="Image" className="image" /> */}
          <form
            className="login-form signup-form"
            onSubmit={handleSubmit}
            style={{ boxShadow: "none" }}
          >
            {/* Header */}
            <h2 className="text-center">Reset Password</h2>
            {/* Email */}
            <div className="email form-group my-4">
              <input
                type="email"
                value={email}
                className={emailClassName}
                placeholder="Email"
                onBlur={handleEmailBlur}
                onChange={handleEmailChange}
              />
              {emailTouched && !emailValid && (
                <div className="invalid-feedback">
                  Please Enter a Valid Email Address.
                </div>
              )}
            </div>
            {/* Code */}
            <div className="code form-group my-4">
              <input
                type="text"
                value={resetCode}
                className={codeClassName}
                placeholder="Reset Code"
                onBlur={handleCodeBlur}
                onChange={handleCodeChange}
              />
              {codeTouched && !codeValid && (
                <div className="invalid-feedback">
                  Please Enter a Valid Code Consist Of 6 Chars.
                </div>
              )}
            </div>
            {/* Password */}
            <div className="password-group form-group my-4">
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  className={passClassName}
                  placeholder="Password"
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
            {/* CPassword */}
            <div className="cpassword-group form-group my-4">
              <div className="password">
                <input
                  type="password"
                  value={cPassword}
                  className={cPassClassName}
                  placeholder="Confirm Password"
                  onBlur={handleCPassBlur}
                  onChange={handleCPassChange}
                />
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
  );
};
export default ResetPassword;
