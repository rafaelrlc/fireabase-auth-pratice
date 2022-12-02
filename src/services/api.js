import axios from "axios";

const BASE_URL = "https://identitytoolkit.googleapis.com/v1/";
export const key = "AIzaSyA_JQ06cuajLFsd8wKNp9OVbc3dejuW3eM";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
