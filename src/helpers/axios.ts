import axios from "axios";

const fetcher = axios.create({
  validateStatus: () => true,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE5NjNiNjFjLWQ5ZDYtNGQ0ZC1hMjZkLTAyNDFmM2QzMTIwYiIsImlhdCI6MTYzNzI2MDMzNX0.RJ4675alU6XVst8HUzsRFaOYqBA1ASorThJ1FAjNLKw",
  },
  // Important: Do not change with a destructuring variable since the bundler is looking for it precisely
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
});

export default fetcher;
