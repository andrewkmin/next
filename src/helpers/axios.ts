import axios from "axios";

const fetcher = axios.create({
  withCredentials: true,
  validateStatus: () => true,
  // Important: Do not change with a destructuring variable since the bundler is looking for it precisely
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
});

export default fetcher;
