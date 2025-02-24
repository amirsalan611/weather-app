import axios from "axios";
import { BASE_URL } from "../../shared/baseURL/BaseURL";
import { API_KEY } from "../../shared/apiKey/API_KEY";

interface LoginProps {
  email: string;
  password: string;
}

export async function Login({ email, password }: LoginProps) {
  console.log(email, password);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/login`,
      { email, password },
      {
        headers: {
          api_key: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Login error:", error.message);
    return error.message;
  }
}
