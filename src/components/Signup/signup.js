import React, { useState, useContext } from "react";
import ReactLoading from "react-loading";
import image from "../../assets/signup.png";
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
import "./signup.css";
// Default Method
const SignUp = () => {
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
    setFormValid(
      firstNameValid && lastNameValid && emailValid && passValid && cPassValid
    );
  }
  function handleEmailBlur() {
    setEmailTouched(true);
    setFormValid(
      firstNameValid && lastNameValid && emailValid && passValid && cPassValid
    );
  }
  function validateEmail(email) {
    // your validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|edu)$/;
    return emailRegex.test(email);
  }
  const emailClassName = `form-control ${
    emailTouched ? (emailValid ? "is-valid" : "is-invalid") : ""
  }`;
  // 02- Validation First Name
  const [firstName, setFirstName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
    setFirstNameValid(validateFirstName(event.target.value));
    setFormValid(
      firstNameValid && lastNameValid && emailValid && passValid && cPassValid
    );
  }
  function handleFirstNameBlur() {
    setFirstNameTouched(true);
    setFormValid(
      firstNameValid && lastNameValid && emailValid && passValid && cPassValid
    );
  }
  function validateFirstName(firstName) {
    // First Name of minimum 2 Chars, only Upper and Lowercase letters and numbers
    const firstNameRegex = /^[a-zA-Z0-9]{2,}$/;
    return firstNameRegex.test(firstName);
  }
  const firstNameClassName = `form-control ${
    firstNameTouched ? (firstNameValid ? "is-valid" : "is-invalid") : ""
  }`;
  // 03- Validation Last Name
  const [lastName, setLastName] = useState("");
  const [lastNameValid, setLastNameValid] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);

  function handleLastNameChange(event) {
    setLastName(event.target.value);
    setLastNameValid(validateLastName(event.target.value));
    setFormValid(
      firstNameValid && lastNameValid && emailValid && passValid && cPassValid
    );
  }
  function handleLastNameBlur() {
    setLastNameTouched(true);
    setFormValid(
      firstNameValid && lastNameValid && emailValid && passValid && cPassValid
    );
  }
  function validateLastName(lastName) {
    // Last Name: At least 2 characters and can contain upper and lowercase letters and numbers
    const lastNameRegex = /^[a-zA-Z0-9]{2,}$/;
    return lastNameRegex.test(lastName);
  }
  const lastNameClassName = `form-control ${
    lastNameTouched ? (lastNameValid ? "is-valid" : "is-invalid") : ""
  }`;
  // 04- Validation Password
  const [password, setPassword] = useState("");
  const [passValid, setPassValid] = useState(false);
  const [passTouched, setPassTouched] = useState(false);
  function handlePassChange(event) {
    setPassword(event.target.value);
    setPassValid(validatePassword(event.target.value));
    setFormValid(
      firstNameValid && lastNameValid && emailValid && passValid && cPassValid
    );
  }
  function handlePassBlur() {
    setPassTouched(true);
    setFormValid(
      firstNameValid && lastNameValid && emailValid && passValid && cPassValid
    );
  }
  function validatePassword(password) {
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-zA-Z]).{8,}$/;
    return passRegex.test(password);
  }
  const passClassName = `form-control ${
    passTouched ? (passValid ? "is-valid" : "is-invalid") : ""
  }`;
  // 05- Validation Confirm Password
  const [cPassword, setConfirmPassword] = useState("");
  const [cPassValid, setCPassValid] = useState(false);
  const [cPassTouched, setCPassTouched] = useState(false);
  function handleCPassChange(event) {
    setConfirmPassword(event.target.value);
    setCPassValid(validateCPass(event.target.value));
    setFormValid(
      firstNameValid && lastNameValid && emailValid && passValid && cPassValid
    );
  }
  function handleCPassBlur() {
    setCPassTouched(true);
    setFormValid(
      firstNameValid && lastNameValid && emailValid && passValid && cPassValid
    );
  }
  function validateCPass(cpassword) {
    return cpassword === password;
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
    }, 1000);
    event.preventDefault();
    // Input Data
    const bodyOBJ = { firstName, lastName, email, password, cPassword };
    console.log(bodyOBJ);
    const success = await authService.signup(bodyOBJ);
    if (success) {
      setTimeout(() => {
        navigate("/log-in");
      }, 2000);
    }
  };
  // Toggle Show And Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showCPassword, setShowCPassword] = useState(false);
  const toggleShowCPassword = () => {
    setShowCPassword(!showCPassword);
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
          <img src={image} alt="Signup Image" className="image right" />
          <form
            className="login-form signup-form left"
            onSubmit={handleSubmit}
            style={{ boxShadow: "none" }}
          >
            {/* Switch */}
            {/* Header */}
            <h2 className="text-center pb-3">Sign Up</h2>
            <div
              className="d-flex row my-4 w-100"
              style={{ "--bs-gutter-x": "0rem" }}
            >
              {/* First Name */}
              <div className="fname form-group col">
                <input
                  type="text"
                  value={firstName}
                  className={firstNameClassName}
                  placeholder="First Name"
                  onBlur={handleFirstNameBlur}
                  onChange={handleFirstNameChange}
                />
                {firstNameTouched && !firstNameValid && (
                  <div className="invalid-feedback">First Name Requied</div>
                )}
              </div>
              {/* Last Name */}
              <div className="lname form-group col pl">
                <input
                  type="text"
                  value={lastName}
                  className={lastNameClassName}
                  placeholder="Last Name"
                  onBlur={handleLastNameBlur}
                  onChange={handleLastNameChange}
                />
                {lastNameTouched && !lastNameValid && (
                  <div className="invalid-feedback">Last Name Requied</div>
                )}
              </div>
            </div>
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
            {/* Password */}
            <div className="password-group form-group my-4">
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
                  "Register"
                )}
              </button>
            </div>
            {/* Links */}
            <p className="text-center text-muted mt-2 mb-0">
              Already Have Account ?{" "}
              <Link to="/log-in" className="fw-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
export default SignUp;

// import React, { Component } from 'react'
// import Form from 'react-bootstrap/Form';
// export default class SignUp extends Component {
//   render() {
//     return (

//       <div className="auth-wrapper">
//         <div className="auth-inner">
//           <form>
//             <h2>Sign Up</h2>
//             <div className="mb-3">
//               <label>First name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="First name"
//               />
//             </div>
//             <div className="mb-3">
//               <label>Last name</label>
//               <input type="text" className="form-control" placeholder="Last name" />
//             </div>
//             <div className="mb-3">
//               <label>Email address</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter email"
//               />
//             </div>
//             <div className="mb-3">
//               <label>Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Enter password"
//               />

//             </div>

//             <div className="mb-3">
//               <Form.Select aria-label="Default select example">
//                 <option>sign up as...</option>
//                 <option value="1">User</option>
//                 <option value="2">Doctor</option>
//               </Form.Select>
//             </div>

//             <div className="d-grid">
//               <button type="submit" className="btn btn-danger">
//                 Sign Up
//               </button>
//             </div>
//             <p className="forgot-password text-right">
//               Already registered <a href="/sign-in">sign in?</a>
//             </p>
//           </form>
//         </div>
//       </div>

//     )
//   }
// }
