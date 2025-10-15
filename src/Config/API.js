import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const server_url = `http://localhost:5000/api/v1`;
export const multer_url = `http://localhost:5000/images`;
export const FRONTEND_URL = `http://localhost:5173`;
