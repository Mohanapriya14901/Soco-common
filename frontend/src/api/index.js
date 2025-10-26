import axios from 'axios';

const API = axios.create({
  baseURL: "http://192.168.158.106:5000/api", // change this to your backend IP
});

export const sendEmailOtp = (data) => API.post('/auth/send-email-otp', data);
export const verifyEmailOtp = (data) => API.post('/auth/verify-email-otp', data);
export const setPassword = (data) => API.post('/auth/set-password', data);
