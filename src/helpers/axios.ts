import __axios from "axios";

// Axios instance
// Important: Do not disable status validation. Handle every status code
const axios = __axios.create({
  // Important: Do not change with a destructuring variable since the bundler is looking for it precisely
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
});

// For setting the JWT bearer
export const setAxiosBearerToken = (token: string) =>
  axios.interceptors.request.use((config) => {
    config.headers!!["Authorization"] = `Bearer ${token}`;
    return config;
  });

// For removing the JWT bearer
export const removeAxiosBearerToken = () =>
  axios.interceptors.request.use((config) => {
    delete config.headers!!["Authorization"];
    return config;
  });

export default axios;
