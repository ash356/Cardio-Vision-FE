import "../styles/Items.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import logo from "../assets/C-V.png";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
// 01- React Loading
export const Loading = ({ type, color }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60vh",
    }}
  >
    <ReactLoading type={type} color={color} height={"15%"} width={"15%"} />
  </div>
);
//02- Image Slider
