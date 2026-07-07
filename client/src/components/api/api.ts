 import axios from "axios";
import {
  SignupPayload,
  SignupResponse,
  LoginPayload
} from "../../types/api.type";

const api = axios.create({
  baseURL: "http://localhost:9000/api/v1",
});

// ✅ Signup API
export const signupUser = async (
  data: SignupPayload
): Promise<SignupResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// ✅ Login API
export const loginUser = async (
  data: LoginPayload
): Promise<SignupResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};



 