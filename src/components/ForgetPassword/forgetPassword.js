import React, { useState, useContext } from "react";
import ReactLoading from "react-loading";
import image from "../../assets/forget-password.png";
import { ThemeContext } from "../../utils/ThemeContext";
import { IoMdMoon as Moon, IoMdSunny as Sun } from "react-icons/io";
import authService from "../../utils/authService";
// Notification Import
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
// Imports for Routes
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// CSS Style
import "./forgetPassword.css";
// Default Method
const ForgetPasswordForm = () => {
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
    setFormValid(emailValid);
  }
  function handleEmailBlur() {
    setEmailTouched(true);
    setFormValid(emailValid);
  }
  function validateEmail(email) {
    // your validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const emailClassName = `form-control ${
    emailTouched ? (emailValid ? "is-valid" : "is-invalid") : ""
  }`;
  // React Loading
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // setFormValid(true);
    }, 1000);
    event.preventDefault();
    // Input Data
    const bodyOBJ = { email };
    // console.log(bodyOBJ);
    const success = await authService.forgetPassword(bodyOBJ);
    if (success) {
      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);
    }
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
          <img src={image} alt="Image" className="image right" />
          <form
            className="login-form signup-form left"
            onSubmit={handleSubmit}
            style={{ boxShadow: "none" }}
          >
            {/* Header */}
            <h2 className="text-center py-4">Forget Password</h2>
            {/* Email */}
            <div className="email form-group my-5">
              <input
                type="email"
                value={email}
                className={emailClassName}
                placeholder="Enter Your Email To Send Reset Code"
                onBlur={handleEmailBlur}
                onChange={handleEmailChange}
              />
              {emailTouched && !emailValid && (
                <div className="invalid-feedback">
                  Please Enter a Valid Email Address.
                </div>
              )}
            </div>
            {/* Submit Button */}
            <div className="login my-5">
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
                    type={"bars"}
                    color={"white"}
                    height={"40px"}
                    width={"40px"}
                  />
                ) : (
                  "Send Code"
                )}
              </button>
            </div>
            {/* Links */}
            <p className="text-center mt-2 mb-0">
              <Link to="/log-in" className="forget-password fw-bold">
                Back To Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
export default ForgetPasswordForm;
