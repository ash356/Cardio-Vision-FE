import axios from "axios";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
const API_BASE_URL = `https://my-ml-repo.onrender.com/api`;
const HEADERS = {
  "Content-Type": "application/json; charset=UTF-8",
  // "Access-Control-Allow-Origin": "http://localhost:3000",
  Accept: "application/json",
};
const modelService = {
  patientsList: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/patients_list/`);
      const data = await response.json();
      return data;
    } catch (error) {
      NotificationManager.error(`Error ! => ${error}`);
      return false;
    }
  },
  //   02- Add Patient
  addPatient: async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/submit-form/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });
      console.log({ response });
      console.log(response.data);
      return response;
    } catch (error) {
      console.log({ error });
      NotificationManager.error(`Error ! => ${error}`);
      return false;
    }
  },
  //   03- Edit Patient
  editPatient: async () => {
    try {
      const response = await axios({
        method: "put",
        url: `${API_BASE_URL}/api/flist`,
        headers: HEADERS,
      });
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      NotificationManager.error(`Error ! => ${message}`);
      return false;
    }
  },
  //   04- Edit Patient
  deletePatient: async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/patient_delete/${id}/`,
      });
      // console.log(response.status);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      NotificationManager.error(`Error ! => ${message}`);
      return false;
    }
  },
  // 05- Get User Result
  getResult: async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/each_patient/${id}`,
        headers: HEADERS,
      });
      return response.data;
    } catch (error) {
      NotificationManager.error(`Error ! => ${error}`);
      return false;
    }
  },
};

export default modelService;
