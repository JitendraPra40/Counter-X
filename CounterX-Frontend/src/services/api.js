import axios from "axios";

// Use a relative baseURL so the Vite dev-server proxy forwards
// /api/* → http://localhost:8082/api/* automatically.
// This also makes the app portable (no hardcoded host in the browser bundle).
const api = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;