import axios from "axios";
import jwt from "jsonwebtoken";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
const API_BASE_URL = `https://cardio-vision.vercel.app`;
const HEADERS = {
  "Content-Type": "application/json; charset=UTF-8",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  Pragma: "no-cache",
  Expires: 0,
};
const authService = {
  // 01- Signup
  signup: async (userData) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/auth/sign-up`,
        data: userData,
        headers: HEADERS,
      });
      const { message } = response.data;
      if (message === "Success") {
        NotificationManager.success(
          "Registration complete. Please confirm via email. Thank you."
        );
        return true;
      }
    } catch (error) {
      const { message } = error.response.data;
      if (message === "Validation Error !") {
        NotificationManager.error("Validation Error !");
      } else if (message === "Email Allready Exist !") {
        NotificationManager.error("Email Allready Exist !");
      } else {
        NotificationManager.error("An Error Occurred");
      }
      return false;
    }
  },
  // 02- Login
  login: async (userData) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/auth/log-in`,
        data: userData,
        headers: HEADERS,
      });
      const { message, accessToken } = response.data;
      if (message === "Success") {
        NotificationManager.success("Login Successful !");
        localStorage.setItem("accessToken", accessToken);
        return true;
      }
    } catch (error) {
      const { message } = error.response.data;
      if (message === "Validation Error !") {
        NotificationManager.error("Invalid inputs");
      } else if (message === "Account Not Found !") {
        NotificationManager.error("Invalid Email!");
      } else if (message === "In-Valid Password !") {
        NotificationManager.warning("Invalid Password!");
      } else if (message === "Please Confirm Email First") {
        NotificationManager.info("Please Confirm your Email First");
      } else {
        NotificationManager.error("An Error Occurred");
      }
      return false;
    }
  },
  //03- Forget Password
  forgetPassword: async (userData) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${API_BASE_URL}/auth/forgetPassword`,
        data: userData,
        headers: HEADERS,
      });
      const { message } = response.data;
      if (message === "Success") {
        NotificationManager.success(
          "Reset Code Sent to your Email. Please check your inbox."
        );
        return true;
      }
    } catch (error) {
      const { message } = error.response.data;
      if (message === "Validation Error !") {
        NotificationManager.error("Validation Error !");
      } else if (message === "Email Not Found !") {
        NotificationManager.error("Email Not Found !");
      } else if (message === "Rejected Email") {
        NotificationManager.warning("Rejected Email !");
      } else {
        NotificationManager.error("error", "An Error Occurred");
      }
      return false;
    }
  },
  //04- Reset Password
  resetPassword: async (userData) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${API_BASE_URL}/auth/resetPassword`,
        data: userData,
        headers: HEADERS,
      });
      const { message } = response.data;
      if (message === "Success") {
        NotificationManager.success("Updated Successfully !");
        return true;
      }
    } catch (error) {
      const { message } = error.response.data;
      if (message === "Validation Error !") {
        NotificationManager.error("Validation Error !");
      } else if (message === "In-Valid Email") {
        NotificationManager.error("In-Valid Email !");
      } else if (message === "In-Valid Code") {
        NotificationManager.error("In-Valid Code !");
      } else if (message === "Can't Reset Password Like Old Password") {
        NotificationManager.info("Can't Reset Password Like Old Password !");
      } else {
        NotificationManager.error("error", "An Error Occurred");
      }
      return false;
    }
  },
  //   05- Logout
  logout: () => {
    localStorage.removeItem("accessToken");
  },
  //   06- Check User test it noww
  isAuthenticated: () => {
    const token = localStorage.getItem("accessToken");
    return token;
  },
  // 07- Check Role
  isAdmin: () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.role === "Admin") {
        return true;
      }
    }
    return false;
  },
};

export default authService;
