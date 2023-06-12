import React from "react";
// CSS Style
import "./error404.css";
// Imports for Routes
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - The Page can't be found</h2>
        </div>
        <Link to="/">Back TO Home</Link>
      </div>
    </div>
  );
};

export default Error404;
