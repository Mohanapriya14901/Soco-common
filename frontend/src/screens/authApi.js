import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.158.106:5000/api",  // ✅ Replace with YOUR IP
  headers: { "Content-Type": "application/json" },
});

// Auth APIs
export const registerUser = (formData) => API.post("/auth/send-email-otp", formData);
export const verifyOtp = (formData) => API.post("/auth/verify-email-otp", formData);
export const setPassword = (formData) => API.post("/auth/set-password", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);

// Forgot Password APIs
export const forgotPassword = (formData) => API.post("/auth/forgot-password", formData);
export const verifyForgotOtp = (formData) => API.post("/auth/verify-reset-otp", formData);
export const resetPassword = (formData) => API.post("/auth/reset-password", formData);
