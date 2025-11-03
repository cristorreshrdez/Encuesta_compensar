import axios from "axios";

// URL base del backend del onboarding
const API = axios.create({
baseURL: "https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com",
headers: {
    "Content-Type": "application/json",
},
});

// Rutas disponibles del backend
export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const sendSurvey = (data) => API.post("/survey", data);
export const getUser = (id) => API.get(`/user/${id}`);

export default API;
