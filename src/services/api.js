import axios from "axios";

const BASE_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
