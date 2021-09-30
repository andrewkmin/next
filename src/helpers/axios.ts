import axios from "axios";

const { NEXT_PUBLIC_API_ENDPOINT_URL: baseURL } = process.env;

const fetcher = axios.create({
  baseURL,
  withCredentials: true,
  validateStatus: () => true,
});

export default fetcher;
