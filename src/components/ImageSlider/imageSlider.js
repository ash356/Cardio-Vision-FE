import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import img1 from "../../assets/slider-02.jpg";
import img2 from "../../assets/slider-04.gif";
import img3 from "../../assets/slider-05.gif";
import "./slide.css";
import { Link } from "react-router-dom";
const proprietes = {
  duration: 3000,
  transitionDuration: 1000,
  infinite: true,
  indicators: true,
  arrows: false,
};

const ImageSlider = () => {
  return (
    <div className="containerSlide">
      <Slide {...proprietes}>
        <div className="each-slide">
          <div className="slide-content">
            <div className="image-container">
              <img src={img1} alt="img1" />
            </div>
            <div className="overlay">
              <h2>Welcome To CardioVision</h2>
              <p className="par">It's Your Way To a Healthier Life</p>
              <div className="button-container">
                <Link to="/sign-up">Get Start Now</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src={img2} alt="img2" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src={img3} alt="img3" />
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default ImageSlider;
