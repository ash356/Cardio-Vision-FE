import axios from "axios";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
const API_BASE_URL = `https://cardio-vision.vercel.app`;
const HEADERS = {
  Authorization: `Cardio-Vision_${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json; charset=UTF-8",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  Pragma: "no-cache",
  Expires: 0,
};
const userService = {
  // 01- Get User Profile
  getProfile: async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/user/profile`,
        headers: HEADERS,
      });
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      NotificationManager.error(`Error ! => ${message}`);
      return false;
    }
  },
  // 02- Update Profile
  updateProfile: async (updatedData) => {
    try {
      const response = await axios({
        method: "put",
        url: `${API_BASE_URL}/user/update`,
        data: updatedData,
        headers: HEADERS,
      });
      const { message } = response.data;
      if (message === "Success") {
        NotificationManager.success("Profile Updated Successfully!");
      }
      return true;
    } catch (error) {
      const { message } = error.response.data;
      NotificationManager.error(`Error ! => ${message}`);
      return false;
    }
  },
  // 03- Upload Image
  uploadProfileImage: async (formData) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${API_BASE_URL}/user/profilePic`,
        data: formData,
        headers: {
          Authorization: `Cardio-Vision_${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
        },
      });
      return response.data;
    } catch (error) {
      // Handle the error if needed
      throw error;
    }
  },
  // 04- Update Password
  updatePassword: async (userData) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${API_BASE_URL}/user/updatePassword`,
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
      } else if (message === "In-Valid Old Password !") {
        NotificationManager.error("In-Valid Old Password !");
      } else if (message === "Can't Be The Same As Old Password !") {
        NotificationManager.info("Can't Be The Same As Old Password !");
      } else {
        NotificationManager.error("error", "An Error Occurred");
      }
      return false;
    }
  },
  // 05- Delete Account
  deleteAccount: async () => {
    try {
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/user/delete`,
        headers: HEADERS,
      });
      const { message } = response.data;
      if (message === "Success") {
        NotificationManager.success("User Deleted !");
        return true;
      }
    } catch (error) {
      NotificationManager.error("Error !", `${error}`);
      return false;
    }
  },
  // 06- Update Password
  setAdmin: async (email) => {
    try {
      const response = await axios({
        method: "put",
        url: `${API_BASE_URL}/auth/setAdmin`,
        data: { email },
        headers: HEADERS,
      });
      const { message } = response.data;
      if (message === "Success") {
        NotificationManager.success("Admin Added !");
        return true;
      }
    } catch (error) {
      const { message } = error.response.data;
      if (message === "Validation Error !") {
        NotificationManager.error("Validation Error !");
      } else if (message === "Account Not Found !") {
        NotificationManager.error("Account Not Found !");
      } else if (message === "Not Allowed To Change Roles") {
        NotificationManager.info("Not Allowed To Change Roles");
      } else if (message === "User Allready Admin !") {
        NotificationManager.info("User Allready Admin !");
      } else {
        NotificationManager.error("error", "An Error Occurred");
      }
      return false;
    }
  },
  // 07- Get All Users
  getUsers: async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/auth/getUsers`,
        headers: HEADERS,
      });
      const { message, users } = response.data;
      if (message === "Success") {
        // NotificationManager.success("All Users !");
        // console.log(users);
        return users;
      }
    } catch (error) {
      const { message } = error.response.data;
      if (message === "Validation Error !") {
        NotificationManager.error("Validation Error !");
      } else if (message === "Users Not Found !") {
        NotificationManager.error("Users Not Found !");
      } else if (message === "Not Allowed To Show Users") {
        NotificationManager.info("Not Allowed To Show Users");
      } else {
        NotificationManager.error("error", "An Error Occurred");
      }
      return false;
    }
  },
  // 08- Delete User
  deleteUser: async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/auth/deleteUser`,
        data: { id },
        headers: HEADERS,
      });
      const { message } = response.data;
      if (message === "Success") {
        NotificationManager.success("Deleted !");
        return true;
      }
    } catch (error) {
      const { message } = error.response.data;
      if (message === "Validation Error !") {
        NotificationManager.error("Validation Error !");
      } else if (message === "Account Not Found !") {
        NotificationManager.error("Account Not Found !");
      } else if (message === "Not Allowed !") {
        NotificationManager.info("Not Allowed !");
      } else {
        NotificationManager.error("error", "An Error Occurred");
      }
      return false;
    }
  },
};

export default userService;
