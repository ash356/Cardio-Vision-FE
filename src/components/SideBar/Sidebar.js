import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/C-V.png";
import Home from "../../assets/sidebar/icon-home.svg";
import Add from "../../assets/sidebar/add.svg";
import Account from "../../assets/sidebar/icon-accounts.svg";
import Level from "../../assets/sidebar/icon-levels.svg";
import Result from "../../assets/sidebar/result.svg";
import Chart from "../../assets/sidebar/chart-line-up-bold.svg";
import Lock from "../../assets/sidebar/icon-lock.svg";
import Settings from "../../assets/sidebar/icon-settings.svg";
import { Dropdown } from "react-bootstrap";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdMoon as Moon, IoMdSunny as Sun } from "react-icons/io";
import { ThemeContext } from "../../utils/ThemeContext";
import Avatar from "../../assets/avatar.png";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import authService from "../../utils/authService";
import userService from "../../utils/userService";
const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  // Toggle Menu
  const toggleSidebar = () => {
    document.body.classList.toggle("open");
  };
  // Get User Data
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "",
    profilePic: null,
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
  // Handle Logout
  const handleLogout = () => {
    authService.logout();
    navigate("/log-in");
  };
  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      navigate("/log-in");
    } else {
      getUserProfile();
      if (profile.profilePic === "") {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePic: Avatar,
        }));
      }
    }
  }, [navigate]);
  return authService.isAuthenticated() ? (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className="sidebarr"
        id={theme}
        style={{ zIndex: 9999, position: "relative" }}
      >
        <div className="sidebar-header end">
          <ul className="navlinks">
            <li
              className="bounceInDown"
              data-wow-duration="2s"
              data-wow-delay="1.5s"
            >
              {/* 02- Switch Sun Moon */}
              <div className="toggle-bt" style={{ cursor: "pointer" }}>
                {theme === "light" ? (
                  <Moon
                    className="icon"
                    onClick={toggleTheme}
                    style={{ fontSize: "50px", color: "#1b242c" }}
                  />
                ) : (
                  <Sun
                    className="icon"
                    onClick={toggleTheme}
                    style={{ fontSize: "50px", color: "white" }}
                  />
                )}
              </div>
            </li>
            <li
              className="bounceInDown"
              data-wow-duration="2s"
              data-wow-delay="1.3s"
            >
              <Link>
                <FontAwesomeIcon icon={faBell} className="icon colr a" />
              </Link>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle
                  as={Link}
                  className="d-flex align-items-center custom-toggle fs"
                  aria-expanded="false"
                >
                  {profile && profile.profilePic ? (
                    <img
                      src={profile.profilePic.secure_url}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    <img
                      src={Avatar}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                  <span className="profile-name ms-2">
                    {`${profile.firstName} ${profile.lastName}`}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
        <aside className="sidebar">
          <div className="sidebar-inner">
            <div className="sidebar-header">
              <div className="sidebar-burger" onClick={toggleSidebar}></div>
              <img src={Logo} className="sidebar-logo" alt="Blocklord Logo" />
              <span className="spin">Cardio Vision</span>
            </div>
            <nav className="sidebar-nav">
              {/* Home */}
              <Link className="btn" to="/dashboard" title="Home">
                <img src={Home} alt="Home Icon" />
                <h5>Home</h5>
              </Link>
              {/* Add */}
              <Link className="btn" to="/form" title="Start Test">
                <img src={Add} alt="Add Icon" />
                <h5>Start</h5>
              </Link>
              {/* Result */}
              <Link className="btn" to="/result" title="Result">
                <img src={Result} alt="Add Icon" />
                <h5>Result</h5>
              </Link>
              {/* List */}
              <Link className="btn" to="/patientsList" title="Patients">
                <img src={Level} alt="Levels Icon" />
                <h5 style={{ animationDelay: "0.2s" }}>Patients</h5>
              </Link>
              {/* Charts */}
              <Link className="btn" to="/charts" title="Charts">
                <img src={Chart} alt="chart Icon" />
                <h5 style={{ animationDelay: "0.2s" }}>Charts</h5>
              </Link>
              {/* Profile */}
              <Link className="btn" to="/profile" title="Profile">
                <img src={Account} alt="Accounts Icon" />
                <h5 style={{ animationDelay: "0.3s" }}>Accounts</h5>
              </Link>
              {/* Settings */}
              <Link className="btn" to="/settings" title="Settings">
                <img src={Settings} alt="Settings Icon" />
                <h5 style={{ animationDelay: "0.1s" }}>Settings</h5>
              </Link>
            </nav>
            {/* Logout */}
            <div className="sidebar-foot" title="Logout">
              <div className="btn" onClick={handleLogout}>
                <img src={Lock} alt="Logout Icon" />
                <h5>Logout</h5>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </ThemeContext.Provider>
  ) : null;
};

export default Sidebar;
