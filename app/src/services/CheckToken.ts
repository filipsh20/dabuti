import axios from "axios";

export default async function CheckToken(token: string | undefined) {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await axios.post(`${API_URL}/auth`, { token });
  return response.data;
}
