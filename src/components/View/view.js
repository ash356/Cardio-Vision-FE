import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import {
  faHeart,
  faCoffee,
  faUsers,
  faChartLine,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";
// ===========
import "./view.css";
import Logo from "../../assets/C-V.png";
import IHD from "../../assets/Ischemic_Heart_Disease.jpg";
import GIF from "../../assets/slider-03.gif";
import ImageSlider from "../ImageSlider/imageSlider.js";
import { IoMdMoon as Moon, IoMdSunny as Sun } from "react-icons/io";
import { createContext, useEffect, useRef } from "react";
import { Link as RouterLink, animateScroll as scroll } from "react-scroll";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ThemeContext } from "../../utils/ThemeContext";
// export const ThemeContext = createContext(null);
gsap.registerPlugin(ScrollTrigger);
// ===========

function ViewComponent() {
  // Sticky Navbar
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      header.classList.toggle("sticky", window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Stick Navbar
  // Scrolling Progress
  useEffect(() => {
    const scrollProgressElement = document.getElementById("scroll-progress");

    function scrollProgress() {
      const totalHeightofWebPage = document.body.scrollHeight;
      const currentDistanceFromTop = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.clientHeight;
      const scrollPercentage =
        (currentDistanceFromTop / (totalHeightofWebPage - windowHeight)) * 100;
      scrollProgressElement.style.width = Math.round(scrollPercentage) + "%";
    }

    document.addEventListener("scroll", scrollProgress);

    return () => {
      document.removeEventListener("scroll", scrollProgress);
    };
  }, []);
  // Scrolling Progress
  // Toggle Menu
  const toggleMenu = () => {
    document.body.classList.toggle("open");
  };
  // Toggle Menu
  // Theme
  const { theme, toggleTheme } = useContext(ThemeContext);
  // const [theme, setTheme] = useState("light");
  // const toggleTheme = () => {
  //   setTheme((curr) => (curr === "light" ? "dark" : "light"));
  // };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="View-App" id={theme}>
        {/* Scroll */}
        <div
          id="scroll-progress"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "3px",
            backgroundColor: "#00CEC8",
            width: "0%",
          }}
        ></div>
        {/* Scroll */}
        {/* // Start Navbar */}
        <header>
          <Link
            to="/"
            className="logo bounceInDown"
            data-wow-duration="2s"
            data-wow-delay="0.1s"
            translate="no"
          >
            <img src={Logo} alt="Logo" className="logo" loading="lazy" />
            Cardio<span>.</span>Vision
          </Link>
          <div
            onClick={toggleMenu}
            className="burger"
            data-wow-duration="2s"
            data-wow-delay="0.3s"
          ></div>
          <ul className="navlinks dropdowns">
            <li
              className="activeColor bounceInDown"
              data-wow-duration="2s"
              data-wow-delay="0.5s"
            >
              <RouterLink to="home" className="a" smooth={true} duration={500}>
                Home
              </RouterLink>
            </li>
            <li
              className="bounceInDown"
              data-wow-duration="2s"
              data-wow-delay="0.7s"
            >
              <RouterLink to="about" className="a" smooth={true} duration={500}>
                About
              </RouterLink>
            </li>
            <li
              className="bounceInDown"
              data-wow-duration="2s"
              data-wow-delay="1.1s"
            >
              <RouterLink
                to="service"
                className="a"
                smooth={true}
                duration={500}
              >
                Service
              </RouterLink>
            </li>
            {/* <li
              className="bounceInDown"
              data-wow-duration="2s"
              data-wow-delay="0.9s"
            >
              <RouterLink
                to="features"
                className="a"
                smooth={true}
                duration={500}
              >
                Features
              </RouterLink>
            </li> */}
            <li
              className="bounceInDown"
              data-wow-duration="2s"
              data-wow-delay="1.3s"
            >
              <RouterLink
                to="contact"
                className="a"
                smooth={true}
                duration={500}
              >
                Contact
              </RouterLink>
            </li>
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
            <li className="" data-wow-duration="2s" data-wow-delay="1.3s">
              <Link to="/log-in" className="login-btn">
                Login
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </Link>
            </li>
          </ul>
        </header>
        {/* // End Navbar */}
        {/* Start Slider */}
        <div id="home" className="slider">
          <div className="images">
            <ImageSlider />
          </div>
        </div>
        {/* End Slider */}
        {/* Start About  */}
        <section className="about" id="about">
          <div className="title">
            <h1 className="">About</h1>
          </div>
          <div className="row">
            <div className="col50 left" data-wow-duration="2s">
              <h2 className="titleText">
                <span>Ischemic Heart Disease</span>
              </h2>
              <p>
                It's a heart problems caused by narrowed heart arteries.When
                arteries are narrowed, less blood and oxygen reach the heart
                muscle. This is also called coronary artery disease and coronary
                heart disease. This can lead to heart attack.
                <br />
                <br />
                Ischemic Heart Disease (IHD), also known as coronary artery
                disease, is a widespread condition caused by narrowed heart
                arteries. This narrowing restricts blood and oxygen flow to the
                heart muscle, leading to potentially severe consequences. Common
                risk factors for IHD include smoking, high blood pressure, high
                cholesterol levels, obesity, and a sedentary lifestyle. IHD
                often remains silent until its advanced stages, making early
                detection crucial. Symptoms may include chest pain or discomfort
                known as angina.
              </p>
            </div>
            <div className="col50 right" data-wow-duration="2s">
              <div className="imgBx">
                <img src={IHD} alt="About" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
        {/* End About  */}
        {/* Start Services */}

        <section className="service text-center" id="service">
          <div className="title">
            <h1 className="">Services</h1>
          </div>
          <div className="row my-5">
            <div className="col50 left" data-wow-duration="2s">
              <div className="gifBox">
                <img src={GIF} alt="Service" loading="lazy" />
              </div>
            </div>
            <div className="col50 right" data-wow-duration="2s">
              <h2 className="titleText">
                Enhance the pace of your digital health exploration!
              </h2>
            </div>
          </div>
          <div className="row my-5 second">
            <div className="col3" data-wow-duration="2s">
              <div className="icon-container">
                <FontAwesomeIcon icon={faUsers} className="icon" />
              </div>
              <h2 className="titleText">Who We Are</h2>
              <p>
                We are a team of developers that decided to create this website
                to help others improving there health.
              </p>
            </div>
            <div className="col3" data-wow-duration="2s">
              <div className="icon-container">
                <FontAwesomeIcon icon={faChartLine} className="icon" />
              </div>
              <h2 className="titleText">CardioRisk</h2>
              <p>
                We collect data from patients and process on it to predict
                percentage of there exposure to ischemic heart disease.
              </p>
            </div>
            <div className="col3" data-wow-duration="2s">
              <div className="icon-container">
                <FontAwesomeIcon icon={faBullseye} className="icon" />
              </div>
              <h2 className="titleText">Goals</h2>
              <p>
                We aim to achieve the best results with the highest level of
                accuracy.
              </p>
            </div>
          </div>
        </section>
        {/* End Services */}
        {/* Start Footer */}
        <footer className={`my-component footer`} id="contact">
          <div className="copy">© 2023 Developer</div>
          <div className="bottom-links">
            <div className="links">
              <span>More Info</span>
              <a href="#home">Home</a>
              <a href="#features">Features</a>
              <a href="#about">About</a>
            </div>
            <div className="links">
              <span>Connect With Us</span>
              <a href="https://www.facebook.com">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.twitter.com">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://www.linkedin.com">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </footer>
        <div className="copyright col-md-12">
          <h3>
            Made With <FontAwesomeIcon icon={faHeart} className="heart" />&{" "}
            <FontAwesomeIcon icon={faCoffee} className="coffee" />
            &gt; CardioVision &copy; 2023
          </h3>
        </div>
        {/* End Footer */}
      </div>
    </ThemeContext.Provider>
  );
}
export default ViewComponent;
