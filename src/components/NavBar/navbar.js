import { Link } from "react-router-dom";
import React, { useContext } from "react";
import Logo from "../../assets/C-V.png";
import Avatar from "../../assets/avatar.png";
import { IoMdMoon as Moon, IoMdSunny as Sun } from "react-icons/io";
import { ThemeContext } from "../../utils/ThemeContext";
import "./navbar.css";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navbar = () => {
  // Toggle Menu
  const toggleMenu = () => {
    document.body.classList.toggle("open");
  };
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <nav className="View-App nav" id={theme}>
        <Link
          to="/"
          className="logo bounceInDown colr"
          data-wow-duration="2s"
          data-wow-delay="0.1s"
          translate="no"
        >
          <img src={Logo} alt="Logo" className="logo" loading="lazy" />
          Cardio<span>.</span>Vision
        </Link>
        <div
          onClick={toggleMenu}
          class="burger"
          data-wow-duration="2s"
          data-wow-delay="0.3s"
        ></div>
        <ul class="navlinks dropdowns">
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

          <li class="" data-wow-duration="2s" data-wow-delay="1.3s">
            <Link
              class="d-flex align-items-center hidden-arrow fs"
              to="/profile"
              aria-expanded="false"
            >
              <img
                src={Avatar}
                class="rounded-circle"
                height="50"
                alt=""
                loading="lazy"
              />
              <span className="profile-name">Ahmed Ashour</span>
            </Link>
          </li>
        </ul>
      </nav>
    </ThemeContext.Provider>
  );
};
export default Navbar;
