import axios from "axios";

const fetcher = axios.create({
  withCredentials: true,
  validateStatus: () => true,
  baseURL: process.env.API_ENDPOINT_URL!!,
});

export default fetcher;
