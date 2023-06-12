import React, { useState, useContext } from "react";
import ReactLoading from "react-loading";
import bg from "../../assets/login.png";
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
import "./login.css";
// Default Method
const LoginForm = () => {
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
    setFormValid(emailValid && passValid);
  }
  function handleEmailBlur() {
    setEmailTouched(true);
    setFormValid(emailValid && passValid);
  }
  function validateEmail(email) {
    // your validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|edu)$/;
    return emailRegex.test(email);
  }
  const emailClassName = `form-control ${
    emailTouched ? (emailValid ? "is-valid" : "is-invalid") : ""
  }`;

  // 02- Validation Password
  const [password, setPassword] = useState("");
  const [passValid, setPassValid] = useState(false);
  const [passTouched, setPassTouched] = useState(false);
  function handlePassChange(event) {
    setPassword(event.target.value);
    setPassValid(validatePassword(event.target.value));
    setFormValid(emailValid && passValid);
  }
  function handlePassBlur() {
    setPassTouched(true);
    setFormValid(emailValid && passValid);
  }
  function validatePassword(password) {
    // Password at least 8 chars ,one uppercase letter, one lowercase
    // letter, one number, and one special character.
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-zA-Z]).{8,}$/;
    return passRegex.test(password);
  }
  const passClassName = `form-control ${
    passTouched ? (passValid ? "is-valid" : "is-invalid") : ""
  }`;
  // React Loading
  const [isLoading, setIsLoading] = useState(false);
  // To Handle Login Process
  const handleSubmit = async (event) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    event.preventDefault();
    // Input Data
    const bodyOBJ = { email, password };
    const success = await authService.login(bodyOBJ);
    if (success) {
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 100);
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
          <img src={bg} alt="Login Image" className="image right" />
          <form
            className="login-form signup-form left"
            onSubmit={handleSubmit}
            style={{ boxShadow: "none" }}
          >
            {/* Header */}
            <h2 className="text-center">LogIn</h2>
            {/* Email */}
            <div className="email form-group my-5">
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
            {/* Password */}
            <div className="password-group form-group my-5">
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
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
                  Required: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1
                  special char.
                </div>
              )}
            </div>
            {/* Button */}
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
                  "Login"
                )}
              </button>
            </div>
            <p className="text-center text-muted mt-2 mb-0">
              Create An Account ?{" "}
              <Link to="/sign-up" className="fw-bold">
                Register
              </Link>
            </p>
            <p className="text-center mt-2">
              <Link to="/forget-password" className="forget-password">
                Forget Password
              </Link>
            </p>
          </form>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
export default LoginForm;
