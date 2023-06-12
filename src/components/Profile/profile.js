import React, { useState, useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import { NotificationManager } from "react-notifications";
import { ThemeContext } from "../../utils/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import Avatar from "../../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import userService from "../../utils/userService";
import authService from "../../utils/authService";
function Userprofile() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  //  01- Validation Email
  const [formValid, setFormValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setEmailValid(validateEmail(event.target.value));
    setFormValid(firstNameValid && lastNameValid && emailValid);
    // setProfile({ ...profile, email: event.target.value });
  }
  function handleEmailBlur() {
    // setEmailTouched(true);
    setFormValid(firstNameValid && lastNameValid && emailValid);
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
    setFormValid(firstNameValid && lastNameValid && emailValid);
    setProfile({ ...profile, firstName: event.target.value });
  }
  function handleFirstNameBlur() {
    setFirstNameTouched(true);
    setFormValid(firstNameValid && lastNameValid && emailValid);
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
    setFormValid(firstNameValid && lastNameValid && emailValid);
    setProfile({ ...profile, lastName: event.target.value });
  }
  function handleLastNameBlur() {
    setLastNameTouched(true);
    setFormValid(firstNameValid && lastNameValid && emailValid);
  }
  function validateLastName(lastName) {
    // Last Name: At least 2 characters and can contain upper and lowercase letters and numbers
    const lastNameRegex = /^[a-zA-Z0-9]{2,}$/;
    return lastNameRegex.test(lastName);
  }
  const lastNameClassName = `form-control ${
    lastNameTouched ? (lastNameValid ? "is-valid" : "is-invalid") : ""
  }`;
  // Phone Validate
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  function handlePhoneChange(event) {
    setPhone(event.target.value);
    setPhoneValid(validatePhone(event.target.value));
    setFormValid(phoneValid);
    setProfile({ ...profile, phone: event.target.value });
  }

  function handlePhoneBlur() {
    setPhoneTouched(true);
    setFormValid(phoneValid);
  }
  function validatePhone(phone) {
    const phoneRegex = /^\+20(10|11|12|15)\d{8}$/;
    return phoneRegex.test(phone);
  }
  const phoneClassName = `form-control ${
    phoneTouched ? (phoneValid ? "is-valid" : "is-invalid") : ""
  }`;
  // Gender
  const [gender, setGender] = useState("");
  function handleGenderChange(event) {
    setGender(event.target.value);
    setFormValid(phoneValid && event.target.value !== "");
    setProfile({ ...profile, gender: event.target.value });
  }
  const [uploadLoading, setuploadLoading] = useState(false);
  // Handle Upload
  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setuploadLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", file);
        await userService.uploadProfileImage(formData);
        console.log("Image uploaded successfully");
        await getUserProfile();
      } catch (error) {
        console.log("Error uploading image:", error);
      }
      setuploadLoading(false);
    } else {
      console.log("No file selected");
    }
  };
  // Get User Profile
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "",
    profilePic: "",
    role: "",
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
        role: "",
        status: "",
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
  // Handle Update
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdate = async (event) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    event.preventDefault();
    // Input Data
    const bodyOBJ = { firstName, lastName, phone, gender };
    console.log(bodyOBJ);
    const success = await userService.updateProfile(bodyOBJ);
    if (success) {
      setTimeout(async () => {
        NotificationManager.success("Updated Successfully!");
        await getUserProfile();
      }, 1000);
    }
  };
  // Handle Delete
  const handleDelete = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    event.preventDefault();
    const success = await userService.deleteAccount();
    if (success) {
      setTimeout(() => {
        localStorage.removeItem("accessToken");
        setIsLoading(false);
        navigate("/sign-up");
      }, 1000);
    } else {
      setIsLoading(false);
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
      <div className="profile" id={theme}>
        <Sidebar />
        {/* <div className="content"> */}
        <section className="bg-image" style={{}}>
          <div className="container ms-4">
            <div className="row">
              <div className="col-lg-4 h-100">
                <div className="card mb-4">
                  <div className="card-body text-center bg-gray text-white">
                    <div className="image-container">
                      {profile.profilePic ? (
                        <img
                          src={profile.profilePic.secure_url}
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: "150px", height: "150px" }}
                        />
                      ) : (
                        <img
                          src={Avatar}
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: "150px", height: "150px" }}
                        />
                      )}
                      {uploadLoading && (
                        <div className="loading-indicator">
                          <ReactLoading
                            type={"bars"}
                            color={"#009688"}
                            height={"25px"}
                            width={"25px"}
                          />
                        </div>
                      )}
                    </div>
                    <br />
                    <input
                      id="file"
                      type="file"
                      className="input"
                      hidden
                      onChange={handleUpload}
                    />
                    <label className="label mt-2" htmlFor="file">
                      <FontAwesomeIcon
                        icon={faCamera}
                        style={{ fontSize: "25px", color: "#0c8884" }}
                      />
                    </label>
                    <h5 className="my-2" id="profileName">
                      {`${profile.firstName} ${profile.lastName}`}
                    </h5>
                    <p
                      className="my-2"
                      style={{
                        color: "#b9b9b9",
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                      id="profileEmail"
                    >
                      {profile.email}
                    </p>
                    <h2
                      className="mt-2 mb-4"
                      id="role"
                      style={{
                        color: "#d63aff",
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                    >
                      {`${profile.role}`}
                    </h2>
                    <Link
                      className="btn btn-success my-3 w-100"
                      to="/update-password"
                    >
                      Update Password
                    </Link>
                    <div
                      className="btn btn-danger my-2 w-50"
                      onClick={handleDelete}
                      style={{
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
                        "Delete Account"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <form
                className="form col-lg-8 h-100"
                style={{ boxShadow: "none" }}
                onSubmit={handleUpdate}
              >
                <div className="card mb-4">
                  <div className="card-body bg-gray text-white text-center">
                    <div className="d-flex row w-100" style={{ margin: "0" }}>
                      {/* First Name */}
                      <div className="fname col form-group">
                        <input
                          type="text"
                          value={profile.firstName}
                          className={firstNameClassName}
                          placeholder="First Name"
                          onBlur={handleFirstNameBlur}
                          onChange={handleFirstNameChange}
                        />
                        {firstNameTouched && !firstNameValid && (
                          <div className="invalid-feedback">
                            First Name Requied
                          </div>
                        )}
                      </div>
                      {/* Last Name */}
                      <div className="lname col form-group pl">
                        <input
                          type="text"
                          value={profile.lastName}
                          className={lastNameClassName}
                          placeholder="Last Name"
                          onBlur={handleLastNameBlur}
                          onChange={handleLastNameChange}
                        />
                        {lastNameTouched && !lastNameValid && (
                          <div className="invalid-feedback">
                            Last Name Requied
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Email */}
                    <div className="email form-group">
                      <input
                        type="email"
                        value={profile.email}
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
                    {/* Phone */}
                    <div className="phone form-group">
                      <input
                        type="tel"
                        value={profile.phone}
                        className={phoneClassName}
                        placeholder="Phone"
                        onBlur={handlePhoneBlur}
                        onChange={handlePhoneChange}
                      />
                      {phoneTouched && !phoneValid && (
                        <div className="invalid-feedback">
                          Please enter a valid phone number.
                        </div>
                      )}
                    </div>
                    {/* Gender */}
                    <div className="gender form-group">
                      <select
                        value={profile.gender}
                        className="control"
                        onChange={handleGenderChange}
                      >
                        <option disabled className="control">
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    {/* Buttons */}
                    <div className="d-flex row w-100" style={{ margin: "0" }}>
                      <div className="col form-group">
                        <button
                          className="control btn btn-info text-white"
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
                              height={"25px"}
                              width={"25px"}
                            />
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                      <div className="col form-group pl">
                        <button
                          type="button"
                          id="cancel"
                          name="cancel"
                          className="control btn btn-warning text-white"
                        >
                          <Link to="/dashboard" className="text-white">
                            Cancel
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        {/* </div> */}
      </div>
    </ThemeContext.Provider>
  ) : null;
}

export default Userprofile;
